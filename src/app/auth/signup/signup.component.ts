/**
 * Created by connormakhlouta on 10/24/17.
 */
import { Component} from '@angular/core';
import {AuthenticationService} from "../../@core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-signup',
  styleUrls: ['../auth.scss'],
  providers: [AuthenticationService],
  templateUrl: 'signup.component.html',
})

export class SignupComponent {
  user: any = {};
  submitted = false;
  errors = [];
  messages = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  signup() {
    this.errors = []
    this.submitted = true;
    this.authenticationService.signup(this.user.firstName + " " + this.user.lastName, this.user.companyName, this.user.email, this.user.password, this.user.phone)
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['']);
        },
        error => {
          // this.alertService.error(error);
          this.submitted = false;
          this.errors.push(error)
        });
  }
}
