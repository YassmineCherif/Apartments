import { Component, OnInit } from '@angular/core';
import { Appartement } from 'src/app/models/appartement';
import { AppartementService } from 'src/app/Services/appartement/appartement.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent  implements OnInit {
  appartementToUpdate: Appartement | null = null;


  appartements: Appartement[] = [];
  filteredAppartements: Appartement[] = [];
  searchTerm: string = '';
  message: string = '';

  constructor(
    private appartementService: AppartementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAppartements();
  }

  fetchAppartements(): void {
    this.appartementService.getAllAppartements().subscribe({
      next: (data) => {
        this.appartements = data.sort((a, b) => (b.id_app ?? 0) - (a.id_app ?? 0));
        this.filteredAppartements = this.appartements;
      },
      error: () => {
        this.message = "Failed to load appartements.";
      }
    });
  }

  filterAppartements(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAppartements = this.appartements.filter(app =>
      app.titre.toLowerCase().includes(term) ||
      (app.description?.toLowerCase().includes(term) ?? false)
    );
  }

  supprimerAppartement(id_app?: number): void {
    if (!id_app) return;
    this.appartementService.deleteAppartement(id_app).subscribe({
      next: () => {
        this.message = "Appartement deleted successfully.";
        this.fetchAppartements();
      },
      error: () => {
        this.message = "Failed to delete appartement.";
      }
    });
  }

  afficherFormulaireModifier(appartement: Appartement): void {
    if (appartement.id_app !== undefined) {
      this.router.navigate(['/update-appartement', appartement.id_app]);
    }
  }

  ajouterAppartement(): void {
    this.router.navigate(['/create-appartement']);
  }



openEditModal(appartement: Appartement) {
  this.appartementToUpdate = { ...appartement }; // copy data to update object
  const modal = new bootstrap.Modal(document.getElementById('editAppartementModal')!);
  modal.show();
}
}

