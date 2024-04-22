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
      titre: ['', Validators.required],
      description: ['', Validators.required],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      id_ent: ['', [Validators.required]],
      id_etu: ['', Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      nom_ent:['',Validators.required],
      id_enc:['',Validators.required]
    });
  }


  onModifie(i:any){
    this.stg.getStage(i.id_stg).subscribe(
      (res: any) => {
        this.stage = res[0];
        this.popform.patchValue({
          id_stg: i.id_stg,
          nom:i.nom,
          nom_ent: i.nom_ent,
          prenom:i.prenom,
          titre:i.titre,
          description:i.description,
          date_debut:i.date_debut,
          date_fin:i.date_fin,
          id_ent:i.id_ent,
          id_etu:i.id_etu  
        });
      }
    );
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
    
  }
  onSubmit(){ // submit the edit
  //  const formData=this.popform.value;
  let formData : any = {
    id_stg: this.popform.value.id_stg,
    id_enc: this.popform.value.id_enc,
    titre:this.popform.value.titre,
    description:this.popform.value.description,
    date_debut:this.popform.value.date_debut,
    date_fin:this.popform.value.date_fin,
    id_ent:this.popform.value.id_ent
  }
   this.stg.editStage(formData).subscribe(()=>{
    // this.popform.reset();
    this.modalService.dismissAll();
    console.log("Mise à Jour avec Succés");
    this.ngOnInit();
   },error=>{
    console.error('Erreur lors de l\'affection de proffesseur :', error);
    alert("Erreur lors de l\'affection de proffesseur");
   })
   
  }
  

}
