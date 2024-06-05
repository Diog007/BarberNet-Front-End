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

  findById(id: any): Observable<Agendamentos> {
    return this.http.get<Agendamentos>(`${API_CONFIG.baseUrl}agendamentos/${id}`)
  }

  findAll(): Observable<Agendamentos[]> {
    return this.http.get<Agendamentos[]>(`${API_CONFIG.baseUrl}agendamentos`)
  }

  create(agendamento: Agendamentos): Observable<Agendamentos> {
    return this.http.post<Agendamentos>(`${API_CONFIG.baseUrl}agendamentos`, agendamento)
  }

  update(agendamento: Agendamentos): Observable<Agendamentos> {
    return this.http.put<Agendamentos>(`${API_CONFIG.baseUrl}agendamentos/${agendamento.id}`, agendamento)
  }

  
}
