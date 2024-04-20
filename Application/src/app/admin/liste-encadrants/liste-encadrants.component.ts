import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EncadrantService } from 'src/app/services/encadrant/encadrant.service';

@Component({
  selector: 'app-liste-encadrants',
  templateUrl: './liste-encadrants.component.html',
  styleUrls: ['./liste-encadrants.component.css']
})
export class ListeEncadrantsComponent {

  x:any;
  encadrant: any;
  popform !: FormGroup;
  popform1!:FormGroup;
  private modalService = inject(NgbModal);
  @ViewChild('pop') popRef!: TemplateRef<any>;
  @ViewChild('pop1') popRef1!: TemplateRef<any>;

  openAjout(){
    this.initForm1();
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
  }

  listeEncadrants!:any[];
  constructor(private encad : EncadrantService , private router : ActivatedRoute , private formbuild : FormBuilder){}
  ngOnInit(): void {
    this.encad.getListeEncadrants().subscribe(data=>{
      this.listeEncadrants=data;
    })
    this.initForm();
    this.initForm1();
  }
  initForm(){ // edit
    this.popform = this.formbuild.group({
      id_enc: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', [Validators.minLength(4)]],
      departement: ['', Validators.required],
      specialite:['',Validators.required],
    });
  }
  initForm1(){ // add
    this.popform1 = this.formbuild.group({
      // id_enc: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      specialite:['',Validators.required],
      password: ['', [Validators.minLength(4)]],
      departement: ['', Validators.required],
      
    });
  }
  onSupprime(i:any){
    this.encad.deleteEncadrant(i.id_enc).subscribe((res:any)=>{
      console.log("supprimé avec succés");
    })
    
  }


  onModifie(i:any){
    this.encad.getEncadrant(i.id_enc).subscribe(
      (res: any) => {
        this.encadrant = res[0];
        this.popform.patchValue({
          id_enc: i.id_enc,
          nom: i.nom,
          prenom:i.prenom,
          email: i.email,
          departement:i.departement,
          contact: i.contact,
          specialite:i.specialite,
          // password:i.password, //On ne peut pas recupérer le mot de passe (Haché) 
        });
      }
    );
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
    
  }
  onSubmit(){ // submit the edit
  //  const formData=this.popform.value;
  let formData : any = {
    id_enc: this.popform.value.id_enc,
    nom: this.popform.value.nom,
    email: this.popform.value.email,
    departement:this.popform.value.departement,
    contact: this.popform.value.contact,
    prenom:this.popform.value.prenom,
    specialite:this.popform.value.specialite,
    // password: this.popform.value.password !== '' ? this.popform.value.password : undefined
  }
  if(this.popform.value.password !== ''){
    formData['password'] = this.popform.value.password;
  }
   this.encad.editEncadrant(formData).subscribe(()=>{
    // this.popform.reset();
    this.modalService.dismissAll();
    console.log("Mise à Jour avec Succés");
    this.ngOnInit();
   },error=>{
    console.error('Erreur lors de la mise à jour de l\'encadrant :', error);
    alert("Erreur lors de la mise à jour de l'encadrant");
   })
  //  console.log(formData);
   
  }
  onAjout(){ // submit the add
    
    const formData=this.popform1.value;
    if(this.popform1.valid){
    this.encad.addEncadrant(formData).subscribe(()=>{
      this.modalService.dismissAll();
      console.log("Ajouté avec Succés");
      this.ngOnInit();
     },error=>{
      console.error('Erreur lors de l\'ajout de l\'encadrant :', error);
      alert("Erreur lors de l'ajout de l'encadrant");
     })
    }
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
    console.log(formData);
  }
  

}
