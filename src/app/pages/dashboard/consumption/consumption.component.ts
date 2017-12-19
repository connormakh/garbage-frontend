import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { ElectricityService } from '../../../@core/data/electricity.service';
import {AuthenticationService} from "../../../@core/services/authentication.service";

@Component({
  selector: 'ngx-consumption',
  styleUrls: ['./consumption.component.scss'],
  templateUrl: './consumption.component.html',
})
export class ConsumptionComponent implements OnDestroy, OnInit {

  data: Array<any>;

  type = 'month';
  types = [ 'month', 'year'];

  currentTheme: string;
  themeSubscription: any;
  private sum = 0

  constructor(private eService: ElectricityService, private themeService: NbThemeService, private authenticationService: AuthenticationService) {
    // this.data = this.eService.getData();


  }

  ngOnInit() {
    this.authenticationService.getConsumptionGraph("m")
      .subscribe(
        data => {
          this.data = data

          let summ = 0
          for(let obj of data) {
            summ += obj.sum
          }
          this.sum = summ
        },
        error => {
          // this.alertService.error(error);
        });

    this.themeSubscription = this.themeService.getJsTheme().subscribe(theme => {
      this.currentTheme = theme.name;
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

  changeType(t) {
    this.type = t

    switch (t) {
      case "year":
        break
      case "month":
        break
      case "week":
        break

    }

  }
}
