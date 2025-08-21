import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // ✅ Add this
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './componment/front/home/home.component';
import { SubjectsComponent } from './componment/front/subjects/subjects.component';
import { PostulationsComponent } from './componment/front/postulations/postulations.component';

import { LoginComponent } from './componment/front/login/login.component';
import { NavbarComponent } from './componment/front/navbar/navbar.component';
import { AdminComponent } from './componment/back/admin/admin.component';


import { ResidenceComponent } from './componment/front/residence/residence.component';
import { ChatComponent } from './componment/front/chat/chat.component';
import { ComplaintsComponent } from './componment/front/complaints/complaints.component';
import { ForumComponent } from './componment/back/forum/forum.component';
import { DashboardComponent } from './componment/back/dashboard/dashboard.component';
import { AppartementComponent } from './componment/back/appartement/appartement/appartement.component';
import { ReadComponent } from './componment/back/appartement/read/read.component';
import { UpdateComponent } from './componment/back/appartement/update/update.component';
import { CreateComponent } from './componment/back/appartement/create/create.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SubjectsComponent,
    PostulationsComponent,

    
    LoginComponent,
    NavbarComponent,
  
    
    
  
    AdminComponent,
    ResidenceComponent,
    ChatComponent,
    ComplaintsComponent,
    ForumComponent,
    DashboardComponent,
    AppartementComponent,
    ReadComponent,
    UpdateComponent,
    CreateComponent,

    
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
