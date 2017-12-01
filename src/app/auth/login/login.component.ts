/**
 * Created by connormakhlouta on 10/24/17.
 */
import {Component, OnInit} from '@angular/core';
import {NbSpinnerService} from "@nebular/theme";
import {AuthenticationService} from "../../@core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-login',
  styleUrls: ['../auth.scss'],
  providers: [AuthenticationService],
  templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit{

  user: any = {};
  submitted = false;
  errors = [];
  messages = [];

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    console.log('init')
    this.authenticationService.logout(); // reset login status
  }

  login() {
    this.errors = []
    this.submitted = true;
    this.authenticationService.login(this.user.username, this.user.password)
      .subscribe(
        data => {
          this.router.navigate(['/']);
        },
        error => {
          // this.alertService.error(error);
          this.submitted = false;
          this.errors.push(error)
        });
  }
}
