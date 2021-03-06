import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService, NbColorHelper} from '@nebular/theme';
import {AuthenticationService} from "../../../@core/services/authentication.service";

@Component({
  selector: 'ngx-weekly-bar',
  templateUrl: 'bar-graph-weekly.component.html',
  styleUrls: ['bar-graph-weekly.component.scss']
})
export class BarGraphWeeklyComponent implements OnInit{
  data: any;
  options: any;
  themeSubscription: any;
  labels: any[]
  yearly: any[]

  constructor(private theme: NbThemeService, private authenticationService: AuthenticationService) {}

  ngOnInit(){

    this.authenticationService.getEmptiedGraph("y")
      .subscribe(
        data => {
            this.labels = []
            this.yearly = []
            for (let obj of data) {
              this.labels.push(obj.title)
              this.yearly.push(obj.sum)
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
          data: this.yearly,
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
