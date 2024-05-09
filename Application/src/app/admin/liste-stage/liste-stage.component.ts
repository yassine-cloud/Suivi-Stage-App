import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';
import { StageService } from 'src/app/services/stage/stage.service';

@Component({
  selector: 'app-liste-stage',
  templateUrl: './liste-stage.component.html',
  styleUrls: ['./liste-stage.component.css']
})
export class ListeStageComponent {

  x:any;
  stage: any;
  popform !: FormGroup;
  private modalService = inject(NgbModal);
  @ViewChild('pop') popRef!: TemplateRef<any>;

  listeStages!:any[];
  listeNAStages!:any[];
  listeEncadrants!:any[];
  constructor(private stg : StageService,private enc:EncadrantService, private router : ActivatedRoute , private formbuild : FormBuilder){}

  getEncadrantNom(id:number){
    let encadrant = this.listeEncadrants.find(encadrant => encadrant.id_enc == id);
    return encadrant.nom + " " + encadrant.prenom;
  }


  ngOnInit(): void {
    this.stg.getListeStages().subscribe(data=>{
      this.listeStages=data;
    })
    this.stg.getListeNAStages().subscribe(data=>{
      this.listeNAStages=data;
    })
    this.enc.getListeEncadrants().subscribe(data=>{
      this.listeEncadrants=data;
    })
    this.initForm();
  }
  initForm(){ // edit
    this.popform = this.formbuild.group({
      id_stg: ['', Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      nom_ent:['',Validators.required],
      id_enc:['',Validators.required]
    });
  }


  onModifie(i:any){
        this.popform.patchValue({
          id_stg: i.id_stg,
          nom:i.nom,
          nom_ent: i.nom_ent,
          prenom:i.prenom,
          id_etu:i.id_etu,
          id_enc: i.id_enc  
        });
        
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
    
  }

  supprimerEncadrant(i : number){
    if(!confirm("Voulez-vous vraiment supprimer l'encadrant ?")) return;
    
    this.stg.editStage({id_stg:i,id_enc:null}).subscribe(()=>{ // remove the encadrant
      console.log("Encadrant supprimé avec Succés");
      window.location.reload();
    },error=>{
      console.error('Erreur lors de la suppression de l\'encadrant :', error);
      alert("Erreur lors de la suppression de l\'encadrant");
    }
    )

  }

  affecterJurieEtDate(i:number){
    

  }
  onSubmit(){ // submit the edit
  //  const formData=this.popform.value;
  let formData : any = {
    id_stg: this.popform.value.id_stg,
    id_enc: this.popform.value.id_enc,
    
  }
   this.stg.editStage(formData).subscribe(()=>{
    // this.popform.reset();
    this.modalService.dismissAll();
    console.log("Mise à Jour avec Succés");
    window.location.reload();
   },error=>{
    console.error('Erreur lors de l\'affection de proffesseur :', error);
    alert("Erreur lors de l\'affection de proffesseur");
   })
   
  }
  

}
