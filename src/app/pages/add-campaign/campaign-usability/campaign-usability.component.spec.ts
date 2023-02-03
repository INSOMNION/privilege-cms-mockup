import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignUsabilityComponent } from './campaign-usability.component';

describe('CampaignUsabilityComponent', () => {
  let component: CampaignUsabilityComponent;
  let fixture: ComponentFixture<CampaignUsabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignUsabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignUsabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
