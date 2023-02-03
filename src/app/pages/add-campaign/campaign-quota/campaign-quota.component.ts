import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { options } from './campaign-quota.data';
import { QuotaService } from './campaign-quota.service';

@Component({
  selector: 'app-campaign-quota',
  templateUrl: './campaign-quota.component.html',
  styleUrls: ['./campaign-quota.component.css'],
  providers: [
    QuotaService
  ]
})
export class CampaignQuotaComponent implements OnInit {
  
  // Ouota Input Options
  options = options

  @Input() duration: {
    start: Date,
    stop: Date
  } = {
    start: null as any,
    stop: null as any,
  }
  
  chioceList: {
    id: number, 
    name: string
  }[] = []
  
  criteriaList: {
    id: number,
    name: string
  }[] = []

  quota: {
    type: number,
    period: number,
    split: number,
    days: number,
    mobile: number,
    fibre: number
  } = {
    type: 0,
    period: 0,
    split: 0,
    days: 0,
    mobile: 0,
    fibre: 0
  }

  notice: {
    email: number,
    sms: number,
    smsRatio: number,
    smsRemain: number,
    inputEmail: string,
    inputPhone: string,
    listEmail: string[],
    listPhone: string[],
  } = {
    email: 0,
    sms: 0,
    smsRatio: 0,
    smsRemain: 0,
    inputEmail: '',
    inputPhone: '',
    listEmail: [
      'arnonkon@ais.co.th'
    ],
    listPhone: [
      '0939604144',
      '66939604144'
    ],
  }

  manage: {
    modal: boolean,
    id: number,
    title: string
  } = {
    modal: false,
    id: null as any,
    title: ''
  }

  allocate: {
    id: number | string,
    name: string,
    mobile: number,
    fibre: number
  }[] = []

  period: {
    [key: number]: {
      start: Date,
      stop: Date,
    }[]
  } = {}

  fibre: {
    [key: number]: number[]
  } = {}

  mobile: {
    [key: number]: number[]
  } = {}

  constructor(
    private router: Router,
    private quotaService: QuotaService
  ) { }

  ngOnInit(): void {
    // Initialize
    console.log('Init', this.router.url)
    // TODO: Campaign Duration
    this.duration = {
      start: new Date('2022-01-15 00:00:00'),
      stop: new Date('2022-02-01 00:01:00'),
    }
    // TODO: Choice & Criteria
    this.chioceList = this.quotaService.fetchChoice(10)
    this.criteriaList = this.quotaService.fetchCriteria(5)
    // Init State
    this.selectQuotaType(2)
    this.notice.email = 1
    this.notice.sms = 1
  }

  goto (path: string) {
    this.router.navigateByUrl(path)
  }

  existingPhone (phone: string): boolean {
    // Get number without prefix
    let removePrefix = (input: string) => input.substring(
      input.length - 9, input.length
    )
    // Check duplicate
    return this.notice.listPhone.every(
      e => removePrefix(e) != removePrefix(phone)
    )
  }

  existingEmail (email: string): boolean {
    return this.notice.listEmail.every(
      e => e != email
    )
  }

  addNoticeEmail(): void {
    // Email input value
    let email = this.notice.inputEmail
    let validate = this.quotaService.isEmail(email)
    let unique = this.existingEmail(email)
    // Verify Email
    if (validate && unique) {
      // Add email
      this.notice.listEmail.push(email)
      this.notice.inputEmail = ''
    }
    else {
      alert(
        `${!!email ? email : 'Email is empty'} | ${validate} | ${unique}`
      )
    }
  }
  
  removeNoticeEmail(index: number) {
    // Notice email list
    let list = this.notice.listEmail
    // Remove data
    this.notice.listEmail = list.filter(
      (_, i) => i != index
    )
  }

  addNoticeSMS(): void {
    // Mobile number input value
    let phone = this.notice.inputPhone
    let validate = this.quotaService.isPhone(phone)
    let unique = this.existingPhone(phone)
    // Verify mobile number
    if (validate && unique) {
      // Add mobile number
      this.notice.listPhone.push(phone)
      this.notice.inputPhone = ''
    }
    else {
      alert(
        `${!!phone ? phone : 'Phone is empty'} | ${validate} | ${unique}`
      )
    }
  }

  removeNoticeSMS(index: number) {
    // Notice phone number list
    let list = this.notice.listPhone
    // Remove data
    this.notice.listPhone = list.filter(
      (_, i) => i != index
    )
  }

