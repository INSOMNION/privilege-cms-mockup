import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

import { ListComponent } from "./list/list.component";
import { HomeComponent as Home } from "./home/home.component";
import { HelperComponent } from './helper/helper.component';
import { CalendarComponent } from './calendar/calendar.component';

export const title: string = 'Privilege CMS |'

const pageRoutes: Routes = [
  {
    path: 'home',
    title: `${title} Home`,
    component: Home,
    children: [
      {
        path: 'list',
        component: ListComponent
      }, {
        path: 'helper',
        component: HelperComponent,
      }, {
        path: 'calendar',
        component: CalendarComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(pageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule {}
