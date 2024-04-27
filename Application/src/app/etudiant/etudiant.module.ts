import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeOffresComponent } from './liste-offres/liste-offres.component';
import { DepotOffreComponent } from './depot-offre/depot-offre.component';
import { ProfilEtudiantComponent } from './profil-etudiant/profil-etudiant.component';


@NgModule({
  declarations: [
    ListeOffresComponent,
    DepotOffreComponent,
    ProfilEtudiantComponent
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EtudiantModule { }
