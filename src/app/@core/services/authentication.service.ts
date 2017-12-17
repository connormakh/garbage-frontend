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
    return this.http.post(this.url + 'user/signup', JSON.stringify({ name: name, company_name: companyName, email: email, contact_number: phone, password: password }), this.options)
      .map((response: Response) => {
        let user = response.json().data;
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          user.user.token = user.token
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storageService.write("currentUser", user.user)
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

  requestBin(latitude: string, longitude: string, details: string) {
    return this.http.post(this.url + 'garbage_request/new', JSON.stringify({ details: details, latitude: latitude, longitude: longitude }), this.authenticatedHeaders())
      .map((response: Response) => {
        return response;
      });
  }

  editCompany(name: string, country: string, latitude: number, longitude: number, truckCount: number, truckVolume: number) {
    var jsonObj = {}
    if (name)
      jsonObj['name']= name
    if (country)
      jsonObj['country']= country
    if (truckCount)
      jsonObj['truck_count']= truckCount
    if (truckVolume)
      jsonObj['truck_volume']= truckVolume
    if (latitude)
      jsonObj['latitude']= latitude
    if (longitude)
      jsonObj['longitude']= longitude

    console.log("json", jsonObj)

    return this.http.post(this.url + 'company/edit', JSON.stringify(jsonObj), this.authenticatedHeaders())
      .map((response: Response) => {

        // login successful if there's a jwt token in the response
        let user = this.storageService.read<User>("currentUser")

        let company = response.json().data;
        if (company) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          user.company = company.company
          this.storageService.write("currentUser", user)
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  addDriver(name: string, email:string, contact_number: string) {
    return this.http.post(this.url + 'driver/new', JSON.stringify({name: name, email: email, contact_number: contact_number}), this.authenticatedHeaders())
      .map((response: Response) => {

        // login successful if there's a jwt token in the response
        let user = this.storageService.read<User>("currentUser")

        let company = response.json().data;
        if (company) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          user.company = company.company
          this.storageService.write("currentUser", user)
          // localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  deleteDriver(public_id: string) {
    return this.http.post(this.url + 'driver/delete/' + public_id ,{}, this.authenticatedHeaders())
      .map((response: Response) => {

        // login successful if there's a jwt token in the response
        let user = this.storageService.read<User>("currentUser")
        var i:any
        for (i in user.company.drivers) {
          if (user.company.drivers[i].public_id == public_id) {
            delete user.company.drivers[i]
          }
        }
        this.storageService.write("currentUser", user)


        return user;
      });
  }

  editDriver(data, newData) {
    return this.http.post(this.url + 'driver/delete/' + data["public_id"] ,JSON.stringify(newData), this.authenticatedHeaders())
      .map((response: Response) => {

        // login successful if there's a jwt token in the response
        let user = this.storageService.read<User>("currentUser")
        var i:any
        for (i in user.company.drivers) {
          if (user.company.drivers[i].public_id == data["public_id"]) {
            if (newData["email"]) {
              user.company.drivers[i].email = newData["email"]
            }
            if (newData["first_name"]) {
              user.company.drivers[i].first_name= newData["first_name"]
            }
            if (newData["last_name"]) {
              user.company.drivers[i].last_name= newData["last_name"]
            }
            if (newData["contact_number"]) {
              user.company.drivers[i].contact_number= newData["contact_number"]
            }
          }
        }
        this.storageService.write("currentUser", user)


        return user;
      });
  }

  getOptimalRoutes() {
    return this.http.get(this.url + 'garbage/route', this.authenticatedHeaders())
      .map((response: Response) => {
        let trucksRoutes = response.json().data

        return trucksRoutes;
      });
  }

  sendDriver(chosenDriver, index) {
    return this.http.post(this.url + 'user/collection/send',{driver_id: chosenDriver, route_id: index}, this.authenticatedHeaders())
      .map((response: Response) => {

      });
  }

  getConsumptionGraph(type) {
    return this.http.get(this.url + 'user/collection/graph/' + type, this.authenticatedHeaders())
      .map((response: Response) => {
        let data = response.json().data._batch

        var result = []
        // get years
        for(let i =0 ; i < data.length; i++ ) {
          // check if year exists already, if it does, add record to it by month
          // else create year record and put record in it
          console.log(data[i])
          let yearInd = this.checkIfYearExists(result, data[i]._id.year)
          if(yearInd != -1) {
            result[yearInd].months.push({month: this.monthToText(data[i]._id.month), kWatts: data[i].totalAmount})
          } else {
            result.push({title: data[i]._id.year+"", months: []})
          }
        }

        for (let i =0; i<result.length; i++) {
          let currentYear = result[i]
          var sum = 0
          for (let j =0; j<currentYear.months.length; j++) {
            sum += currentYear.months[j].kWatts
            if (i==0 && j==0) {
              result[i].months[j].down = false
              result[i].months[j].delta = 0
            } else if (j==0) {
              let diff = (result[i].months[j].kWatts - result[i-1].months[result[i-1].months.length - 1].kWatts) / result[i-1].months[result[i-1].months.length - 1].kWatts
              if (diff >= 0) {
                result[i].months[j].down = false
              } else  result[i].months[j].down = true
              result[i].months[j].delta = Math.round(diff* 100) / 100
            } else {
              let diff = (result[i].months[j].kWatts - result[i].months[j - 1].kWatts) / result[i].months[j - 1].kWatts
              result[i].months[j].delta = Math.round(diff* 100) / 100
              if (diff >= 0) {
                result[i].months[j].down = false
              } else  result[i].months[j].down = true
            }
          }
          result[i].sum = sum

        }

        result[result.length - 1].active = true


        return result;
      });
  }

  authenticatedHeaders() {
    var headers = new Headers({'Content-Type': 'application/json', 'x-access-token': this.storageService.read<User>("currentUser").token});
    console.log(this.storageService.read<User>("currentUser").token)
    return new RequestOptions({ headers: headers });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  dayToText(numb) {
    switch (numb) {
      case 1:
        return "Sun"
      case 2:
        return "Mon"
      case 3:
        return "Tues"
      case 4:
        return "Wed"
      case 5:
        return "Thurs"
      case 6:
        return "Fri"
      case 7:
        return "Sat"
    }
  }

  monthToText(numb) {
    switch (numb) {
      case 1:
        return "Jan"
      case 2:
        return "Feb"
      case 3:
        return "Mar"
      case 4:
        return "Apr"
      case 5:
        return "May"
      case 6:
        return "Jun"
      case 7:
        return "July"
      case 8:
        return "Aug"
      case 9:
        return "Sept"
      case 10:
        return "Oct"
      case 11:
        return "Nov"
      case 12:
        return "Dec"
    }
  }

  checkIfYearExists(results, year) {
    for(let i =0; i< results.length; i++){
      if (results[i].title == year + "") {
        return i;
      }
    }
    return -1;
  }
}
