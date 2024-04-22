import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    tache : ['', [Validators.required]]
  });


  constructor(private livret : LivretService , private formBuilder : FormBuilder) { }

  taches :any[] = [];
  id_edit : string="";

  ngOnInit(){
    this.livret.getLivret().subscribe(
      (data:any) => {
        this.taches = data;
      }
    );
  }

  openAjout(){
    this.tacheForm.reset();
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
      tache : tache.tache
    })
    this.modalService.open(this.pop, { backdropClass: 'pop-up-backdrop' });
  }

  supprimerTache(idTache : string){
    if(confirm("Voulez-vous vraiment supprimer cette tache ?"))
    this.livret.deleteLivret(idTache).subscribe(
      (data) => {
        if(data)
        window.location.reload();
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
      this.livret.editLivret({ id_ls : this.id_edit , date : this.tacheForm.value.date , tache : this.tacheForm.value.tache }).subscribe(
        (data:any) => {
          if(data)
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
    else{
      this.livret.addLivret({ date : this.tacheForm.value.date , tache : this.tacheForm.value.tache }).subscribe(
        (data) => {
          if(data)
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
