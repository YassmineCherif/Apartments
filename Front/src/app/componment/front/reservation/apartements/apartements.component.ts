import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { Pays } from 'src/app/models/Pays';
import { Residence } from 'src/app/models/Residence';
import { Bloc } from 'src/app/models/bloc';
import { Appartement } from 'src/app/models/appartement';

@Component({
  selector: 'app-apartements',
  templateUrl: './apartements.component.html',
  styleUrls: ['./apartements.component.css']
})
export class ApartementsComponent implements OnInit {

  paysList: Pays[] = [];
  residenceList: Residence[] = [];
  blocList: Bloc[] = [];
  appartementList: Appartement[] = [];

  selectedPaysId?: number;
  selectedResidenceId?: number;
  selectedBlocId?: number;
  selectedAppartementId?: number;

  startDate!: string;
  endDate!: string;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.reservationService.getPays().subscribe(data => this.paysList = data);
  }

  onPaysChange() {
    this.residenceList = [];
    this.blocList = [];
    this.appartementList = [];
    if (this.selectedPaysId)
      this.reservationService.getResidences(this.selectedPaysId)
        .subscribe(data => this.residenceList = data);
  }

  onResidenceChange() {
    this.blocList = [];
    this.appartementList = [];
    if (this.selectedResidenceId)
      this.reservationService.getBlocs(this.selectedResidenceId)
        .subscribe(data => this.blocList = data);
  }

  onBlocChange() {
    this.appartementList = [];
    if (this.selectedBlocId)
      this.reservationService.getAppartements(this.selectedBlocId)
        .subscribe(data => this.appartementList = data);
  }

  reserveAppartement() {
    if (this.selectedAppartementId && this.startDate && this.endDate) {
      this.reservationService.createReservation(
        this.selectedAppartementId,
        this.startDate,
        this.endDate
      ).subscribe(res => {
        alert('Reservation created successfully!');
      });
    }
  }
}
