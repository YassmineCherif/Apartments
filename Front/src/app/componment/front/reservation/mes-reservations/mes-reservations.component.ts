import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent implements OnInit {

  reservations: Reservation[] = [];
  staticUserId = 1; 
  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getReservationsByUser(this.staticUserId).subscribe({
      next: data => this.reservations = data,
      error: () => console.error("Erreur lors du chargement des réservations ❌")
    });
  }
}
