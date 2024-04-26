import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListeOffresComponent } from './liste-offres/liste-offres.component';



@NgModule({
  declarations: [
    ListeOffresComponent,
   
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EtudiantModule { }
