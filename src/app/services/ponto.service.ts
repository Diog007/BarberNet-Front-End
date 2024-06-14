import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ponto } from '../models/Ponto';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { DadosDeEntrada } from '../models/DadosDeEntrada';

@Injectable({
  providedIn: 'root'
})
export class PontoService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Ponto[]> {
    return this.http.get<Ponto[]>(`${API_CONFIG.baseUrl}ponto`);
  }

  entrada(cpf: DadosDeEntrada): Observable<DadosDeEntrada> {
    return this.http.post<DadosDeEntrada>(`${API_CONFIG.baseUrl}ponto/entrada`, cpf);
  }

  saida(cpf: DadosDeEntrada): Observable<DadosDeEntrada> {
    return this.http.post<DadosDeEntrada>(`${API_CONFIG.baseUrl}ponto/saida`, cpf);
  }

}
