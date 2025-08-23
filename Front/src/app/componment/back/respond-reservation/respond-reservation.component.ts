import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { AppartementService } from 'src/app/Services/appartement/appartement.service';
import { Reservation } from 'src/app/models/Reservation';
import { Pays } from 'src/app/models/Pays';
import { Residence } from 'src/app/models/Residence';
import { Bloc } from 'src/app/models/bloc';
import { Appartement } from 'src/app/models/appartement';

@Component({
  selector: 'app-respond-reservation',
  templateUrl: './respond-reservation.component.html',
  styleUrls: ['./respond-reservation.component.css']
})
export class RespondReservationComponent implements OnInit {

  paysList: Pays[] = [];
  residencesList: Residence[] = [];
  blocsList: Bloc[] = [];

  selectedPaysId?: number;
  selectedResidenceId?: number;
  selectedBlocId?: number;
  appartementsList: Appartement[] = [];
  selectedAppartementId?: number;

  reservations: Reservation[] = [];
allReservations: Reservation[] = []; 
  constructor(
    private reservationService: ReservationService,
    private appartementService: AppartementService
  ) {}

  ngOnInit(): void {
    this.loadPays();
    this.loadAllReservations();
  }

  // ================== FETCH FILTER DATA ==================
  loadPays(): void {
    this.appartementService.getAllPays().subscribe(data => this.paysList = data);
  }



onPaysChange(): void {
  if (!this.selectedPaysId) {
    this.residencesList = [];
    this.blocsList = [];
    this.appartementsList = [];
    this.reservations = [];   // clear reservations if nothing is selected
    return;
  }

  this.appartementService.getResidencesByPays(this.selectedPaysId).subscribe({
    next: data => { 
      this.residencesList = data;
      this.blocsList = [];
      this.appartementsList = [];
      this.selectedResidenceId = undefined;
      this.selectedBlocId = undefined;
      this.selectedAppartementId = undefined;

      // 👉 filter reservations when pays is selected
      this.filterReservations();
    },
    error: () => console.error("Erreur lors du chargement des résidences ❌")
  });
}


  onResidenceChange(): void {
    if (!this.selectedResidenceId) {
      this.blocsList = [];
      this.filterReservations();
      return;
    }
    this.appartementService.getBlocsByResidence(this.selectedResidenceId).subscribe(data => {
      this.blocsList = data;
      this.selectedBlocId = undefined;
      this.filterReservations();
    });
  }

  onBlocChange(): void {
    this.filterReservations();
  }

 

  // ================== LOAD RESERVATIONS ==================
loadAllReservations(): void {
  this.reservationService.getAllReservations().subscribe({
    next: data => {
      this.allReservations = data;   // keep original
      this.enrichReservations(this.allReservations); // enrich ALL reservations
      this.reservations = [...this.allReservations]; // show all initially
    },
    error: () => console.error("Erreur lors du chargement des réservations ❌")
  });
}

// ================== ENRICH RESERVATIONS ==================
enrichReservations(resList: Reservation[]): void {
  resList.forEach(r => {
    if (r.appartements?.id_bloc) {
      this.appartementService.getBlocById(r.appartements.id_bloc).subscribe(bloc => {
        r.blocNom = bloc.nom;

        if (bloc.id_residence) {
          this.appartementService.getResidenceById(bloc.id_residence).subscribe(res => {
            r.residenceNom = res.nom;

            if (res.id_pays) {
              this.appartementService.getPaysById(res.id_pays).subscribe(p => {
                r.paysNom = p.pays;

                // 👉 reapply filter after enrichment
                this.filterReservations();
              });
            }
          });
        }
      });
    }
  });
}

// ================== FILTER ==================
filterReservations(): void {
  let filtered = [...this.allReservations];

  if (this.selectedBlocId) {
    filtered = filtered.filter(r => r.appartements?.id_bloc === this.selectedBlocId);
  }

  if (this.selectedResidenceId) {
    const selectedRes = this.residencesList.find(res => res.id_residence === this.selectedResidenceId)?.nom;
    filtered = filtered.filter(r => r.residenceNom === selectedRes);
  }

  if (this.selectedPaysId) {
    const selectedPays = this.paysList.find(p => p.id_country === this.selectedPaysId)?.pays;
    filtered = filtered.filter(r => r.paysNom === selectedPays);
  }

  this.reservations = filtered;
}


  // ================== RESPOND TO RESERVATION ==================
  acceptReservation(reservation: Reservation): void {
    this.updateApproval(reservation, 1); // approve
  }

  declineReservation(reservation: Reservation): void {
    this.updateApproval(reservation, 0); // decline
  }

  updateApproval(reservation: Reservation, status: number): void {
    this.reservationService.updateReservationApproval(reservation.id_reservation!, status).subscribe({
      next: () => {
        reservation.approved = status;
      },
      error: () => console.error("Erreur lors de la mise à jour de la réservation ❌")
    });
  }
}
