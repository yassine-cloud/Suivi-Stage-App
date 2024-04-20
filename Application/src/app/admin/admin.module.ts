import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListeSocietesComponent } from './liste-societes/liste-societes.component';
import { ListeEncadrantsComponent } from './liste-encadrants/liste-encadrants.component';
import { ListeEtudiantsComponent } from './liste-etudiants/liste-etudiants.component';



@NgModule({
  declarations: [
    ListeSocietesComponent,
    ListeEncadrantsComponent,
    ListeEtudiantsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
