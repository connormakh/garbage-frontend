/**
 * Created by connormakhlouta on 10/27/17.
 */
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";


const routes: Routes = [
  {
  path: '',
  component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
