import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ResponseInterface} from "../interfaces/ResponseInterface";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getParcels(): Observable<ResponseInterface>{
    return this.http.get<ResponseInterface>(`${this.apiUrl}/parcels`);
  }
}
