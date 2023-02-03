import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignResponseComponent } from './campaign-response.component';

describe('CampaignResponseComponent', () => {
  let component: CampaignResponseComponent;
  let fixture: ComponentFixture<CampaignResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignResponseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
