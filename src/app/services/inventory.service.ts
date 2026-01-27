import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateInboundRequest {
  [key: string]: any; // Map to CreateInboundRequest DTO from backend
}

export interface CreateOutboundRequest {
  [key: string]: any; // Map to CreateOutboundRequest DTO from backend
}

export interface InboundResponse {
  id: string;
}

export interface OutboundResponse {
  id: string;
}

export interface StockResponse {
  clientId: string;
  productId: string;
  sectionId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'https://localhost:7006/api'; // Adjust port as needed

  constructor(private http: HttpClient) {}

  processInbound(dto: CreateInboundRequest): Observable<InboundResponse> {
    return this.http.post<InboundResponse>(`${this.apiUrl}/inbound`, dto);
  }

  processOutbound(dto: CreateOutboundRequest): Observable<OutboundResponse> {
    return this.http.post<OutboundResponse>(`${this.apiUrl}/outbound`, dto);
  }

  getStock(clientId: string, productId: string, sectionId: string): Observable<StockResponse> {
    return this.http.get<StockResponse>(`${this.apiUrl}/stock`, {
      params: { clientId, productId, sectionId }
    });
  }
}
