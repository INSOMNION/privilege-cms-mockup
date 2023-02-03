import { 
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  // Props
  @Input() total: number = 1
  @Input() active: number = 1
  @Input() range: number = 2

  // Event
  @Output() onChange: EventEmitter<any> = new EventEmitter()
  @Output() onInit: EventEmitter<any> = new EventEmitter()

  // State
  navigator: number[] = []
  current: number = 0

  constructor() { }

  ngOnInit(): void {
    this.change(this.total, this.active)
    this.onInit.emit(this.current)
  }

  public first (): void {
    if (this.current != 1) {
      this.change(this.total, 1)
    }
  }

  public previous (): void {
    let current = this.current
    let previous = current - 1
    this.change(this.total, previous)
  }

  public next (): void {
    let current = this.current
    let next = current + 1
    this.change(this.total, next)
  }

  public last (): void {
    if (this.current != this.total) {
      this.change(this.total, this.total)
    }    
  }

  public pager (
    total: number,
    current: number,
    range: number
  ): void {  
    // Reset Navigator
    this.navigator = []
    // Define Current Page
    current = current < 1 ? 1 : current
    current = current > this.total ? this.total : current
    // Define Max & Min Range
    let min = current - range
    let max = current + range
    let forward = min < 1 ? Math.abs(min - 1) : 0
    let backward =  max > total ? total - max : 0
    // Add Additional Page
    max = max + forward
    min = min + backward
    // Loop Paging
    for (let index = min; index <= max; index++) {
      if (index >= 1 && index <= total) {
        this.navigator.push(index)
      }
    }
    // Set Current
    this.current = current > total ? total : current
  }

  public change (total: number, page: number): void {
    if (page < 1) {
      this.current = 1
    }
    else if (page > total) {
      this.current = total
    }
    else {
      this.current = page
      this.onChange.emit(this.current)
    }
    // Current Page
    this.pager(total, this.current, this.range)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total']) {
      this.total = changes['total'].currentValue
      this.pager(this.total, this.current, this.range)
    }
  }
}
