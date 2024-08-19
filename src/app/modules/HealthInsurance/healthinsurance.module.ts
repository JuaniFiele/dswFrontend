import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HealthInsuranceRoutingModule } from './healthinsurance-routing.module';
import { HealthInsuranceListComponent } from './components/healthinsurance-list/healthinsurance-list.component';
import { HealthInsuranceDetailComponent } from './components/healthinsurance-detail/healthinsurance-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HealthInsuranceListComponent,
    HealthInsuranceDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HealthInsuranceRoutingModule,
    HttpClientModule
  ]
})
export class HealthInsuranceModule { }
