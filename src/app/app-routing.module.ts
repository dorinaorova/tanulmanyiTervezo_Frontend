import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidayupdateComponent } from './holidayupdate/holidayupdate.component';
import { LoginComponent } from './login/login.component';
import { NewsemesterComponent } from './newsemester/newsemester.component';
import { NewuserComponent } from './newuser/newuser.component';
import { SemesterDetailsComponent } from './semester-details/semester-details.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';
import { SubjectlistComponent } from './subjectlist/subjectlist.component';
import { TimetableComponent } from './timetable/timetable.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserupdateComponent } from './userupdate/userupdate.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'newuser', component: NewuserComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'userupdate', component: UserupdateComponent},
  { path: 'subjects', component: SubjectlistComponent},
  { path: 'newsubjec', component: SubjectUpdateComponent},
  { path: 'subjectdetails/:id', component: SubjectDetailsComponent},
  { path: 'subjectupdate/:id', component: SubjectUpdateComponent},
  { path: 'timetable', component: TimetableComponent},
  { path: 'holidayupdate', component: HolidayupdateComponent},
  { path: 'semester', component: SemesterDetailsComponent},
  { path: 'newsemester', component: NewsemesterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
