import {Component, OnInit, OnChanges} from '@angular/core';
import {User} from "../../../@core/models/user";
import {StorageService} from "../../../@core/services/storage.service";
import {AuthenticationService} from "../../../@core/services/authentication.service";

@Component({
  selector: 'ngx-company-details',
  styleUrls: ['./company-details.component.scss'],
  templateUrl: './company-details.component.html',
})
export class CompanyDetailsComponent implements OnInit{

  private user: any = {}
  private showSave1 = false
  private showSave2 = false
  private companyName: string = ""
  private companyCountry: string = ""
  private truckCount: number = 0
  private truckVolume: number = 0

  private markerEnabled = false
  private marker = {lat: 0, lng: 0}


  private userLat = 0
  private userLng = 0

  constructor(private storageService: StorageService, private authenticationService: AuthenticationService){}


  ngOnInit() {
    this.user = this.storageService.read<User>("currentUser")
    console.log("loggedInDetails", this.user)
    if (this.user.company != null) {
      this.companyName = this.user.company.name
      this.companyCountry = this.user.company.country
      this.truckVolume = this.user.company.truck_volume
      this.truckCount = this.user.company.truck_count
    }

    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.userLat = position.coords.latitude
          this.userLng = position.coords.longitude
          this.marker ={
            lat: this.userLat,
            lng: this.userLng
          };
          this.showSave1 = true
          this.markerEnabled = true
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;
          }
        }
      );
    };
  }

  chooseLocation($event) {
    this.marker ={
      lat: $event.coords.lat,
      lng: $event.coords.lng
    };
    this.markerEnabled = true
  }

  saveCompanyDetails(){
    this.authenticationService.editCompany(this.companyName, this.companyCountry, this.marker.lat, this.marker.lng, null, null)
      .subscribe(
        data => {
          // this.router.navigate(['/']);
          this.showSave1 = false
        },
        error => {
          // this.alertService.error(error);
          // this.submitted = false;
          // this.errors.push(error)
        });
  }

  saveCompanyTruckDetails(){
    this.authenticationService.editCompany(null, null, null, null, this.truckCount, this.truckVolume)
    .subscribe(
        data => {
          // this.router.navigate(['/']);
          this.showSave2 = false
        },
        error => {
          // this.alertService.error(error);
          // this.submitted = false;
          // this.errors.push(error)
        });
  }

  setCountry(value) {
    this.showSave1 = true
    this.companyCountry = value.value
    this.authenticationService.getCountryCoordinates()
  }
}
