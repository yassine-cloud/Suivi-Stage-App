import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';
import { StageService } from 'src/app/services/stage/stage.service';

@Component({
  selector: 'app-resultat-stage',
  templateUrl: './resultat-stage.component.html',
  styleUrls: ['./resultat-stage.component.css']
})
export class ResultatStageComponent {


  popformNote : FormGroup= this.formbuild.group({
    id_stg: ['', Validators.required],
    nom:['',Validators.required],
    prenom:['',Validators.required],
    nom_ent:['',Validators.required],
    date_sout:['',Validators.required],
    note:['',Validators.required]
    });

  private modalService = inject(NgbModal);
  @ViewChild('popAffectationNote') popAffectationNoteRef!: TemplateRef<any>;



  constructor(private stg : StageService,private enc:EncadrantService,  private formbuild : FormBuilder){}
  listeStages:any[]=[];

  selectTypeStage : number = 1;

  ngOnInit(): void {
    this.modalService.dismissAll();
    this.stg.getListeStagesNote().subscribe(data=>{
      this.listeStages=data;
    })
    
    this.popformNote.reset();
  }

  supprimerStage(id_stg : string){
    if(confirm("Voulez-vous vraiment supprimer ce stage ?"))
    this.stg.supprimerStage(+id_stg).subscribe(val=>{
      console.log("Suppression avec Succés");
      this.ngOnInit();
    })
  }


  openPopAffectationNoteStage(i:any){

    let date = new Date(i.date_sout);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    this.popformNote.patchValue({
      id_stg: i.id_stg,
      nom:i.nom,
      prenom:i.prenom,
      nom_ent: i.nom_ent,
      date_sout: formattedDate,
      note: i.note      
    })

    this.modalService.open(this.popAffectationNoteRef, { backdropClass: 'pop-up-backdrop' });
  }


  affectationNoteStage(){
    let formData = this.popformNote.value;
    let data = {
      id_stg: formData.id_stg,
      note: formData.note
    }
    this.stg.affecterNoteStage(data).subscribe(val=>{ // edit the stage
      console.log("Mise à Jour avec Succés");
      this.modalService.dismissAll();
      this.ngOnInit();
    }
    )
  }


  filtrerStage(){
    // obligatoirement que le type soit 1 2 3 
    return this.listeStages.filter(stage=>
      stage.type == this.selectTypeStage
    )
  }

}
