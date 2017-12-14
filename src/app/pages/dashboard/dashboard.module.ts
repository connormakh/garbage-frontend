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


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    MapsModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent,
    ConsumptionGraphComponent,
    ConsumptionComponent,
    BarGraphWeeklyComponent
  ],
})
export class DashboardModule { }
