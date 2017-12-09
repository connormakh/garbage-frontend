import {Component, OnInit} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {AuthenticationService} from "../@core/services/authentication.service";
import {StorageService} from "../@core/services/storage.service";
import {User} from "../@core/models/user";

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit{

  menu = MENU_ITEMS;

  constructor(private authenticationService: AuthenticationService){}

  ngOnInit() {
    this.authenticationService.getCountryCoordinates()
  }
}
