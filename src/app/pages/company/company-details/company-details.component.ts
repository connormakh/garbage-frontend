import {Component, OnInit} from '@angular/core';
import {User} from "../../../@core/models/user";
import {StorageService} from "../../../@core/services/storage.service";

@Component({
  selector: 'ngx-company-details',
  styleUrls: ['./company-details.component.scss'],
  templateUrl: './company-details.component.html',
})
export class CompanyDetailsComponent implements OnInit{

  private user: any = {}

  constructor(private storageService: StorageService){}


  ngOnInit() {
    this.user = this.storageService.read<any>("currentUser")
  }
}
