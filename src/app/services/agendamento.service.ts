import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamentos } from '../models/Agendamentos';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Agendamentos[]> {
    return this.http.get<Agendamentos[]>(`${API_CONFIG.baseUrl}agendamentos`)
  }

  
}
