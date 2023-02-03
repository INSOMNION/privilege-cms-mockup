import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { settings } from './campaign-general.data';

@Component({
  selector: 'app-campaign-general',
  templateUrl: './campaign-general.component.html',
  styleUrls: ['./campaign-general.component.css']
})
export class CampaignGeneralComponent implements OnInit {
  
  // Properties
  @Input() creating: string = ''
  @Input() serviceId: number = 0
  @Input() campaign: {
    type: string,
    days: number[],
    invite: number | string,
    blacklist: number | string,
    notice: number | string,
    point: number
  } = {
    type: "REDEEM",
    days: [],
    invite: 0,
    blacklist: 0,
    notice: 0,
    point: 0,
  }

  // Setting state
  type = settings.type
  day = settings.day
  invite = settings.invite
  blacklist = settings.blacklist
  notice = settings.notice

  // Navigator
  navigator: {[key: string]: any} = {
    current: '',
    next: '/dashboard/add-campaign/usability'
  }

  constructor(
    private router: Router
  ) { }
  
  ngOnInit(): void {
    console.log("INIT: Add Campaign - General")
    this.navigator['current'] = this.router.url
    this.onSelectDay(0)
  }

  onSelectDay (day: number): void {
    // Define
    let days = this.campaign.days
    let exist = days.find(e => e == day)
    // Check all
    if (day == 0) {
      // Trigger all
      days = days.length != this.day.length
        ? this.day.map((_, i) => i)
        : []
    }
    else if (exist) {
      // Remove day
      days = days
        .filter(e => e != day)
        .filter(e => e != 0)
    }
    else {
      // Add day
      days.push(day)
      // Check all day
      let all = this.day
        .map((_, i) => i)
        .filter(i => days.every(e => e != i))
      // Add select all day
      all.length == 1 && all[0] == 0 
        ? days.push(0) 
        : null
    }
    // Set campaign day
    this.campaign.days = days
  }

  activeDay (day: number): boolean {
    return this.campaign.days.find(e => e == day) != undefined
  }

  goto (url: string): void {
    this.router.navigate([url])
  }
}
