import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-stagiaire-active',
  templateUrl: './stagiaire-active.component.html',
  styleUrls: ['./stagiaire-active.component.css']
})
export class StagiaireActiveComponent {
  stagiaires: any[] = [];
  private modalService = inject(NgbModal);
  @ViewChild('pop') pop!: TemplateRef<any>;
  constructor(private loginS : LoginService,private encadrantService : EncadrantService , private entrepriseService : EntrepriseService) {
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
    this.entrepriseService.getStagiairesEnt().subscribe(
      (data) => {
        this.stagiaires = data;
        console.log(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération des stagiaires actifs', error);
      }
    );
    this.encadrantService.getListeEncadrants().subscribe(data=>{
      this.listeEncadrants=data;
    })
  
    }
  
}
