import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddCampaignModule } from '../add-campaign/add-campaign.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AddCampaignModule,
    DashboardRoutingModule,
  ],
  declarations: [
    MenuComponent,
    DashboardComponent,
  ]
})
export class DashboardModule {}
