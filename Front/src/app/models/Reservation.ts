import { Appartement } from "./appartement";

export interface Reservation {
  id_reservation?: number;
  dateDebut: string;  
  dateFin: string;   
  approved: boolean;
  appartements?: Appartement;
}
