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

  }
  saveCompanyDetails(){
    this.authenticationService.editCompany(this.companyName, this.companyCountry, null, null)
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
    this.authenticationService.editCompany(null, null, this.truckCount, this.truckVolume)
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
    console.log(value)
    this.showSave1 = true
    this.companyCountry = value.value
  }
}
