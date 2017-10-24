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

  constructor(private http: Http) {}

  getTrashCans(id: number): Promise<TrashCan[]> {
    return this.http.get(this.url+"garbage/"+id)
      .toPromise()
      .then(response => response.json().data as TrashCan[])
      .catch(this.handleError)
  }

  // ERROR HANDLING

  private handleError(error: any) : Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    return Promise.reject(error.message || error);
  }

}
