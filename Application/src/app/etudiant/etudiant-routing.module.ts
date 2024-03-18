import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeOffresComponent } from './liste-offres/liste-offres.component';

const routes: Routes = [
  {path:"liste_offres",component:ListeOffresComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
