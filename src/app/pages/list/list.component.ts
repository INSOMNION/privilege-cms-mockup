import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  title: string = 'home'

  modal: {
    display: boolean,
    loading: boolean,
    title: string,
    type: string,
    detail: any
  } = {
    display: true,
    loading: false,
    title: 'title',
    type: 'normal',
    detail: ''
  }

  private image: string[] = [
    'https://privilege.ais.co.th/PrivImages/31052022_154825_1c16049.jpg',
    'https://privilege.ais.co.th/PrivImages/29032022_144459_198691b.gif',
    'https://privilege.ais.co.th/PrivImages/29032022_143640_198691b.gif',
    'https://privilege.ais.co.th/PrivImages/30032022_140531_e32460.jpg',
    'https://privilege.ais.co.th/PrivImages/06082021_095710_1cb6f11.jpg',
    'https://privilege.ais.co.th/PrivImages/29122021_152154_17d5096.jpg',
    'https://privilege.ais.co.th/PrivImages/30122021_142315_76f2d3.jpg',
    'https://privilege.ais.co.th/PrivImages/03112021_172731_140aee2.jpg',
    'https://privilege.ais.co.th/PrivImages/24052022_175342_5c3aa2.png',
    'https://privilege.ais.co.th/PrivImages/26052022_171617_54f5dc.jpg',
    'https://privilege.ais.co.th/PrivImages/08042022_074313_cd2eb4.jpg',
    'https://privilege.ais.co.th/PrivImages/25022022_144030_d5582c.jpg',
    'https://privilege.ais.co.th/PrivImages/11022022_153548_9791f4.jpg',
    'https://privilege.ais.co.th/PrivImages/09022022_171329_b2e30c.jpg',
    'https://privilege.ais.co.th/PrivImages/11022022_170955_873be8.jpg',
    'https://privilege.ais.co.th/PrivImages/11022022_160819_9791f4.jpg',
    'https://privilege.ais.co.th/PrivImages/11022022_154857_9791f4.jpg'
  ]

  mock: {
    check: boolean,
    id: string | number,
    ussd: string | number,
    logo: string,
    offer: string | number,
    start: string,
    stop: string,
  }[] = []

  data: {
    check: boolean,
    id: string | number,
    ussd: string | number,
    logo: string,
    offer: string | number,
    start: string,
    stop: string,
  }[] = []

  list: {
    total: number,
    limit: number,
    active: number,
  } = {
    total: 0,
    limit: 10,
    active: 1,
  }

  constructor() { }

  ngOnInit(): void {
    this.mockData(57)
    this.list.total = Math.ceil(this.mock.length / this.list.limit)
  }

  template: string = ''

  setTemplate (number: number): void {
    this.template = `set-item-${number}`
  }

  mockData (number: number) {
    this.mock = []
    for (let index = 0; index < number; index++) {
      // Define Props
      let now = new Date()
      let random = Math.random() * (30 - 0) + 0
      let size = this.mock.length + 1
      let check = false
      let id = `item-${size}`
      let ussd = `*${size}#`
      let logo = this.image[Math.floor(random)]
      let offer = `${id} Description`
      let date = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`
      // Add Mock Data
      this.mock.push({
        check, id, ussd, logo, offer, 
        start: date,
        stop: date
      })
    }
  }

  imageURL = (link: string): string => `url(./assets/no-thumbnail.png)`

  add () {

  }

  remove () {

  }

  all () {

  }

  openInfo (data: {
    check: boolean,
    id: string | number,
    ussd: string | number,
    logo: string,
    offer: string | number,
    start: string,
    stop: string,
  }): void {
    this.modal.display = true
    this.modal.type = 'info'
    this.modal.title = `info ${data.id}`
    this.modal.detail = data
  }
  
  changePage(page: any): void {
    console.log('Change', page, this.mock.slice(page.start, page.stop))
    this.data = this.mock.slice(page.start, page.stop)
  }

  modalHandle (event: any) {
    console.log('Modal-Handle', event)
    switch (event) {
      case 'confirm': 
      case 'close':
        this.modal.display = false
        break
    }
  }
}
