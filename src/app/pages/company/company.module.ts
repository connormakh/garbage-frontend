import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import {CompanyRoutingModule, routedComponents} from "./company-routing.module";
import {CompanyComponent} from "./company.component";
import {CompanyDriversComponent} from "./company-drivers/company-drivers.component";
import {CompanyDetailsComponent} from "./company-details/company-details.component";

@NgModule({
  imports: [
    ThemeModule,
    CompanyRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    CompanyComponent,
    CompanyDriversComponent,
    CompanyDetailsComponent
  ],
  providers: [
    SmartTableService,
  ],
})
export class CompanyModule { }
