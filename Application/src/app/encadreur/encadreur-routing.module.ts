import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StagiaireComponent } from './stagiaire/stagiaire.component';
import { JurieComponent } from './jurie/jurie.component';

const routes: Routes = [
  {path:'stagiaire' , component : StagiaireComponent},
  {path:'Jurie-stagiaire' , component : JurieComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncadreurRoutingModule { }
