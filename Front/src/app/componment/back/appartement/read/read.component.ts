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

  selectedFile?: File;

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

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      if (this.appartementToUpdate) {
        // prepare path for DB
        this.appartementToUpdate.image = 'images/' + file.name;
      }
    }
  }


  
  saveAppartement(): void {
  if (!this.appartementToUpdate || !this.appartementToUpdate.id_bloc) {
    this.showToast('Please select a bloc ❌', 'error');
    return;
  }

  if (!this.selectedFile) {
    this.showToast('Please select an image ❌', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('titre', this.appartementToUpdate.titre!);
  formData.append('description', this.appartementToUpdate.description!);
  formData.append('id_bloc', this.appartementToUpdate.id_bloc!.toString());

  this.service.addAppartementWithImage(formData).subscribe({
    next: (res) => {
      this.fetchAppartements();
      this.appartementToUpdate = null;
      this.selectedFile = undefined;
      this.showToast('Appartement created ✅', 'success');
      this.closeModal();
    },
    error: () => this.showToast('Failed to create appartement ❌', 'error')
  });
}



  openEditModal(app: Appartement) {
    this.appartementToUpdate = { ...app };
    new bootstrap.Modal(document.getElementById('appartementModal')!).show();
  }

  openCreateModal() {
    this.appartementToUpdate = { id_app: undefined, titre: '', description: '', id_bloc: undefined, image: '' };
    this.selectedFile = undefined;
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
