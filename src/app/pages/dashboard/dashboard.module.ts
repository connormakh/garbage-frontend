import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { StatusCardComponent } from './status-card/status-card.component';
import {MapsModule} from "../maps/maps.module";
import {LeafletComponent} from "../maps/leaflet/leaflet.component";


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    MapsModule
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent
  ],
})
export class DashboardModule { }
