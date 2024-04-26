import { Component, OnInit } from '@angular/core';
import { DepotService } from 'src/app/services/Depot/depot-stage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagiaireComponent implements OnInit {


stagiaires: any[] = [];
id_ent ?:number;

constructor(private loginS : LoginService , private depotS : DepotService) { }


ngOnInit(): void {
  this.id_ent = this.loginS.user.id_ent;
  this.getStagiaires(this.id_ent!);

  }

  getStagiaires(id_ent: number){

    this.depotS.getStagiaires(id_ent).subscribe(
      (data) => {
        this.stagiaires = data;
        console.log('data',data);
      },
      (error) => {
        console.error('erreur lors de la recuperation des stagiaires : ',error);
        
      }
    )
  
    }


    Status(depotId: number, newStatus: string) {
      this.depotS.Status(depotId, newStatus).subscribe(
        (response) => {
          console.log('Statut mis à jour avec succès');
          window.location.reload()
          //response
          
          // Rafraîchir la liste des stagiaires ou effectuer toute autre action nécessaire après la mise à jour du statut
        },
        (error) => {
          console.error('Erreur lors de la mise à jour du statut : ', error);
          alert ('erreur');
          // Gérer l'erreur de mise à jour du statut
        }
      );
    }











}
