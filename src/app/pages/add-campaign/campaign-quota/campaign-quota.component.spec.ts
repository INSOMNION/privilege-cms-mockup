import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignQuotaComponent } from './campaign-quota.component';

describe('CampaignQuotaComponent', () => {
  let component: CampaignQuotaComponent;
  let fixture: ComponentFixture<CampaignQuotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignQuotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignQuotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
