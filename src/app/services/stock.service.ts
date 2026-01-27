import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StockResponse {
  clientId: string;
  productId: string;
  sectionId: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = 'https://localhost:7006/api'; // Adjust port as needed

  constructor(private http: HttpClient) {}

  getStock(clientId: string, productId: string, sectionId: string): Observable<StockResponse> {
    return this.http.get<StockResponse>(`${this.apiUrl}/stock`, {
      params: { clientId, productId, sectionId }
    });
  }
}
