/**
 * Created by connormakhlouta on 10/22/17.
 */
import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../@core/services/storage.service";
import {User} from "../../../../@core/models/user";
import {AuthenticationService} from "../../../../@core/services/authentication.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngx-send-driver',
  templateUrl: './driver-send-modal.component.html',
  // styleUrls: ['./']
})

export class DriverSendModalComponent implements OnInit{


  private waypoints: any[] = []
  private origin : any[] = []
  private index: number = 0
  private currentUser: User = null
  private chosenDriver: string = null
  private availableDrivers: any[] = []

  constructor(private storageService: StorageService, private authenticationService: AuthenticationService, private activeModal: NgbActiveModal) {}

  ngOnInit(){
    this.currentUser = this.storageService.read<User>("currentUser")
    console.log("user", this.currentUser)
    console.log("user", this.origin)
    console.log("user", this.index)
    console.log("user", this.waypoints)
    for (var i = 0; i < this.currentUser.company.drivers.length; i++) {
        if (this.currentUser.company.drivers[i] != null  && this.currentUser.company.drivers[i].first_name != null && this.currentUser.company.drivers[i].last_name != null ) {
          this.availableDrivers.push(this.currentUser.company.drivers[i])
        }
      }
    }

  sendDriver() {
      this.authenticationService.sendDriver(this.chosenDriver, this.index)
        .subscribe(
          data => {
            this.activeModal.close()
          },
          error => {

          });
  }

  autoAssign() {

  }
}
