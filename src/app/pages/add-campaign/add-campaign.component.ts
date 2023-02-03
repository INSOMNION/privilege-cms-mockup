import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-campaign',
  templateUrl: './add-campaign.component.html',
  styleUrls: ['./add-campaign.component.css']
})
export class AddCampaignComponent implements OnInit {

  navigator: {
    [key: string]: {
      name: string,
      path: string
    }
  } = {
    general: {
      name: 'general',
      path: '/dashboard/add-campaign/general'
    }
  }

  date: Date = new Date(2022, 8, 1)

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goto(path: string): void {
    this.router.navigateByUrl(path)
  }

  selectDate(event: any): void {
    console.log(event)
    this.date = event.value
  }

}
