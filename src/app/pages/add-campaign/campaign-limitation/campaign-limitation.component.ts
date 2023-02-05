import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LimitationService } from './campaign-limitation.service';
import {
  receiveType,
  receivePeriod
} from './campaign-limitation.data';

@Component({
  selector: 'app-campaign-limitation',
  templateUrl: './campaign-limitation.component.html',
  styleUrls: ['./campaign-limitation.component.css'],
  providers: [
    LimitationService
  ]
})
export class CampaignLimitationComponent implements OnInit {

  // Properties
  @Input() creating: string = ''
  @Input() serviceId: number = 0
  @Input() duration: {
    start: Date,
    stop: Date
  } = {
    start: null as any,
    stop: null as any,
  }
  
  // Limitation Options
  options = {
    receive: {
      type: receiveType,
      period: receivePeriod
    },
    voucher: {
      
    }
  }

  // Modal
  modal: {
    display: boolean,
    type: string
  } = {
    display: false,
    type: ''
  }
  
  criteria: {
    filter: {
      page: number,
      text: string,
      total: number,
      data: {
        id: number, name: string
      }[]
    },
    adding: {
      id: number, name: string
    }[],
    added: {
      id: number, name: string
    }[],
    isAdding: (id: number) => boolean
    isAdded: (id: number) => boolean
  } = {
    filter: {
      page: 1,
      text: '',
      total: 0,
      data: []
    },
    adding: [],
    added: [],
    isAdding: (id: number) => this.criteria.adding.some(
      e => e.id == id
    ),
    isAdded: (id: number) => this.criteria.added.some(
      e => e.id == id
    )
  }

  constructor(
    private router: Router,
    private limitService: LimitationService
  ) { }

  ngOnInit(): void {
    console.log(this.router.url)
  }

  goto (url: string): void {
    this.router.navigate([url])
  }

  openCriteria (): void {

    // Set modal state
    this.modal.display = true
    this.modal.type = 'criteria'

    // Initilize page
    this.criteria.filter.page = 1
    this.filterCriteria('', 0, 10)
  }

  pageCriteria (data: any): void {

    // Current page
    this.criteria.filter.page = data.page

    // Fetch criteria
    this.filterCriteria(
      this.criteria.filter.text,
      data.start,
      data.stop
    )
  }

  filterCriteria (
    text: string,
    start: number,
    stop: number
  ): void {
    
    this.limitService
      .getCriteria(
        text, start, stop
      )
      .then(data => {
        this.criteria.filter.total = data.total
        this.criteria.filter.data = data.result
      })
      .catch(
        err => console.log(err)
      )
  }

  addCriteria (id: number, name: string): void {

    // Existing adding list
    let adding = this.criteria.adding
      .find(e => e.id == id)

    let added = this.criteria.added
      .find(e => e.id == id)

    if (adding) {
      this.removeCriteria(id)
    }
    else {
      if (!added) this.criteria.adding.push({ id, name })
    }
  }

  removeCriteria(id: number): void {

    // Adding criteria List
    let list = this.criteria.adding

    // Remove data
    this.criteria.adding = list.filter(e => e.id != id)
  }

  saveCriteria (items: {
    id: number,
    name: string
  }[]): void {

    // Save Confirmation
    let accepted = confirm(`เพิ่ม ${items.length} เกณฑ์รับสิทธิ์ ?`)

    if (accepted) {

      // Save Criteria
      items.forEach(e => {
        this.criteria.added.push(e)
      })

      // Reset adding criteria
      this.criteria.adding = []

      // Reset modal
      this.modal.display = false
      this.modal.type = ''  
    }
  }

  deleteCriteria (id: number, name: string): void {

    // Delete Confirmation
    let accepted = confirm(`ลบเกณฑ์รับสิทธิ์ ${name} ?`)
    if (accepted) {

      // Added criteria list
      let list = this.criteria.added

      // Remove data
      this.criteria.added = list.filter(e => e.id != id)
    }
  }
}
