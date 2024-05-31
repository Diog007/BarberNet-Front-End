import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabeleireiros } from '../models/Cabeleireiros';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CabeleireirosService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Cabeleireiros[]> {
    return this.http.get<Cabeleireiros[]>(`${API_CONFIG.baseUrl}cabeleireiros`);
  }
}