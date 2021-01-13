import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffScheduleModalComponent } from './staff-schedule-modal.component';

describe('StaffScheduleModalComponent', () => {
  let component: StaffScheduleModalComponent;
  let fixture: ComponentFixture<StaffScheduleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffScheduleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffScheduleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
