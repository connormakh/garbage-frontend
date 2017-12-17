import {AfterViewInit, Component, OnDestroy, Input, OnInit, OnChanges} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {AngularEchartsDirective} from "ngx-echarts";

declare const echarts: any;

@Component({
  selector: 'ngx-consumption-chart',
  styleUrls: ['./consumption-graph.component.scss'],
  template: `
    <div echarts [options]="option" class="echart" (chartInit)="onChartInit($event)"></div>
  `,
})
export class ConsumptionGraphComponent implements OnChanges, OnDestroy {

  option: any;
  data: Array<any>;
  themeSubscription: any;
  echartsInstance: any;
  @Input() records;
  @Input() type;

  constructor(private theme: NbThemeService) {




    // const points = [];
    // let pointsCount = 100;
    // let min = -3;
    // let max = 3;
    // let xStep = (max - min) / pointsCount;
    //
    // for(let x = -3; x <= 3; x += xStep) {
    //   let res = x**3 - 5*x + 17;
    //   points.push(Math.round(res * 25));
    // }




  }
  onChartInit(e) {
    this.echartsInstance = e
  }

  ngOnChanges() {
    console.log("changes")
    let points = [];
    if (this.type == "year")  {
      points = []
      for(let p of this.records) {
        points.push(p.sum)
      }
      this.data = points.map((p, index) => ({
        label: this.records[index].title,
        value: p
      }));
    }

    if(this.type == "month") {
      for(let p of this.records[this.records.length - 1].months) {

        points.push(p.kWatts)
      }
      this.data = points.map((p, index) => ({
        label: this.records[this.records.length - 1].months[index].month,
        value: p
      }));
    }


    this.initOpt()

  }

  initOpt(): void {
    this.themeSubscription = this.theme.getJsTheme().delay(1).subscribe(config => {
      const eTheme: any = config.variables.electricity;

      this.option = {
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 80,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: eTheme.tooltipLineColor,
              width: eTheme.tooltipLineWidth,
            },
          },
          textStyle: {
            color: eTheme.tooltipTextColor,
            fontSize: 20,
            fontWeight: eTheme.tooltipFontWeight,
          },
          position: 'top',
          backgroundColor: eTheme.tooltipBg,
          borderColor: eTheme.tooltipBorderColor,
          borderWidth: 3,
          formatter: '{c0} m3',
          extraCssText: eTheme.tooltipExtraCss,
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          offset: 0,
          data: this.data.map(i => i.label),
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: eTheme.xAxisTextColor,
              fontSize: 18,
            },
          },
          axisLine: {
            lineStyle: {
              color: eTheme.axisLineColor,
              width: '2',
            },
          },
        },
        yAxis: {
          boundaryGap: [0, '5%'],
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: eTheme.yAxisSplitLine,
              width: '1',
            },
          },
        },
        series: [
          {
            type: 'line',
            smooth: true,
            symbolSize: 20,
            itemStyle: {
              normal: {
                opacity: 0,
              },
              emphasis: {
                color: '#ffffff',
                borderColor: eTheme.itemBorderColor,
                borderWidth: 2,
                opacity: 1,
              },
            },
            lineStyle: {
              normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.lineGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.lineGradTo,
                }]),
                shadowColor: eTheme.lineShadow,
                shadowBlur: 6,
                shadowOffsetY: 12,
              },
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.areaGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.areaGradTo,
                }]),
              },
            },
            data: this.data.map(i => i.value),
          },

          {
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              normal: {
                width: eTheme.lineWidth,
                type: eTheme.lineStyle,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: eTheme.lineGradFrom,
                }, {
                  offset: 1,
                  color: eTheme.lineGradTo,
                }]),
                shadowColor: eTheme.shadowLineDarkBg,
                shadowBlur: 14,
                opacity: 1,
              },
            },
            data: this.data.map(i => i.value),
          },
        ],
      };
    });
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
