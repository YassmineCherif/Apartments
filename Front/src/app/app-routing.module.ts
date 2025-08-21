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
import { UpdateComponent } from './componment/back/appartement/update/update.component';



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
  {path: 'readapp', component: ReadComponent},
  //{path: 'updateapp', component: UpdateComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
