/**
 * Created by connormakhlouta on 10/22/17.
 */
import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';
import {ThemeModule} from "../@theme/theme.module";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {AuthRoutingModule} from "./auth-routing.module";
@NgModule({
  imports: [
    ThemeModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent, SignupComponent
  ],
})
export class AuthModule { }
