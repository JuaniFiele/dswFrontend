import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Medic } from '../interfaces/medic.js';
import {  ConsultationHours } from '../interfaces/consultationHours.js';
import { Attention } from '../interfaces/attention.js';

@Injectable({
  providedIn: 'root'
})

export class AttentionService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = 'http://localhost:3000/'
    this.myApiUrl = 'api/Attentions'}


  getAttentions(): Observable<Attention[]> {
    return this.http.get<{data: Attention[]}>(`${this.myAppUrl}${this.myApiUrl}`)
    .pipe(
      map(response =>  response.data)
    );
  }

  getAllAttentionsByDNI(dni: number): Observable<Attention[]> {
    return this.http.get<{ data: Attention[] }>(`${this.myAppUrl}${this.myApiUrl}${dni}`)
      .pipe(
        map(response => response.data)
      );
  }

  addTurno(aAttention: Attention): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, aAttention);
  }


}