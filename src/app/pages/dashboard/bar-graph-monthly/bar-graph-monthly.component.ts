import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService, NbColorHelper} from '@nebular/theme';
import {AuthenticationService} from "../../../@core/services/authentication.service";

@Component({
  selector: 'ngx-monthly-bar',
  templateUrl: 'bar-graph-monthly.component.html',
  styleUrls: ['bar-graph-monthly.component.scss']
})
export class BarGraphMonthlyComponent implements OnInit{
  data: any;
  options: any;
  themeSubscription: any;
  labels: any[]
  monthly: any[]

  constructor(private theme: NbThemeService, private authenticationService: AuthenticationService) {}

  ngOnInit(){

    this.authenticationService.getEmptiedGraph("y")
      .subscribe(
        data => {
          this.labels = []
          this.monthly= []
          for (let obj of data[data.length - 1].months) {
            this.labels.push(obj.month)
            this.monthly.push(obj.kWatts)
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
          data: this.monthly,
          label: 'Cans Filled',
          backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  ngOnDestroy(): void {
    if (this.themeSubscription)
      this.themeSubscription.unsubscribe();
  }

}
