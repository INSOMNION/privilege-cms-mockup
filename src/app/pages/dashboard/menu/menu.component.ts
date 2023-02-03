import { 
  Component, 
  EventEmitter, 
  OnInit, 
  Output 
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  @Output() changePage: EventEmitter<any> = new EventEmitter();

  current: string = ''

  menu: {
    name: string,
    path: string
  }[] = [
    {
      name: 'Home',
      path: ''
    }, {
      name: 'Dashboard',
      path:  '/dashboard'
    }, {
      name: 'Add Campaign',
      path: '/dashboard/add-campaign'
    }, {
      name: 'General',
      path: '/dashboard/add-campaign/general'
    }, {
      name: 'Usability',
      path: '/dashboard/add-campaign/usability'
    }, {
      name: 'Limitation',
      path: '/dashboard/add-campaign/limitation'
    }, {
      name: 'Quota',
      path: '/dashboard/add-campaign/quota'
    }, {
      name: 'Response',
      path: '/dashboard/add-campaign/response'
    }, {
      name: 'Budget',
      path: '/dashboard/add-campaign/budget'
    }, {
      name: 'Analytic',
      path: '/dashboard/add-campaign/analytic'
    }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.current = this.router.url
  }

  goto (url: string): void {
    if (url != this.current) {
      this.router.navigate([url])
      this.changePage.emit(url)
    }
  }

  ngAfterContentChecked(): void {
    this.current = this.router.url
  }

}
