import { 
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-page-navigator',
  templateUrl: './page-navigator.component.html',
  styleUrls: [
    './page-navigator.component.css'
  ]
})
export class PageNavigatorComponent implements OnInit {

  // Props
  @Input() total: number = 0
  @Input() limit: number = 10
  @Input() active: number = 1

  @Input() forward: number = 2
  @Input() backward: number = 2

  @Input() onInit: EventEmitter<any> = new EventEmitter()

  // Event
  @Output() onChange: EventEmitter<any> = new EventEmitter()

  // State
  navigator: number[] = []

  slot: {
    max: number, 
    min: number,
    value: number,
    range: number[]
  } = {
    max: 0, 
    min: 0,
    value: 0,
    range: []
  }

  paging: {
    all: number,
    start: number,
    stop: number,
    page: number,
  } = {
    all: 0,
    start: 0,
    stop: 0,
    page: 0,
  }

  constructor() { }

  ngOnInit(): void {
    this.setSlot(this.limit)
    this.change(this.active)
    this.onInit.emit(this.paging)
  }

  public first (): void {
    this.change(1)
  }

  public previous (): void {
    let page = this.paging.page
    let previous = page - 1
    this.change(previous)
  }

  public next (): void {
    let page = this.paging.page
    let next = page + 1
    this.change(next)
  }

  public last (): void {
    this.change(this.paging.all)
  }

  public slide (event: Event) {
    // Get Slot Value
    let element = (event.target as HTMLInputElement)
    let value = element.valueAsNumber
    this.slot.value = value
    // Recalculate Page
    this.navigate(this.paging.page)
  }

  private setSlot (limit: number) {
    // Setup Slot (Limit)
    let max = limit * 5
    let min = limit
    let value = limit
    let range = []
    for (let step = 1; step <= 5; step++) {
      range.push(step * limit)
    }
    this.slot = {
      max, min, value, range
    }
  }

  public change (page: number): void {
    // Get Paging Info
    let current = this.paging.page
    let all = this.paging.all
    // Change Page
    if (page != current && page >= 1 && page <= all) {
      this.navigate(page)
    }
  }

  public navigate (page: number) {
    // Calculate
    let total = this.total
    let limit = this.slot.value
    let all = Math.ceil(total / limit)
    // Reset Navigator
    this.navigator = []
    if (total > 0) {
      // Set Current Page
      page = page < 1 ? 1 : page
      page = page > all ? all : page
      // Define Max & Min Range
      let min = page - this.backward
      let max = page + this.forward
      // Set Max & Min Range
      let forward = min < 1 ? Math.abs(min - 1) : 0
      let backward =  max > all ? all - max : 0
      // Add Additional Page
      max = max + forward
      min = min + backward
      // Loop Paging
      for (let index = min; index <= max; index++) {
        if (index >= 1 && index <= all) {
          this.navigator.push(index)
        }
      }
      // Calculate Start & Stop Slot
      let stop: number = limit * page
      let start: number = stop - limit
      // Paging State
      this.paging.page = page
      this.paging.all = all
      this.paging.start = start
      this.paging.stop = stop
      // Emit Change 
      this.onChange.emit(this.paging)
    }
    else {
      this.navigator.push(1)
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    // Trigger Event
    let trigger = false
    // Total Item
    if (changes['total']) {
      // Set Total
      this.total = changes['total'].currentValue || this.total
      // Trigger
      trigger = true
    }
    // Page Limit
    if (changes['limit']) {
      // Set Limit
      this.limit = changes['limit'].currentValue || this.limit
      this.setSlot(this.limit)
      // Trigger
      trigger = true
    }
    // Active Page
    if (changes['active']) {
      // Ger Value
      let current = changes['active'].previousValue
      let previous = changes['active'].currentValue
      // Set Active
      this.active = changes['active'].currentValue || this.active
      // Trigger
      trigger = previous != current
    }
    // Paging
    trigger ? this.navigate(this.active) : null
  }
}
