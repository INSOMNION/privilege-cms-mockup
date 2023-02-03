import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages.routing';

import { ListComponent } from "./list/list.component";
import { HomeComponent } from "./home/home.component";
import { HelperComponent } from './helper/helper.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    SharedModule,
    DashboardModule,
    PagesRoutingModule,
  ],
  declarations: [
    ListComponent,
    HomeComponent,
    HelperComponent,
    PageNotFoundComponent,
  ],
  exports: [ ]
})
export class PagesModule {}
