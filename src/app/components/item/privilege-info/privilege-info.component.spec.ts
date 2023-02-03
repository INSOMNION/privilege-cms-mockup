import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeInfoComponent } from './privilege-info.component';

describe('PrivilegeInfoComponent', () => {
  let component: PrivilegeInfoComponent;
  let fixture: ComponentFixture<PrivilegeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivilegeInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilegeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
