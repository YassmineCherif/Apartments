import { Component, OnInit } from '@angular/core';
import { Appartement } from 'src/app/models/appartement';
import { Bloc } from 'src/app/models/bloc';
import { AppartementService } from 'src/app/Services/appartement/appartement.service';

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
  blocsList: Bloc[] = [];
  selectedBlocId?: number;
  searchTerm: string = '';
  toasts: { message: string, type: 'success' | 'error' }[] = [];

  constructor(private service: AppartementService) {}

  ngOnInit(): void {
    this.fetchBlocs();
    this.fetchAppartements();
  }

  fetchAppartements(): void {
    this.service.getAllAppartements().subscribe({
      next: data => {
        this.appartements = data.sort((a, b) => (b.id_app ?? 0) - (a.id_app ?? 0));
        this.filteredAppartements = this.appartements;
      },
      error: () => this.showToast('Failed to load appartements ❌', 'error')
    });
  }

  fetchBlocs(): void {
    this.service.getAllBlocs().subscribe({
      next: data => this.blocsList = data.sort((a, b) => a.nom > b.nom ? 1 : -1),
      error: () => this.showToast('Failed to load blocs ❌', 'error')
    });
  }

  filterAppartements(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAppartements = this.appartements.filter(app =>
      app.titre.toLowerCase().includes(term) ||
      (app.description?.toLowerCase().includes(term) ?? false)
    );
  }

  onBlocChange(): void {
    if (this.selectedBlocId) {
      this.service.getAppartementsByBloc(this.selectedBlocId).subscribe({
        next: data => this.filteredAppartements = data.sort((a, b) => (b.id_app ?? 0) - (a.id_app ?? 0)),
        error: () => this.showToast('Failed to load appartements for this bloc ❌', 'error')
      });
    } else {
      this.filteredAppartements = this.appartements;
    }
  }

  getBlocName(id?: number): string {
    const b = this.blocsList.find(bloc => bloc.id_bloc === id);
    return b ? b.nom : 'N/A';
  }

  supprimerAppartement(id_app?: number): void {
    if (!id_app) return;
    this.service.deleteAppartement(id_app).subscribe({
      next: () => { this.fetchAppartements(); this.showToast('Appartement deleted successfully ✅', 'success'); },
      error: () => this.showToast('Failed to delete appartement ❌', 'error')
    });
  }

  saveAppartement(): void {
    if (!this.appartementToUpdate || !this.appartementToUpdate.id_bloc) {
      this.showToast('Please select a bloc ❌', 'error');
      return;
    }

    const refreshData = () => {
      this.fetchAppartements();
      this.selectedBlocId = undefined;
      if (this.appartementToUpdate) this.appartementToUpdate.id_bloc = undefined;
      this.appartementToUpdate = null;
      this.closeModal();
    };

    if (this.appartementToUpdate.id_app) {
      this.service.updateAppartement(this.appartementToUpdate).subscribe({
        next: () => { refreshData(); this.showToast('Appartement updated successfully ✅', 'success'); },
        error: () => this.showToast('Failed to update appartement ❌', 'error')
      });
    } else {
      this.service.addAppartement(this.appartementToUpdate).subscribe({
        next: () => { refreshData(); this.showToast('Appartement created successfully ✅', 'success'); },
        error: () => this.showToast('Failed to create appartement ❌', 'error')
      });
    }
  }

  openEditModal(app: Appartement) {
    this.appartementToUpdate = { ...app };
    new bootstrap.Modal(document.getElementById('appartementModal')!).show();
  }

  openCreateModal() {
    this.appartementToUpdate = { id_app: undefined, titre: '', description: '', id_bloc: undefined };
    new bootstrap.Modal(document.getElementById('appartementModal')!).show();
  }

  closeModal() {
    const modalEl = document.getElementById('appartementModal');
    if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
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
