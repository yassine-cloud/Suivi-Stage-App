import { Component } from '@angular/core';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagiaireComponent {

  stagiaires: any[] = [];
  id_enc ?: number;

  constructor(private loginS : LoginService,private encadrantService : EncadrantService ) {
  }

  ngOnInit(): void {
    this.id_enc = this.loginS.user.id_enc;
    this.GetStagiaireNonValides(this.id_enc!);
  
    }
  

  GetStagiaireNonValides(id_enc: number)   {
  this.encadrantService.getStagiairesNonValides(id_enc).subscribe(
    (data) => {
      this.stagiaires = data;
      console.log(data);
    },
    (error) => {
      console.error('Erreur lors de la récupération des stagiaires non valides', error);
    }
  );
}

}