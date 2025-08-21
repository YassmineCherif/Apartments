// src/app/services/appartement.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';    
import { Appartement } from 'src/app/models/appartement';
import { Bloc } from 'src/app/models/bloc';
 // create this later

@Injectable({
  providedIn: 'root'
})
export class AppartementService {

private baseUrl = 'http://localhost:8089/fegaac1/appartements';
  // ✅ matches @RequestMapping("/appartements")

  constructor(private http: HttpClient) { }

  // Add new appartement
  addAppartement(appartement: Appartement): Observable<Appartement> {
    return this.http.post<Appartement>(`${this.baseUrl}`, appartement)
      .pipe(catchError(this.handleError));
  }

  // Get all appartements
  getAllAppartements(): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(`${this.baseUrl}`)
      .pipe(catchError(this.handleError));
  }

  // Get appartement by ID
  getAppartementById(id: number): Observable<Appartement> {
    return this.http.get<Appartement>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Update appartement
  updateAppartement(appartement: Appartement): Observable<Appartement> {
    return this.http.put<Appartement>(`${this.baseUrl}`, appartement)
      .pipe(catchError(this.handleError));
  }

  // Delete appartement
  deleteAppartement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Get appartements by bloc
  getAppartementsByBloc(bloc: Bloc): Observable<Appartement[]> {
    return this.http.post<Appartement[]>(`${this.baseUrl}/by-bloc`, bloc)
      .pipe(catchError(this.handleError));
  }

  // Error handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error?.message) {
        errorMessage += `\nDetails: ${error.error.message}`;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
