import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthInsurance } from '../models/healthinsurance.model';

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceService {
  private apiUrl = 'http://localhost:3000/healthinsurances';

  constructor(private http: HttpClient) {}

  getAll(): Observable<HealthInsurance[]> {
    return this.http.get<HealthInsurance[]>(this.apiUrl);
  }

  getById(id: number): Observable<HealthInsurance> {
    return this.http.get<HealthInsurance>(`${this.apiUrl}/${id}`);
  }

  create(healthinsurance: HealthInsurance): Observable<HealthInsurance> {
    return this.http.post<HealthInsurance>(this.apiUrl, healthinsurance);
  }

  update(healthinsurance: HealthInsurance): Observable<HealthInsurance> {
    return this.http.put<HealthInsurance>(`${this.apiUrl}/${healthinsurance.id}`, healthinsurance);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
