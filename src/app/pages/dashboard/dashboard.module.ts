import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import {MapsModule} from "../maps/maps.module";
import {LeafletComponent} from "../maps/leaflet/leaflet.component";
import {ConsumptionGraphComponent} from "./consumption-graph/consumption-graph.component";
import {ConsumptionComponent} from "./consumption/consumption.component";
import {BarGraphWeeklyComponent} from "./bar-graph-weekly/bar-graph-weekly.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {ChartModule} from "angular2-chartjs";
import {BarGraphMonthlyComponent} from "./bar-graph-monthly/bar-graph-monthly.component";
import {PieChartDriversComponent} from "./pi-chart-drivers/pie-chart-drivers.component";


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    MapsModule,
    NgxChartsModule,
    ChartModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ConsumptionGraphComponent,
    ConsumptionComponent,
    BarGraphWeeklyComponent,
    BarGraphMonthlyComponent,
    PieChartDriversComponent
  ],
})
export class DashboardModule { }
