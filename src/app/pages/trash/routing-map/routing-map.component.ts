/**
 * Created by connormakhlouta on 10/22/17.
 */
import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../@core/services/authentication.service";
import {MapDirectionsDirective} from "./map-directions.directive";
import {StorageService} from "../../../@core/services/storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DriverSendModalComponent} from "./send-modal/driver-send-modal.component";

@Component({
  selector: 'ngx-routing-map',
  styleUrls: ['./routing-map.component.scss'],
  templateUrl: 'routing-map.component.html',
})

export class RoutingMapComponent implements OnInit {
  private directions: [[number]] = [[0]]
  private latitude = 0
  private longitude = 0
  private cooperative = "cooperative"

  constructor(private authenticationService: AuthenticationService,
              private ws: MapDirectionsDirective,
              private storageService: StorageService,
              private modalService:NgbModal) {}

  ngOnInit() {
    this.latitude = this.storageService.read<number>("userLat")
    this.longitude = this.storageService.read<number>("userLng")
    this.authenticationService.getOptimalRoutes()
      .subscribe(
        data => {
          console.log(data)
          this.directions = data
          this.ws.ngOnInit()
        },
        error => {
          console.log(error)
        });
  }

  indexOf(direction) {
    for (var i in this.directions) {
      if (this.directions[i] == direction) {
        return i
      }
    }
    return -1
  }

  openSendDriverModal() {
    const activeModal = this.modalService.open(DriverSendModalComponent, { size: 'lg', container: 'nb-layout' });
    activeModal.componentInstance.modalHeader = 'Choose a driver to send ';
  }


}
