/**
 * Created by connormakhlouta on 10/22/17.
 */
import { Component, Input } from '@angular/core';
import {TrashCan} from "./trash-can";

@Component({
  selector: 'ngx-trash-card',
  styleUrls: ['./trash-card.component.scss'],
  templateUrl: 'trash-card.component.html',
})

export class TrashCardComponent {
  @Input() trashCan: TrashCan

  getTrashCanColor() {
    if (this.trashCan != null && this.trashCan.completion != null) {
      if(this.trashCan.completion < 0.33) {
        return "lightgreen"
      } else if (this.trashCan.completion < 0.66) {
        return "orange"
      } else {
        return "red"
      }
    }
  }
}
