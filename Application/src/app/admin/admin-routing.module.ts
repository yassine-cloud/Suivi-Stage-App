import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeSocietesComponent } from './liste-societes/liste-societes.component';
import { ListeEncadrantsComponent } from './liste-encadrants/liste-encadrants.component';
import { ListeEtudiantsComponent } from './liste-etudiants/liste-etudiants.component';
import { ListeStageComponent } from './liste-stage/liste-stage.component';

const routes: Routes = [
  {path:'liste-societes' , component : ListeSocietesComponent},
   {path:'liste-encadrants',component: ListeEncadrantsComponent},
   {path:'liste-etudiants',component:ListeEtudiantsComponent},
   {path:'liste-stages',component:ListeStageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
