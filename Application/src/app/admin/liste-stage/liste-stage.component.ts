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

  popform : FormGroup = this.formbuild.group({
    id_stg: ['', Validators.required],
    nom:['',Validators.required],
    prenom:['',Validators.required],
    nom_ent:['',Validators.required],
    id_enc:['',Validators.required]
    });
  popformInitiation : FormGroup = this.formbuild.group({
    id_stg: ['', Validators.required],
    nom:['',Validators.required],
    prenom:['',Validators.required],
    nom_ent:['',Validators.required],
    id_jurie:['',Validators.required],
    date_sout:['',Validators.required]
  });
  popformPerfectionnement : FormGroup= this.formbuild.group({
    id_stg: ['', Validators.required],
    nom:['',Validators.required],
    prenom:['',Validators.required],
    nom_ent:['',Validators.required],
    id_jurie1:['',Validators.required],
    id_jurie2:['',Validators.required],
    date_sout:['',Validators.required]
    });
  popformPFE : FormGroup = this.formbuild.group({
    id_stg: ['', Validators.required],
    nom:['',Validators.required],
    prenom:['',Validators.required],
    nom_ent:['',Validators.required],
    nom_enc:['',Validators.required],
    id_jurie1:['',Validators.required],
    id_jurie2:['',Validators.required],
    id_jurie3:['',Validators.required],
    date_sout:['',Validators.required]
    });

    popformNote : FormGroup= this.formbuild.group({
      id_stg: ['', Validators.required],
      nom:['',Validators.required],
      prenom:['',Validators.required],
      nom_ent:['',Validators.required],
      date_sout:['',Validators.required],
      note:['',Validators.required]
      });

  private modalService = inject(NgbModal);
  @ViewChild('popAffectationEncadreur') popAffectationEncadrantRef!: TemplateRef<any>;
  @ViewChild('popAffectationJuries1') popAffectationJuriesRef1!: TemplateRef<any>;
  @ViewChild('popAffectationJuries2') popAffectationJuriesRef2!: TemplateRef<any>;
  @ViewChild('popAffectationJuries3') popAffectationJuriesRef3!: TemplateRef<any>;
  @ViewChild('popAffectationNote') popAffectationNoteRef!: TemplateRef<any>;

