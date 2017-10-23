/**
 * Created by connormakhlouta on 10/22/17.
 */
import { Component, OnInit } from '@angular/core';
import {TrashCan} from "./trash-card/trash-can";

@Component({
  selector: 'ngx-trash',
  templateUrl: './trash.component.html',
})

export class TrashComponent implements OnInit{
  trashCans: [TrashCan]

  ngOnInit(): void {

  }

}
