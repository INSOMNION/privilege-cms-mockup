import { NgModule } from '@angular/core';

// Pages
import { AddCampaignComponent as AddCampaign } from './add-campaign.component';
import { CampaignGeneralComponent as General } from './campaign-general/campaign-general.component';
import { CampaignLimitationComponent as Limitation  } from './campaign-limitation/campaign-limitation.component';
import { CampaignResponseComponent as Response } from './campaign-response/campaign-response.component';
import { CampaignBudgetComponent as Budget } from './campaign-budget/campaign-budget.component';
import { CampaignAnalyticComponent as Analytic } from './campaign-analytic/campaign-analytic.component';
import { CampaignUsabilityComponent as Usability } from './campaign-usability/campaign-usability.component';
import { CampaignQuotaComponent as Quota } from './campaign-quota/campaign-quota.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AddCampaign,
    General,
    Limitation,
    Response,
    Budget,
    Analytic,
    Usability,
    Quota,
  ],
})
export class AddCampaignModule {}
