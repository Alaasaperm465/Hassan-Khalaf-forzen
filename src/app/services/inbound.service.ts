import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InboundLine {
  productName: string;
  sectionName: string;
  cartons: number;
  pallets: number;
}

export interface InboundRequest {
  clientId: number;
  lines: InboundLine[];
}

export interface InboundResponse {
  id: string;
  clientName: string;
  lines: InboundLine[];
  createdAt: string;
}

export interface ClientRequest {
  id: number;
  name: string;
}

export interface ProductRequest {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class InboundService {

  private apiUrl = 'https://localhost:7006/api';

  constructor(private http: HttpClient) {}

  createInbound(data: InboundRequest): Observable<InboundResponse> {
    return this.http.post<InboundResponse>(`${this.apiUrl}/inbound`, data);
  }

  getAllClients(): Observable<ClientRequest[]> {
    return this.http.get<ClientRequest[]>(`${this.apiUrl}/client`);
  }

  getAllProducts(): Observable<ProductRequest[]> {
    return this.http.get<ProductRequest[]>(`${this.apiUrl}/product`);
  }
}
