/**
 * Created by connormakhlouta on 10/23/17.
 */
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Headers, Http} from "@angular/http";
import {TrashCan} from "../../pages/trash/trash-card/trash-can";

@Injectable()
export class WebService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = "localhost:5000/api/";

  constructor(private http: Http) { }

  getTrashCans(id: number): Promise<TrashCan[]> {
    return this.http.get(this.url+"garbage/"+id)
      .toPromise()
      .then(response => response.json().data as TrashCan[])
  }

}
