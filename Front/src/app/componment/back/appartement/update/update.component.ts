import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appartement } from 'src/app/models/appartement';
import { AppartementService } from 'src/app/Services/appartement/appartement.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-appartement',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  appartementToUpdate: Appartement = { id_app: undefined, titre: '', description: '' };
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appartementService: AppartementService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getAppartement(id);
  }

  getAppartement(id: number): void {
    this.appartementService.getAppartementById(id).subscribe({
      next: (app) => this.appartementToUpdate = app,
      error: (err) => this.message = "Failed to load appartement: " + err.message
    });
  }

  onSubmit(): void {
    if (!this.appartementToUpdate.id_app) return;

    this.appartementService.updateAppartement(this.appartementToUpdate).subscribe({
      next: () => {
        this.message = "Appartement updated successfully.";
        this.router.navigate(['/readapp']); // Redirect to read page
      },
      error: (err) => this.message = "Failed to update appartement: " + err.message
    });
  }

  goBack(): void {
    this.location.back();
  }
}
