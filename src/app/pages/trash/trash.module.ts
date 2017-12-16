/**
 * Created by connormakhlouta on 10/22/17.
 */
import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { TrashComponent } from './trash.component';
import {TrashCardComponent} from "./trash-card/trash-card.component";
import {TrashRequestComponent} from "./trash-request/trash-request.component";
import {TrashRequestModalComponent} from "./trash-request/modal/request-modal.component";
import {AgmCoreModule, GoogleMapsAPIWrapper} from "@agm/core";
import {RoutingMapComponent} from "./routing-map/routing-map.component";
import {MapDirectionsDirective} from "./routing-map/map-directions.directive";
import {DriverSendModalComponent} from "./routing-map/send-modal/driver-send-modal.component";


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBVT1QTrax915qYxVWIS8deVEGNm7RGYUI'
    })

  ],
  declarations: [
    TrashComponent,
    TrashCardComponent,
    TrashRequestComponent,
    TrashRequestModalComponent,
    RoutingMapComponent,
    MapDirectionsDirective,
    DriverSendModalComponent
  ],
  entryComponents: [
    TrashRequestModalComponent,
    DriverSendModalComponent
  ],
  providers: [
    MapDirectionsDirective,
    GoogleMapsAPIWrapper
  ]
})
export class TrashModule { }
