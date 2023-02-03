import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAnalyticComponent } from './campaign-analytic.component';

describe('CampaignAnalyticComponent', () => {
  let component: CampaignAnalyticComponent;
  let fixture: ComponentFixture<CampaignAnalyticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignAnalyticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignAnalyticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
