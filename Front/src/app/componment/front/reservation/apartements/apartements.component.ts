import { Component, OnInit } from '@angular/core';
import { AppartementService } from 'src/app/Services/appartement/appartement.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { Pays } from 'src/app/models/Pays';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-apartements',
  templateUrl: './apartements.component.html',
  styleUrls: ['./apartements.component.css']
})
export class ApartementsComponent implements OnInit {

  paysList: Pays[] = [];
  reservations: Reservation[] = [];
  selectedCountry: string = 'all';

  constructor(
    private appService: AppartementService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.fetchPays();
    this.getReservations(); // load all reservations at start
  }

  fetchPays(): void {
    this.appService.getAllPays().subscribe({
      next: data => this.paysList = data,
      error: () => console.error("Erreur lors du chargement des pays ❌")
    });
  }

  getReservations(): void {
    this.reservationService.getReservationsByCountry(this.selectedCountry).subscribe({
      next: (data) => {
        console.log("Fetched reservations:", data);
        this.reservations = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des réservations ❌", err);
        this.reservations = [];
      }
    });
  }
}
