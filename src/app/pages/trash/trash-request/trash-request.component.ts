/**
 * Created by connormakhlouta on 10/22/17.
 */
import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TrashRequestModalComponent} from "./modal/request-modal.component";

@Component({
  selector: 'ngx-trash-request',
  templateUrl: './trash-request.component.html'
  // styleUrls: ['./trash-request.scss']
})

export class TrashRequestComponent implements OnInit{

  constructor(private modalService:NgbModal) { }


  ngOnInit(): void {
  }

  openMapPopup() {
    const activeModal = this.modalService.open(TrashRequestModalComponent, { size: 'lg', container: 'nb-layout' });

    activeModal.componentInstance.modalHeader = 'Request new bin';  }

}
