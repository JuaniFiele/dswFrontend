import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthInsuranceListComponent } from './components/healthinsurance-list/healthinsurance-list.component';
import { HealthInsuranceDetailComponent } from './components/healthinsurance-detail/healthinsurance-detail.component';

const routes: Routes = [
  { path: '', component: HealthInsuranceListComponent },
  { path: 'new', component: HealthInsuranceDetailComponent },
  { path: ':id', component: HealthInsuranceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthInsuranceRoutingModule { }
