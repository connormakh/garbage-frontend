/**
 * Created by connormakhlouta on 10/22/17.
 */
import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../@core/services/storage.service";
import {User} from "../../../../@core/models/user";

@Component({
  selector: 'ngx-trash-request-modal',
  templateUrl: './request-modal.component.html',
  styleUrls: ['./trash-request-modal.scss']
})

export class TrashRequestModalComponent implements OnInit{

  private marker = {}
  private markerEnabled = false
  private userLat = 0
  private userLng = 0

  constructor(private storageService: StorageService) {}

  ngOnInit(){
    this.userLat = this.storageService.read<User>("currentUser").country_coordinates.lat
    this.userLng = this.storageService.read<User>("currentUser").country_coordinates.lng
  }

  chooseLocation($event) {
    this.marker ={
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
    this.markerEnabled = true
  }
}
