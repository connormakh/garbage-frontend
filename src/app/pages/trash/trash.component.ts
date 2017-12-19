/**
 * Created by connormakhlouta on 10/22/17.
 */
import { Component, OnInit } from '@angular/core';
import {TrashCan} from "./trash-card/trash-can";
import {AuthenticationService} from "../../@core/services/authentication.service";

@Component({
  selector: 'ngx-trash',
  templateUrl: './trash.component.html',
})

export class TrashComponent implements OnInit{
  trashCans: TrashCan[] = []

  constructor(private authenticationService: AuthenticationService) {}


  ngOnInit(): void {
    this.authenticationService.getCans()
      .subscribe(
        data => {
          this.trashCans = data
        },
        error => {

        });
  }

}
