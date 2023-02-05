import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { settings } from './campaign-usability.data';
import { ChoicePreview, ChoiceValue } from './campaign-usability.model'
import { toDataURL } from 'qrcode'
import { Buffer } from 'buffer';
import { AddCampaignService } from '../add-campaign.service';

@Component({
  selector: 'app-campaign-usability',
  templateUrl: './campaign-usability.component.html',
  styleUrls: ['./campaign-usability.component.css'],
  providers: [
    AddCampaignService
  ]
})
export class CampaignUsabilityComponent implements OnInit {

  // Navigator
  navigator: {[key: string]: any} = {
    current: '',
    next: '/dashboard/add-campaign/limitation'
  }

  // Properties
  @Input() creating: string = ''
  @Input() serviceId: number = 0
  @Input() shortCode: string = '*545#'
  @Input() campaignCode: string = '1234'

  @Input() brandDisplay: {
    id: string | number,
    mobile: string | number,
    thank: string | number
  } = {
    id: '',
    mobile: 0,
    thank: 0
  }

  // Define Choice
  @Input() choices: ChoiceValue[] = []
  brand: string = ''
  choice: string = ''
  updateId: number = null as any

  // Configuration Options
  display = { ...settings.display }

  preview: ChoicePreview = null as any

  alert: {
    display: boolean,
    type: string
  } = {
    display: false,
    type: ''
  }

  modal: {
    display: boolean,
    type: string
  } = {
    display: false,
    type: ''
  }

  constructor(
    private router: Router,
    private service: AddCampaignService
  ) { }
  
  ngOnInit(): void {
    console.log("INIT: Add Campaign - Usability")
    console.log(this.router.url)
    this.addChoice('none')
    this.service.fetchBrand(this.brand)
  }

  selectBrand (): void {
    this.modal.type = 'select-brand'
    this.modal.display = true
  }

  addingChoice (): void {
    this.modal.type = 'add-choice'
    this.modal.display = true
    this.choice = ``
  }

  validateChoice (input: string): boolean {
    return !!input && new RegExp(/^none$|^\d+$/g).test(input)
  }

  updatingChoice (choice:  ChoiceValue): void {

    // Open editor
    this.modal.type = 'update-choice'
    this.modal.display = true

    // Setup data
    this.choice = choice.value
    this.updateId = choice.id
  }

  /**
   * Set USSD Code
   * @param {string} short - Service Short code
   * @param {string} campaign - Campaign code
   * @param {string} choice - Choice value
   * @returns {string} Campaign choice USSD code
   */
  setUSSD (
    short: string,
    campaign: string,
    choice: string
  ): string {

    // Base ussd
    let ussd = short

    // Add campaign code
    ussd = campaign 
      ? ussd.replace('#', `*${campaign}#`)
      : ussd

    // Add choice code
    ussd = choice && choice != 'none' 
      ? ussd.replace('#', `*${choice}#`)
      : ussd

    // USSD code
    return ussd
  }

  /**
   * Add campaign choice
   * @param value - Choice value
   */
  async addChoice (value: string) {

    // Find exist choice
    let exist = this.choices.find(
      e => e.value == value
    )

    // Check existing
    if (exist == undefined && !!value) {

      // Set choice info
      let id = new Date().getTime()
      let code = Buffer.from(`${value}`, 'utf8').toString('base64')
      let link = `http://privilege.ais.co.th/qrcode/${code}?channel=line`
      let image = await this.QRcode(link)
      let ussd = this.setUSSD(
        this.shortCode, 
        this.campaignCode, 
        value.toLowerCase()
      )

      // Add Data
      this.choices.push({
        id, value, link, image, ussd
      })

      // Close modal
      this.modal.display = false
    }
    else {

      // Existing handler
      alert('Choice is ' + (!value ? 'empty' : 'exist'))
    }
    // Reset input
    this.choice = ''
  }

  /**
   * Update existing choice
   * @param {number} id - Choice index
   * @param {string} value - Choice value
   */
   async updateChoice (id: number, value: string) {

    // Find exist choice
    let index = this.choices.findIndex(e => e.id == id)
    let exist = this.choices.find(
      e => e.id != id && e.value == value
    )

    // Check existing
    if (exist == undefined && index != -1 && !!value) {

      // Set choice info
      let code = Buffer.from(`${value}`, 'utf8').toString('base64')
      let link = `http://privilege.ais.co.th/qrcode/${code}?channel=line`
      let image = await this.QRcode(link)
      let ussd = this.setUSSD(
        this.shortCode, 
        this.campaignCode, 
        value
      )

      // Update Data
      this.choices[index] = {
        id, value, link, image, ussd
      }

      // Close modal
      this.modal.display = false
    }
    else {

      // Existing handler
      alert('Choice is ' + (!value ? 'empty' : 'exist'))
    }
    // Reset input
    this.choice = ''
  }

  /**
   * Remove campaign choice
   * @param {string} id - Choice id 
   */
  removeChoice (id: number) {

    // Confirmation
    let choice = this.choices.find(e => e.id == id)
    let answer = confirm(`Remove choice ${choice?.value} ?`)

    // Remove choice
    if (answer) {
      this.choices = this.choices.filter(e => e.id !== id)
    }
  }

  /**
   * Preview choice QR code
   * @param {string} input.ussd - USSD code
   * @param {string} input.choice - Choice value
   * @param {string} input.link - Campaign URL
   * @param {string} input.image - QR code as base64
   */
  previewQRcode (input: ChoiceValue): void {

    // Preview Modal
    this.modal.type = 'preview-choice'
    this.modal.display = true
    let imageName = `campaign${
      input.ussd
        .replace(/#/g, '')
        .replace(/\*/g, '_')
      }.png`

    // Preview Content
    this.preview = { ...input, imageName }
  }

  /**
   * Download choice QR code
   * @param {string} name - QR code name
   * @param {string} image - QR code as base64
   */
  downloadQRcode (name: string, image: string): void {
    var link = document.createElement("a")
    link.href = image
    link.download = name
    link.click()
  }

  /**
   * Generate QR code base64 image
   * @param input - QR code value
   * @returns {Promise<string>} Base64 image
   */
  QRcode (input: string): Promise<string> {
    return toDataURL(input, {
      width: 500,
      margin: 1
    })
  }

  goto (url: string): void {
    this.router.navigate([url])
  }

}
