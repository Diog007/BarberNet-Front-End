import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../models/Clientes';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Clientes>{
    return this.http.get<Clientes>(`${API_CONFIG.baseUrl}clientes/${id}`)
  } 

  findAll(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${API_CONFIG.baseUrl}clientes`);
  }

  create(cliente: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${API_CONFIG.baseUrl}clientes`, cliente)
  }

  delete(id: any): Observable<Clientes> {
    return this.http.delete<Clientes>(`${API_CONFIG.baseUrl}clientes/${id}`);
  }

  update(cliente: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${API_CONFIG.baseUrl}clientes/${cliente.id}`, cliente)
  }

}
