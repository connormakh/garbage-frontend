import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable()
export class AuthenticationService {
  constructor(private http: Http, private storageService: StorageService) { }

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = "http://localhost:5000/api/";
  private options = new RequestOptions({ headers: this.headers });


  login(username: string, password: string) {
    return this.http.post(this.url + 'user/login', JSON.stringify({ email: username, password: password }), this.options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        console.log(response)
        let user = response.json().data;
        console.log(user)
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

  getCountryCoordinates() {
    var loggedIn = this.storageService.read<User>("currentUser")
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+loggedIn+'&key=AIzaSyD0q5ip6CbYFgzcha-Io-8lBM78PmgmslE')
      .map((response: Response) => {
        let location = response.json().results[0].geometry.location;
        // login successful if there's a jwt token in the response
        let user = this.storageService.read<User>("currentUser")
        user.country_coordinates.lat = location.lat
        user.country_coordinates.lng = location.lng

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.storageService.write("currentUser", user)
        // localStorage.setItem('currentUser', JSON.stringify(user));

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');

  }
}
