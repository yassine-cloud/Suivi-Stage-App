import { Component } from '@angular/core';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-jurie',
  templateUrl: './jurie.component.html',
  styleUrls: ['./jurie.component.css']
})
export class JurieComponent {

  stagiaires: any[] = [];
  id_enc ?: number;

  constructor(private loginS : LoginService,private encadrantService : EncadrantService ) {
  }

  ngOnInit(): void {
    this.id_enc = this.loginS.user.id_enc;
    this.getStagiairesJurie(this.id_enc!);
  
    }
  

    getStagiairesJurie(id_enc: number)   {
  this.encadrantService.getStagiairesJurie(id_enc).subscribe(
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
