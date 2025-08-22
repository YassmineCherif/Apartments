import { Component, OnInit } from '@angular/core';
import { Bloc } from 'src/app/models/bloc';
import { Residence } from 'src/app/models/Residence';
import { AppartementService } from 'src/app/Services/appartement/appartement.service';

declare var bootstrap: any;

@Component({
  selector: 'app-bloc',
  templateUrl: './bloc.component.html',
  styleUrls: ['./bloc.component.css']
})
export class BlocComponent implements OnInit {
  blocToUpdate: Bloc | null = null;
  blocs: Bloc[] = [];
  filteredBlocs: Bloc[] = [];
  searchTerm: string = '';
  toasts: { message: string, type: 'success' | 'error' }[] = [];

  residencesList: Residence[] = [];
  selectedResidenceId?: number;

  constructor(private service: AppartementService) {}

  ngOnInit(): void {
    this.fetchResidences();
    this.fetchBlocs();
  }


  
  fetchBlocs(): void {
  this.service.getAllBlocs().subscribe({
    next: data => {
      this.blocs = data.sort((a, b) => (b.id_bloc ?? 0) - (a.id_bloc ?? 0));
      this.filteredBlocs = this.blocs; // initially show all
    },
    error: () => this.showToast('Failed to load blocs ❌', 'error')
  });
}



  fetchResidences(): void {
    this.service.getAllResidences().subscribe({
      next: data => this.residencesList = data.sort((a, b) => (a.nom > b.nom ? 1 : -1)),
      error: () => this.showToast('Failed to load residences ❌', 'error')
    });
  }


onResidenceChange(): void {
  if (this.selectedResidenceId) {
    // Fetch blocs from backend for the selected residence
    this.service.getBlocsByResidence(this.selectedResidenceId).subscribe({
      next: data => this.filteredBlocs = data.sort((a, b) => (b.id_bloc ?? 0) - (a.id_bloc ?? 0)),
      error: () => this.showToast('Failed to load blocs for this residence ❌', 'error')
    });
  } else {
    // Show all blocs if no residence selected
    this.fetchBlocs();
  }
}


  getResidenceName(id?: number): string {
    const res = this.residencesList.find(r => r.id_residence === id);
    return res ? res.nom : 'N/A';
  }

  filterBlocs(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredBlocs = this.blocs.filter(b => b.nom.toLowerCase().includes(term));
  }

  deleteBloc(id?: number) {
    if (!id) return;
    this.service.deleteBloc(id).subscribe({
      next: () => { this.fetchBlocs(); this.showToast('Bloc deleted successfully ✅', 'success'); },
      error: () => this.showToast('Failed to delete bloc ❌', 'error')
    });
  }

saveBloc(): void {
  if (!this.blocToUpdate) return;

  // Ensure residence is selected
  if (!this.blocToUpdate.id_residence) {
    this.showToast('Please select a residence ❌', 'error');
    return;
  }

  const refreshData = () => {
    this.fetchBlocs();               // refresh blocs list
    this.selectedResidenceId = undefined; // reset select
    if (this.blocToUpdate) {
      this.blocToUpdate.id_residence = undefined; // clear residence in modal
    }
    this.blocToUpdate = null;        // clear modal form
    this.closeModal();
  };

  if (this.blocToUpdate.id_bloc) {
    // Update
    this.service.updateBloc(this.blocToUpdate).subscribe({
      next: () => { 
        refreshData(); 
        this.showToast('Bloc updated successfully ✅', 'success'); 
      },
      error: () => this.showToast('Failed to update bloc ❌', 'error')
    });
  } else {
    // Create
    this.service.addBloc(this.blocToUpdate).subscribe({
      next: () => { 
        refreshData(); 
        this.showToast('Bloc created successfully ✅', 'success'); 
      },
      error: () => this.showToast('Failed to create bloc ❌', 'error')
    });
  }
}



  openEditModal(bloc: Bloc) {
    this.blocToUpdate = { ...bloc };
    const modal = new bootstrap.Modal(document.getElementById('blocModal')!);
    modal.show();
  }

openCreateModal() {
  this.blocToUpdate = { id_bloc: undefined, nom: '', nombreEtages: 0, id_residence: undefined }; // clear residence
  const modal = new bootstrap.Modal(document.getElementById('blocModal')!);
  modal.show();
}


  closeModal() {
    const modalEl = document.getElementById('blocModal');
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
