import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { scheduled } from 'rxjs';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PrintScheduleComponent } from './dashboard/print-schedule/print-schedule.component';
import { CrudEmployeeComponent } from './employee/crud-employee/crud-employee.component';
import { ScheduleWeekComponent } from './employee/schedule-week/schedule-week.component';
import { StaffScheduleComponent } from './employee/staff-schedule/staff-schedule.component';
import { AuthGuardGuard } from './services/guards/auth-guard.guard';
import { LogInComponent } from './user/log-in/log-in.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: '', component: LogInComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardGuard]},
  { path: 'app-crud-employee', component:CrudEmployeeComponent, canActivate:[AuthGuardGuard]},
  { path: 'app-staff-schedule', component:StaffScheduleComponent, canActivate:[AuthGuardGuard]},
  // { path: '', component: DashboardComponent , canActivate: [AuthGuardGuard] },
  { path: 'app-printer-schedule', component:  PrintScheduleComponent, canActivate: [AuthGuardGuard] },
  { path: 'app-schedule-week', component:  ScheduleWeekComponent, canActivate: [AuthGuardGuard] },
  { path: '**', component: LogInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
