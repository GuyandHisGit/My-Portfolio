import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';  // Backend URL

  constructor(private http: HttpClient) {}

  // Add actual API methods here when needed
}
