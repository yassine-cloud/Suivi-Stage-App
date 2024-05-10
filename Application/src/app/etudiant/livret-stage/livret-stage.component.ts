import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';
import { LivretService } from 'src/app/services/livret-stage/livret.service';

@Component({
  selector: 'app-livret-stage',
  templateUrl: './livret-stage.component.html',
  styleUrls: ['./livret-stage.component.css']
})
export class LivretStageComponent {

  private modalService = inject(NgbModal);
  @ViewChild('pop') pop!: TemplateRef<any>;

  tacheForm = this.formBuilder.group({
    date : ['' , [Validators.required]],
    tache : ['', [Validators.required]],
    id_stg : ['' , [Validators.required]]
  });


  constructor(private livret : LivretService , private formBuilder : FormBuilder , private enc : EncadrantService) { }

  stages :any[] = [];
  listeEncadrants :any[]=[];
  
  id_edit : string="";

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


  ngOnInit(){
    this.modalService.dismissAll();
    this.livret.getLivret().subscribe(
      (data:any[]) => {
        this.stages = data;
        if(this.selectedStage == undefined){
          this.selectedStage = this.stages[0];
        }
        else{
          this.selectedStage = this.stages.find((stage)=>stage.id_stg == this.selectedStage.id_stg);
        }
      }
    );
    this.enc.getListeEncadrants().subscribe(data=>{
      this.listeEncadrants=data;
    })
  }

  openAjout(){
    this.tacheForm.reset();
    this.tacheForm.patchValue({
      id_stg : this.selectedStage.id_stg
    })
    this.modalService.open(this.pop, { backdropClass: 'pop-up-backdrop' });
  }

  openEdit(tache : any){
    this.id_edit = tache.id_ls;

    let date = new Date(tache.date);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    // console.log(formattedDate);
    
    
    this.tacheForm.patchValue({
      date : formattedDate,
      tache : tache.tache,
      id_stg : this.selectedStage.id_stg
    })
    this.modalService.open(this.pop, { backdropClass: 'pop-up-backdrop' });
  }

  supprimerTache(idTache : string){
    if(confirm("Voulez-vous vraiment supprimer cette tache ?"))
    this.livret.deleteLivret(idTache).subscribe(
      (data) => {
        if(data)
        // window.location.reload();
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closePop(){
    this.id_edit = "";
    this.tacheForm.reset();
    this.modalService.dismissAll();
  }

  submit(){
    if(this.id_edit !=""){
      this.livret.editLivret({ id_ls : this.id_edit , date : this.tacheForm.value.date , tache : this.tacheForm.value.tache , id_stg : this.tacheForm.value.id_stg }).subscribe(
        (data:any) => {
          if(data)
          // window.location.reload();
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.livret.addLivret({ date : this.tacheForm.value.date , tache : this.tacheForm.value.tache , id_stg : this.tacheForm.value.id_stg}).subscribe(
        (data) => {
          if(data)
          // window.location.reload();
          this.ngOnInit();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }


  getDate(d:string){

    let date = new Date(d);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
