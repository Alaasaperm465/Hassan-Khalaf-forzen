import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Section {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  private apiUrl = 'https://localhost:7006/api/section';

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.apiUrl);
  }

  getSectionById(id: string): Observable<Section> {
    return this.http.get<Section>(`${this.apiUrl}/${id}`);
  }

  createSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.apiUrl, section);
  }

  updateSection(id: string, section: Section): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, section);
  }

  deleteSection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
