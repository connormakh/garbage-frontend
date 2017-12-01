import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {StorageService} from "./storage.service";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private storageService: StorageService) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = "http://localhost:5000/api/";
  private options = new RequestOptions({ headers: this.headers });


  login(username: string, password: string) {
    return this.http.post(this.url + 'user/login', JSON.stringify({ username: username, password: password }), this.options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.write("currentUser", user)
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  signup(name: string, companyName: string, email: string, password: string, phone: string) {
    return this.http.post(this.url + 'user/signup', JSON.stringify({ name: name, companyName: companyName, email: email, contact_number: phone, password: password }), this.options)
      .map((response: Response) => {
        let user = response.json().data;
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.write("currentUser", user)
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
