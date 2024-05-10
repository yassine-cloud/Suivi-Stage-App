import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  private modalService = inject(NgbModal);
  @ViewChild('pop') pop!: TemplateRef<any>;
  constructor(private loginS : LoginService,private encadrantService : EncadrantService ) {
  }

  listeEncadrants :any[]=[];
  selectedStage :any; 


  getEncadrantNom(id:number){
    let encadrant = this.listeEncadrants.find(encadrant => encadrant.id_enc == id);
    return encadrant.nom + " " + encadrant.prenom;
  }
  getNomStage(i:number){
    if( i == 1){
      return "Stage d'initiation";
    }
    else if(i == 2){
      return "Stage de perfectionnement";
    }
    else if(i == 3){
      return "PFE";
    }
    else{
      return "";
    }
  }

  sectingStage(i:any){
    // this.selectedStage = null;
    this.encadrantService.getDetailStage(i.id_stg).subscribe(
      (data) => {
        this.selectedStage = data[0];
        console.log(data);
        this.modalService.open(this.pop, { backdropClass: 'pop-up-backdrop' });

      }
    );
  }


  ngOnInit(): void {
    this.id_enc = this.loginS.user.id_enc;
    this.GetStagiaireNonValides(this.id_enc!);
    this.encadrantService.getListeEncadrants().subscribe(data=>{
      this.listeEncadrants=data;
    })
  
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