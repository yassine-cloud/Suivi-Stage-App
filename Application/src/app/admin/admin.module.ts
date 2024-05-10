import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListeSocietesComponent } from './liste-societes/liste-societes.component';
import { ListeEncadrantsComponent } from './liste-encadrants/liste-encadrants.component';
import { ListeEtudiantsComponent } from './liste-etudiants/liste-etudiants.component';
import { ListeStageComponent } from './liste-stage/liste-stage.component';
import { ResultatStageComponent } from './resultat-stage/resultat-stage.component';



@NgModule({
  declarations: [
    ListeSocietesComponent,
    ListeEncadrantsComponent,
    ListeEtudiantsComponent,
    ListeStageComponent,
    ResultatStageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