  changeRemainSMS (
    type: number,
    remain: number
  ) {
    // Quota Summary
    let mobile = this.mobileSummary()
    let fibre = this.fibreSummary()
    let summary = mobile + fibre
    // Filter Remaining Type
    switch (type) {
      case 0:
        remain = type != this.notice.smsRatio
          ? Math.ceil((summary / 100) * remain)
          : remain
        remain = remain < 0
          ? 0
          : remain
        remain = remain > summary
          ? summary
          : remain
        break
      case 1:
        remain = type != this.notice.smsRatio
          ? summary > 0
            ? Math.floor((remain * 100) / summary)
            : remain
          : remain
        remain = remain > 100
          ? 100
          : remain
        break
      default: break;
    }
    // Notice SMS Remaining
    this.notice.smsRemain = remain
    this.notice.smsRatio = type
  }

  selectQuotaType (type: number): void {
    // Change Type
    if (this.quota.type != type) {
      // Set quota
      this.quota.type = type
      this.resetQuota()
      this.setQuota(
        this.quota.type,
        this.quota.period
      )
    }
  }

  selectQuotaPeriod (period: number): void {
    // Change Period
    if (this.quota.period != period) {
      // Set quota
      this.quota.period = period
      this.resetQuota()
      this.setQuota(
        this.quota.type,
        this.quota.period
      )
    }
  }

  resetQuota () {
    // Reset Quota Configs
    this.quota.days = 0
    this.quota.mobile = 0
    this.quota.fibre = 0
  }

  setQuota (
    inspectType: number,
    periodType: number
  ): void {
    // Define
    this.allocate = []
    let mobile = 0
    let fibre = 0
    // Allocate Period
    let period = this.quotaService
      .setPeriod(
        periodType, 
        this.duration.start,
        this.duration.stop
      )
    // Filter Inspect Type
    switch (inspectType) {
      // Overall Campaign
      case 1:
        // Overall
        let id = 'Overall'
        this.allocate.push({
          id, name: id, mobile, fibre
        })
        break;
      // Choice & Criteria
      case 2:
      case 3:
        // Inspect List
        let inspectList = inspectType == 2
          ? this.chioceList
          : this.criteriaList
        // Allocate List
        inspectList.forEach(
          ({id, name}) => this.allocate.push({
            id, name, mobile, fibre
          })
        )
        break;
      default: break;
    }
    // Setup Allocate Data
    this.allocate.forEach(
      (_, key) => {
        this.period[key] = period.map((e) => e)
        this.mobile[key] = period.map(() => mobile)
        this.fibre[key] = period.map(() => fibre)
      }
    )
  }

  existing = (key: number): boolean => !!this.allocate[key]

  openAllocate (key: number) {
    // Check Quota
    if (this.existing(key)) {
      // Define variable(s)
      let { name } = this.allocate[key]
      // Setup Modal
      this.manage.id = key
      this.manage.title = name
      this.manage.modal = true
    }
    else {
      alert(`Allocate Quota Data Not Found`)
    }
  }

  changePeriodQuota (
    key: number,
    quota: string
  ) {
    // Check Allocate Data
    if (this.existing(key) && (
      quota == 'mobile' ||
      quota == 'fibre'
    )) {
      // Quota List
      let list = quota == 'mobile'
        ? this.mobile[key]
        : this.fibre[key]
      // Quota Overall
      let total = list.reduce(
        (prev, next) => prev + next, 0
      )
      // Set Quota State
      this.quota[quota] = total
      this.allocate[key][quota] = total
    }
  }

  averagePeriodQuota (
    key: number,
    quota: string
  ) {
    // Check Existing Item
    if (this.existing(key) && (
      quota == 'mobile' ||
      quota == 'fibre'
    )) {
      // Allocate Data
      let { [quota]: total } = this.allocate[key]
      let period = this.period[key]
      // Quota Overall
      this.quota[quota] = total
      this.allocate[key][quota] = total
      // Calculate Average
      this.quotaService.averageQuota(
        total, period.length
      )
      .forEach(
        (count, i) => quota == 'mobile'
          ? this.mobile[key][i] = count
          : this.fibre[key][i] = count
      )
      // Change Notice Remain
      if (this.notice.sms == 1) this.changeRemainSMS(
        this.notice.smsRatio,
        this.notice.smsRemain
      )
    }
    else {
      console.warn(`Allocate Quota List Not Found`)
    }
  }

  mobileSummary = (): number => this.allocate.reduce(
    (prev, next) => prev + next.mobile, 0
  )

  fibreSummary = (): number => this.allocate.reduce(
    (prev, next) => prev + next.fibre, 0
  )

}
