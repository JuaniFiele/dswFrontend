import { Component, OnInit } from '@angular/core';
import { HealthInsuranceService } from '../services/healthinsurance.service';
import { HealthInsurance } from '../models/healthinsurance.model';

@Component({
  selector: 'app-healthinsurance-list',
  templateUrl: './healthinsurance-list.component.html',
  styleUrls: ['./healthinsurance-list.component.scss']
})
export class HealthInsuranceListComponent implements OnInit {
    healthinsurances: HealthInsurance[] = [];

  constructor(private healthinsuranceService: HealthInsuranceService) {}

  ngOnInit(): void {
    this.healthinsuranceService.getAll().subscribe(data => {
      this.healthinsurances = data;
    });
  }

  delete(id: number): void {
    this.healthinsuranceService.delete(id).subscribe(() => {
      this.healthinsurances = this.healthinsurances.filter(e => e.id !== id);
    });
  }
}
