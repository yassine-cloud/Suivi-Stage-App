import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncadreurRoutingModule } from './encadreur-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StagiaireComponent } from './stagiaire/stagiaire.component';
import { JurieComponent } from './jurie/jurie.component';


@NgModule({
  declarations: [
    StagiaireComponent,
    JurieComponent
  ],
  imports: [
    CommonModule,
    EncadreurRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EncadreurModule { }
