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
import {AgmCoreModule} from "@agm/core";


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
    TrashRequestModalComponent
  ],
  entryComponents: [
    TrashRequestModalComponent,
  ],
})
export class TrashModule { }
