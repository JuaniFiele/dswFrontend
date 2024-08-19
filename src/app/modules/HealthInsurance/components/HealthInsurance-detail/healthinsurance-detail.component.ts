import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthInsuranceService } from '../services/healthinsurance.service';
import { HealthInsurance } from '../models/healthinsurance.model';

@Component({
  selector: 'app-healthinsurance-detail',
  templateUrl: './healthinsurance-detail.component.html',
  styleUrls: ['./healthinsurance-detail.component.scss']
})
export class HealthInsuranceDetailComponent implements OnInit {
    healthinsurance: HealthInsurance = { id: 0, nombre: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private healthinsuranceService: HealthInsuranceService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if (id) {
      this.healthinsuranceService.getById(id).subscribe(data => {
        this.healthinsurance = data;
      });
    }
  }

  save(): void {
    if (this.healthinsurance.id) {
      this.healthinsuranceService.update(this.healthinsurance).subscribe(() => {
        this.router.navigate(['/healthinsurances']);
      });
    } else {
      this.healthinsuranceService.create(this.healthinsurance).subscribe(() => {
        this.router.navigate(['/healthinsurances']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/healthinsurances']);
  }
}
