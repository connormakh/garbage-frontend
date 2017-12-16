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
  trashCans: TrashCan[] = [{id: 5, name: '443425243', location: "yes", completion: 0.5, volume: 400},
    {id: 5, name: '443425243', location: "yes", completion: 0.8, volume: 400},
    {id: 5, name: '443425243', location: "yes", completion: 0.2, volume: 400},
    {id: 5, name: '443425243', location: "yes", completion: 0.3, volume: 400},]

  ngOnInit(): void {
  }

}
