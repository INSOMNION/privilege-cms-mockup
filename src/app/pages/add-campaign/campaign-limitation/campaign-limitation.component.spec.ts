import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignLimitationComponent } from './campaign-limitation.component';

describe('CampaignLimitationComponent', () => {
  let component: CampaignLimitationComponent;
  let fixture: ComponentFixture<CampaignLimitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignLimitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
