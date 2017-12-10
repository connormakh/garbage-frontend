/**
 * Created by connormakhlouta on 10/22/17.
 */
import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../@core/services/storage.service";
import {User} from "../../../../@core/models/user";
import {AuthenticationService} from "../../../../@core/services/authentication.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'ngx-trash-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./trash-request-modal.scss']
})

export class TrashRequestModalComponent implements OnInit{

  private marker = {lat: "", lng: ""}
  private markerEnabled = false
  private userLat = 0
  private userLng = 0
  private locationDetails = ""

  constructor(private storageService: StorageService, private authenticationService: AuthenticationService, private activeModal: NgbActiveModal) {}

  ngOnInit(){
    // this.userLat = this.storageService.read<User>("currentUser").country_coordinates.lat
    // this.userLng = this.storageService.read<User>("currentUser").country_coordinates.lng

    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.userLat = position.coords.latitude
          this.userLng = position.coords.longitude
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };
  }


  chooseLocation($event) {
    this.marker ={
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
    this.markerEnabled = true
  }

  sendRequest() {
    if (this.marker.lat != null && this.marker.lng != null)
      this.authenticationService.requestBin(this.marker.lat, this.marker.lng, this.locationDetails)
        .subscribe(
          data => {
            this.activeModal.close()
          },
          error => {

          });
  }
}
