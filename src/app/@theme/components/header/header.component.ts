import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import {StorageService} from "../../../@core/services/storage.service";
import {User} from "../../../@core/models/user";
import {AuthenticationService} from "../../../@core/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position: string = 'normal';

  user: User;

  userMenu = [
    // { title: 'Profile' }, { title: 'Log out' }
    ];
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private storageService: StorageService,
              private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = this.storageService.read<User>("currentUser")
    console.log("currentUser", this.user)
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  logout(){
    this.authenticationService.logout();
  }

  goToHome() {
    this.menuService.navigateHome();
  }
}
