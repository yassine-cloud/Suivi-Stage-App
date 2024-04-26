import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepotService } from 'src/app/services/Depot/depot-stage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-stagiaire',
  templateUrl: './stagiaire.component.html',
  styleUrls: ['./stagiaire.component.css']
})
export class StagiaireComponent implements OnInit {

  private modalService = inject(NgbModal);
  @ViewChild('pop') popRef!: TemplateRef<any>;
  @ViewChild('pop2') popRef2!: TemplateRef<any>;

stagiaires: any[] = [];
filterStagiaires: any[] = [];
offres : any[] = [];
selectedOffre = '';
id_ent ?:number;
detailOffre : any;

constructor(private loginS : LoginService , private depotS : DepotService) { }


ngOnInit(): void {
  this.id_ent = this.loginS.user.id_ent;
  this.getStagiaires(this.id_ent!);

  }

  openDetailOffre(data : any){
    this.detailOffre = data;
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });   
  }
  openDetailEtudiant(data : any){
    this.detailOffre = data;
    this.modalService.open(this.popRef2, { backdropClass: 'pop-up-backdrop' });   
  }

 
  selectOffre() {
    if(this.selectedOffre == ''){
      return this.stagiaires;
    }
    else{
      return this.stagiaires.filter(stagiaire => stagiaire.titre.trim().toUpperCase() === this.selectedOffre.trim().toUpperCase());

    }
  }

  getStagiaires(id_ent: number){

    this.depotS.getStagiaires(id_ent).subscribe(
      (data) => {
        this.stagiaires = data;
        this.filterStagiaires = data;
        data.forEach((element: any) => {
          if(!this.offres.includes(element.titre.trim().toUpperCase()))
            this.offres.push(element.titre.trim().toUpperCase())
        })
        // console.log('data',data);
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
