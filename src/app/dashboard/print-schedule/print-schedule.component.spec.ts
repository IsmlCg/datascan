import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintScheduleComponent } from './print-schedule.component';

describe('PrintScheduleComponent', () => {
  let component: PrintScheduleComponent;
  let fixture: ComponentFixture<PrintScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
