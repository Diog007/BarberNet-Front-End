import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cabeleireiros } from '../models/Cabeleireiros';
import { API_CONFIG } from '../config/api.config';
import { CabeleireirosCreate } from '../models/Cabeleireiros-create';

@Injectable({
  providedIn: 'root'
})
export class CabeleireirosService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<CabeleireirosCreate>{
    return this.http.get<CabeleireirosCreate>(`${API_CONFIG.baseUrl}cabeleireiros/${id}`)
  } 

  findAll(): Observable<Cabeleireiros[]> {
    return this.http.get<Cabeleireiros[]>(`${API_CONFIG.baseUrl}cabeleireiros`);
  }

  create(cabeleireiro: CabeleireirosCreate): Observable<CabeleireirosCreate> {
    return this.http.post<CabeleireirosCreate>(`${API_CONFIG.baseUrl}cabeleireiros`, cabeleireiro)
  }

  delete(id: any): Observable<CabeleireirosCreate> {
    return this.http.delete<CabeleireirosCreate>(`${API_CONFIG.baseUrl}cabeleireiros/${id}`);
  }

}
