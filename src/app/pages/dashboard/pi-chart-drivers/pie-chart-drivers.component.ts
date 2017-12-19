import {Component, OnDestroy, OnInit} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AuthenticationService} from "../../../@core/services/authentication.service";

@Component({
  selector: 'ngx-drivers-pie',
  templateUrl: 'pie-chart-drivers.component.html',
  styleUrls: ['pie-chart-drivers.component.scss']
})
export class PieChartDriversComponent implements OnDestroy, OnInit {
  data: any;
  options: any;
  themeSubscription: any;
  labels: any[]
  values: any[]

  constructor(private theme: NbThemeService, private authenticationService: AuthenticationService) {}


  ngOnInit(){
    this.authenticationService.getDriverActivity()
      .subscribe(
        data => {
          this.labels = []
          this.values = []
          for(let obj of data) {
            this.labels.push(obj._id.name)
            this.values.push(obj.count)
          }
          this.initOptions()
        },
        error => {
          // this.alertService.error(error);

        });
  }

  initOptions(){
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.labels,
        datasets: [{
          data: this.values,
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scale: {
          pointLabels: {
            fontSize: 14,
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription)

      this.themeSubscription.unsubscribe();
  }
}
