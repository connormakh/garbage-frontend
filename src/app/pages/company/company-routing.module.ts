import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CompanyComponent} from "./company.component";
import {CompanyDriversComponent} from "./company-drivers/company-drivers.component";

const routes: Routes = [{
  path: '',
  component: CompanyComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }

export const routedComponents = [
  CompanyDriversComponent,
];
