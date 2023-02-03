import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule
} from '@angular/router';

import { title } from '../pages.routing'
import { DashboardComponent } from './dashboard.component';

import { AddCampaignComponent } from '../add-campaign/add-campaign.component';
import { CampaignGeneralComponent } from '../add-campaign/campaign-general/campaign-general.component';
import { CampaignLimitationComponent } from '../add-campaign/campaign-limitation/campaign-limitation.component';
import { CampaignResponseComponent } from '../add-campaign/campaign-response/campaign-response.component';
import { CampaignBudgetComponent } from '../add-campaign/campaign-budget/campaign-budget.component';
import { CampaignAnalyticComponent } from '../add-campaign/campaign-analytic/campaign-analytic.component';
import { CampaignUsabilityComponent } from '../add-campaign/campaign-usability/campaign-usability.component';
import { DragAndDropComponent } from 'src/app/components/drag-and-drop/drag-and-drop.component';
import { CampaignQuotaComponent } from '../add-campaign/campaign-quota/campaign-quota.component';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    title: `${title} Dashboard`,
    component: DashboardComponent,
    children: [
      {
        path: '',
        title: `Playground`,
        component: DragAndDropComponent
      },
      {
        path: 'add-campaign',
        title: `Add Campaign`,
        component: AddCampaignComponent
      },
      {
        path: 'add-campaign/general',
        title: `Add Campaign | General`,
        component: CampaignGeneralComponent
      },
      {
        path: 'add-campaign/usability',
        title: `Add Campaign | Usability`,
        component: CampaignUsabilityComponent
      },
      {
        path: 'add-campaign/limitation',
        title: `Add Campaign | Limitation`,
        component: CampaignLimitationComponent
      },
      {
        path: 'add-campaign/quota',
        title: `Add Campaign | Quota`,
        component: CampaignQuotaComponent
      },
      {
        path: 'add-campaign/response',
        title: `Add Campaign | Response`,
        component: CampaignResponseComponent
      },
      {
        path: 'add-campaign/budget',
        title: `Add Campaign | Budget`,
        component: CampaignBudgetComponent
      },
      {
        path: 'add-campaign/analytic',
        title: `Add Campaign | Analytic`,
        component: CampaignAnalyticComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
