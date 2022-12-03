import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewHolidayComponent } from './components/newholiday/newholiday.component';
import { LoginComponent } from './components/login/login.component';
import { NewsemesterComponent } from './components/newsemester/newsemester.component';
import { NewuserComponent } from './components/newuser/newuser.component';
import { SemesterDetailsComponent } from './components/semester-details/semester-details.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { SubjectUpdateComponent } from './components/subject-update/subject-update.component';
import { SubjectlistComponent } from './components/subjectlist/subjectlist.component';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserupdateComponent } from './components/userupdate/userupdate.component';
import { AuthGuardService } from './auth-helpers/auth-guard.service';
import { AdminGuardService } from './auth-helpers/admin-guard.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'newuser', component: NewuserComponent},
  { path: 'profile', component: UserProfileComponent, canActivate: [AuthGuardService]},
  { path: 'userupdate', component: UserupdateComponent, canActivate: [AuthGuardService]},
  { path: 'subjects', component: SubjectlistComponent, canActivate: [AuthGuardService]},
  { path: 'newsubject', component: SubjectUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'subjectdetails/:id', component: SubjectDetailsComponent, canActivate: [AuthGuardService]},
  { path: 'subjectupdate/:id', component: SubjectUpdateComponent, canActivate: [AdminGuardService]},
  { path: 'timetable', component: TimetableComponent, canActivate: [AuthGuardService]},
  { path: 'holidayupdate', component: NewHolidayComponent, canActivate: [AdminGuardService]},
  { path: 'semester', component: SemesterDetailsComponent, canActivate: [AuthGuardService]},
  { path: 'semesterupdate/:id', component: NewsemesterComponent, canActivate: [AdminGuardService]},
  { path: 'tasks', component:TasklistComponent, canActivate: [AuthGuardService]},
  { path: 'updatetask/:id', component: TaskUpdateComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
