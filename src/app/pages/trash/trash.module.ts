/**
 * Created by connormakhlouta on 10/22/17.
 */
import { NgModule } from '@angular/core';
import { AngularEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { TrashComponent } from './trash.component';
import {TrashCardComponent} from "./trash-card/trash-card.component";


@NgModule({
  imports: [
    ThemeModule,
    AngularEchartsModule,
  ],
  declarations: [
    TrashComponent,
    TrashCardComponent
  ],
})
export class TrashModule { }
