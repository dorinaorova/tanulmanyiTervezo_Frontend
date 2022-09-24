import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NewuserComponent } from './newuser/newuser.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserupdateComponent } from './userupdate/userupdate.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'newuser', component: NewuserComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'userupdate', component: UserupdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
