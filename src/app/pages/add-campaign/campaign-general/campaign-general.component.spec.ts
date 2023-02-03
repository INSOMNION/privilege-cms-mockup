import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignGeneralComponent } from './campaign-general.component';

describe('CampaignGeneralComponent', () => {
  let component: CampaignGeneralComponent;
  let fixture: ComponentFixture<CampaignGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
