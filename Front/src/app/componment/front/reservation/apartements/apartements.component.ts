import { Component, OnInit } from '@angular/core';
import { AppartementService } from 'src/app/Services/appartement/appartement.service';
import { Pays } from 'src/app/models/Pays';
import { Residence } from 'src/app/models/Residence';
import { Bloc } from 'src/app/models/bloc';
import { Appartement } from 'src/app/models/appartement';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { Reservation } from 'src/app/models/Reservation';

declare var bootstrap: any;


@Component({
  selector: 'app-apartements',
  templateUrl: './apartements.component.html',
  styleUrls: ['./apartements.component.css']
})
export class ApartementsComponent implements OnInit {

  paysList: Pays[] = [];
  residencesList: Residence[] = [];
  blocsList: Bloc[] = [];
  appartementsList: Appartement[] = [];

  selectedPaysId?: number;
  selectedResidenceId?: number;
  selectedBlocId?: number;
  selectedAppartementId?: number;

reservation: Reservation = { dateDebut: '', dateFin: '', approved: false };
selectedAppartement: Appartement | null = null;


  toasts: { message: string, type: 'success' | 'error' }[] = [];

  reservedApartments: number[] = []; 
  staticUserId = 1;

  constructor(
    private appService: AppartementService,
    private reservationService: ReservationService,
      private toastr: ToastrService

  ) {}

  ngOnInit(): void {
    this.fetchPays();
  }

  // ================== FETCH ==================
  fetchPays(): void {
    this.appService.getAllPays().subscribe({
      next: data => this.paysList = data,
      error: () => this.showToast('Erreur lors du chargement des pays ❌', 'error')
    });
  }

  onPaysChange(): void {
    if (!this.selectedPaysId) {
      this.residencesList = [];
      this.blocsList = [];
      this.appartementsList = [];
      return;
    }
    this.appService.getResidencesByPays(this.selectedPaysId).subscribe({
      next: data => { 
        this.residencesList = data;
        this.blocsList = [];
        this.appartementsList = [];
        this.selectedResidenceId = undefined;
        this.selectedBlocId = undefined;
        this.selectedAppartementId = undefined;
      },
      error: () => console.error("Erreur lors du chargement des résidences ❌")
    });
  }

  onResidenceChange(): void {
    if (!this.selectedResidenceId) {
      this.blocsList = [];
      this.appartementsList = [];
      return;
    }
    this.appService.getBlocsByResidence(this.selectedResidenceId).subscribe({
      next: data => { 
        this.blocsList = data;
        this.appartementsList = [];
        this.selectedBlocId = undefined;
        this.selectedAppartementId = undefined;
      },
      error: () => console.error("Erreur lors du chargement des blocs ❌")
    });
  }


  

onBlocChange(): void {
  if (!this.selectedBlocId) {
    this.appartementsList = [];
    return;
  }
  this.appService.getAppartementsByBloc(this.selectedBlocId).subscribe({
    next: data => {
      this.appartementsList = data;
      this.appartementsList.forEach(app => {
        this.reservationService.checkReservation(app.id_app!, this.staticUserId)
          .subscribe(isReserved => {
            if (isReserved) this.reservedApartments.push(app.id_app!);
          });
      });
    },
    error: () => console.error("Erreur lors du chargement des appartements ❌")
  });
}





  // ================== RESERVATION ==================
reserver(app: Appartement): void {
  if (!app?.id_app) {
    this.showToast('Appartement non sélectionné ❌', 'error');
    return;
  }

  this.reservationService.reserverAppartement(app.id_app, this.staticUserId)
    .subscribe({
      next: (res: any) => {
        this.showToast(res.message || 'Réservation effectuée ✅', 'success');
        // Add this line to update the reserved list immediately
        this.reservedApartments.push(app.id_app!);
      },
      error: () => this.showToast('Erreur lors de la réservation ❌', 'error')
    });
}


// Open modal when clicking "Réserver"
openReservationModal(app: Appartement) {
  this.selectedAppartement = app;
  this.reservation = { dateDebut: '', dateFin: '', approved: false }; // reset dates
  const modal = new bootstrap.Modal(document.getElementById('reservationModal')!);
  modal.show();
}

// Confirm reservation after selecting dates
confirmReservation() {
  if (!this.selectedAppartement) return;

  if (!this.reservation.dateDebut || !this.reservation.dateFin) {
    this.showToast('Please select both start and end dates ❌', 'error');
    return;
  }

  this.reservationService.reserverAppartementWithDates(
    this.selectedAppartement.id_app!,
    this.staticUserId,
    this.reservation.dateDebut,
    this.reservation.dateFin
  ).subscribe({
    next: (res: any) => {
      this.showToast(res.message || 'Réservation effectuée ✅', 'success');
      this.reservedApartments.push(this.selectedAppartement!.id_app!);
      // close modal
      const modalEl = document.getElementById('reservationModal')!;
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    },
    error: () => this.showToast('Erreur lors de la réservation ❌', 'error')
  });
}


  showToast(message: string, type: 'success' | 'error') {
    const toast = { message, type };
    this.toasts.push(toast);
    setTimeout(() => {
      const index = this.toasts.indexOf(toast);
      if (index >= 0) this.toasts.splice(index, 1);
    }, 3000);
  }
}
