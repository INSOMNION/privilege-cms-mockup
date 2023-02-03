import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  page: {
    title: string,
    menu: boolean,
    active: string
  } = {    
    title: 'title',
    menu: false,
    active: '',
  }
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.page.active = this.router.url
  }
  
  changePage (event: string): void {
    this.page.active = event
    this.page.menu = false
  }

}
