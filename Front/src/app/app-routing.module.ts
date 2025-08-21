import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componment/front/home/home.component';
import { PostulationsComponent } from './componment/front/postulations/postulations.component';
import { SubjectsComponent } from './componment/front/subjects/subjects.component';
import { LoginComponent } from './componment/front/login/login.component';
import { AdminComponent } from './componment/back/admin/admin.component';
import { ResidenceComponent } from './componment/front/residence/residence.component';
import { ComplaintsComponent } from './componment/front/complaints/complaints.component';
import { ForumComponent } from './componment/back/forum/forum.component';
import { DashboardComponent } from './componment/back/dashboard/dashboard.component';
import { ReadComponent } from './componment/back/appartement/read/read.component';
 import { ApartementsComponent } from './componment/front/reservation/apartements/apartements.component';
import { ReserverComponent } from './componment/front/reservation/reserver/reserver.component';
import { MesReservationsComponent } from './componment/front/reservation/mes-reservations/mes-reservations.component';
import { BlocComponent } from './componment/back/bloc/bloc.component';
import { PaysComponent } from './componment/back/pays/pays.component';
import { ResidencesComponent } from './componment/back/residences/residences.component';
 


const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'postulations', component: PostulationsComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'residence', component: ResidenceComponent}, 
  { path: 'complaints', component: ComplaintsComponent },
  { path: 'forum', component: ForumComponent },
  { path : 'dashboard', component: DashboardComponent },
  { path: 'admin', component: AdminComponent} ,
   {path: 'app', component: ApartementsComponent},
   {path: 'reserver', component: ReserverComponent},
  {path: 'mesres', component: MesReservationsComponent},
  // back office 
  {path: 'blocs', component: BlocComponent},
  {path: 'apartements', component: ReadComponent},
  {path: 'pays', component: PaysComponent},
  {path: 'residences', component: ResidencesComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
