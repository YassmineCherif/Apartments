import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bloc } from 'src/app/models/bloc';
import { Pays } from 'src/app/models/Pays';
import { Residence } from 'src/app/models/Residence';
import { AppartementService } from '../appartement/appartement.service';
import { Appartement } from 'src/app/models/appartement';
import { Reservation } from 'src/app/models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8089/reservation';  

  constructor(private http: HttpClient) { }

  getPays(): Observable<Pays[]> {
    return this.http.get<Pays[]>(`${this.apiUrl}/pays`);
  }

  getResidences(paysId: number): Observable<Residence[]> {
    return this.http.get<Residence[]>(`${this.apiUrl}/residences/${paysId}`);
  }

  getBlocs(residenceId: number): Observable<Bloc[]> {
    return this.http.get<Bloc[]>(`${this.apiUrl}/blocs/${residenceId}`);
  }

  getAppartements(blocId: number): Observable<Appartement[]> {
    return this.http.get<Appartement[]>(`${this.apiUrl}/appartements/${blocId}`);
  }

  createReservation(appartementId: number, start: string, end: string): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/${appartementId}?start=${start}&end=${end}`, {});
  }
}


 
 