// Filter Params
selectTypeStage : number = 1;

  listeStages!:any[];
  listeEncadrants!:any[];
  constructor(private stg : StageService,private enc:EncadrantService, private router : ActivatedRoute , private formbuild : FormBuilder){}

  getEncadrantNom(id:number){
    let encadrant = this.listeEncadrants.find(encadrant => encadrant.id_enc == id);
    return encadrant.nom + " " + encadrant.prenom;
  }


  ngOnInit(): void {
    this.modalService.dismissAll();
    this.stg.getListeStagesNonNote().subscribe(data=>{
      this.listeStages=data;
    })
    
    this.enc.getListeEncadrants().subscribe(data=>{
      this.listeEncadrants=data;
    })
    this.initForm();
  }




  initForm(){ // edit
    this.popform.reset();
    this.popformInitiation.reset();
    this.popformPerfectionnement.reset();
    this.popformPFE.reset();
    this.popformNote.reset();
  }


  onModifie(i:any){
        this.popform.patchValue({
          id_stg: i.id_stg,
          nom:i.nom,
          prenom:i.prenom,
          nom_ent: i.nom_ent,
          id_enc: i.id_enc  
        });
        
    this.modalService.open(this.popAffectationEncadrantRef, { backdropClass: 'pop-up-backdrop' });
    
  }

  openPopAffectationJuries(i:any){
    let formattedDate = '';
    if(i.date_sout != null){
       let date = new Date(i.date_sout);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
       formattedDate = `${year}-${month}-${day}`;
    }
   
    if(i.type == 1){
      this.popformInitiation.patchValue({
        id_stg: i.id_stg,
        nom:i.nom,
        prenom:i.prenom,
        nom_ent: i.nom_ent,
        id_jurie : i.juries[0] ?? '',
        date_sout: formattedDate
      
      })
      this.modalService.open(this.popAffectationJuriesRef1, { backdropClass: 'pop-up-backdrop' });
    }
    else if(i.type == 2){
      this.popformPerfectionnement.patchValue({
        id_stg: i.id_stg,
        nom:i.nom,
        prenom:i.prenom,
        nom_ent: i.nom_ent,
        id_jurie1 : i.juries[0] ?? '',
        id_jurie2 : i.juries[1] ?? '',
        date_sout: formattedDate
      
      })
      this.modalService.open(this.popAffectationJuriesRef2, { backdropClass: 'pop-up-backdrop' });
    }
    else if(i.type == 3){
      this.popformPFE.patchValue({
        id_stg: i.id_stg,
        nom:i.nom,
        prenom:i.prenom,
        nom_ent: i.nom_ent,
        nom_enc: this.getEncadrantNom(i.id_enc),
        id_jurie1 : i.juries[0] ?? '',
        id_jurie2 : i.juries[1] ?? '',
        id_jurie3 : i.juries[2] ?? '',
        date_sout: formattedDate
      
      })
      this.modalService.open(this.popAffectationJuriesRef3, { backdropClass: 'pop-up-backdrop' });
    }
  }

  supprimerEncadrant(i : number){
    if(!confirm("Voulez-vous vraiment supprimer l'encadrant ?")) return;
    
    this.stg.editStage({id_stg:i,id_enc:null}).subscribe(()=>{ // remove the encadrant
      console.log("Encadrant supprimé avec Succés");
      // window.location.reload();
      this.ngOnInit();
    }
    )

  }


  onSubmitFormInitiation(){
    let formData = this.popformInitiation.value;
    let data = {
      id_stg: formData.id_stg,
      juries: [formData.id_jurie],
      date_sout: formData.date_sout
    }
    this.stg.affecterJuries(data).subscribe(val=>{ // edit the stage
      console.log("Mise à Jour avec Succés");
      this.modalService.dismissAll();
      this.ngOnInit();
    }
    )
  }

  onSubmitFormPerfectionnement(){
    let formData = this.popformPerfectionnement.value;
    if(formData.id_jurie1 == formData.id_jurie2){
      alert("Les deux jurys doivent être différents");
      return;
    }
    let data = {
      id_stg: formData.id_stg,
      juries: [formData.id_jurie1,formData.id_jurie2],
      date_sout: formData.date_sout
    }
    this.stg.affecterJuries(data).subscribe(val=>{ // edit the stage
      console.log("Mise à Jour avec Succés");
      this.modalService.dismissAll();
      this.ngOnInit();
    }
    )
  }

  onSubmitFormPFE(){
    let formData = this.popformPFE.value;
    if(formData.id_jurie1 == formData.id_jurie2 || formData.id_jurie1 == formData.id_jurie3 || formData.id_jurie2 == formData.id_jurie3){
      alert("Les trois jurys doivent être différents");
      return;
    }
    let data = {
      id_stg: formData.id_stg,
      juries: [formData.id_jurie1,formData.id_jurie2,formData.id_jurie3],
      date_sout: formData.date_sout
    }
    this.stg.affecterJuries(data).subscribe(()=>{ // edit the stage
      console.log("Mise à Jour avec Succés");
      this.modalService.dismissAll();
      this.ngOnInit();
    }
    )
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
      note: ''      
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
    // window.location.reload();
      this.modalService.dismissAll();
      this.ngOnInit();
   })
   
  }
  
  filtrerStage(){
    // obligatoirement que le type soit 1 2 3 
    return this.listeStages.filter(stage=>
      stage.type == this.selectTypeStage
    )
  }

  filtrerStageNA(){
    let tab = this.filtrerStage();
    return tab.filter(stage => stage.date_sout == null)
  }

  filtrerStageNAPFE(){
    let tab = this.filtrerStage();
    return tab.filter(stage => stage.id_enc == null)
  }

  filtrerStageNDS(){
    let tab = this.filtrerStage();
    return tab.filter(stage => stage.date_sout == null && stage.id_enc != null)
  }

  filterStageNNote(){
    let tab = this.filtrerStage();
    return tab.filter(stage => stage.note == null && stage.date_sout != null)
  }


}
