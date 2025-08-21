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
export class ReadComponent implements OnInit {
  appartementToUpdate: Appartement | null = null;
  appartements: Appartement[] = [];
  filteredAppartements: Appartement[] = [];
  searchTerm: string = '';
  toasts: { message: string, type: 'success' | 'error' }[] = [];

  constructor(
    private appartementService: AppartementService,
    private router: Router
  ) {}

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
        this.showToast('Failed to load appartements ❌', 'error');
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
        this.fetchAppartements();
        this.showToast('Appartement deleted successfully ✅', 'success');
      },
      error: () => {
        this.showToast('Failed to delete appartement ❌', 'error');
      }
    });
  }

  saveAppartement(): void {
    if (!this.appartementToUpdate) return;

    if (this.appartementToUpdate.id_app) {
      this.appartementService.updateAppartement(this.appartementToUpdate).subscribe({
        next: () => {
          this.fetchAppartements();
          this.closeModal();
          this.showToast('Appartement updated successfully ✅', 'success');
        },
        error: (err) => this.showToast(err.error?.message || 'Failed to update appartement ❌', 'error')
      });
    } else {
      this.appartementService.addAppartement(this.appartementToUpdate).subscribe({
        next: () => {
          this.fetchAppartements();
          this.closeModal();
          this.showToast('Appartement created successfully ✅', 'success');
        },
        error: (err) => this.showToast(err.error?.message || 'Failed to create appartement ❌', 'error')
      });
    }
  }

  openEditModal(appartement: Appartement) {
    this.appartementToUpdate = { ...appartement };
    const modal = new bootstrap.Modal(document.getElementById('appartementModal')!);
    modal.show();
  }

  openCreateModal(): void {
    this.appartementToUpdate = { id_app: undefined, titre: '', description: '' };
    const modal = new bootstrap.Modal(document.getElementById('appartementModal')!);
    modal.show();
  }

  closeModal(): void {
    const modalEl = document.getElementById('appartementModal');
    if (modalEl) {
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal?.hide();
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    const toast = { message, type };
    this.toasts.push(toast);

    // Remove after 3 seconds
    setTimeout(() => {
      const index = this.toasts.indexOf(toast);
      if (index >= 0) this.toasts.splice(index, 1);
    }, 3000);
  }
}
