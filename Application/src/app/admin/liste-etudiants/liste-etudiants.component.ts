import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListeOffresService } from 'src/app/services/etudiant/liste-offres.service';

@Component({
  selector: 'app-liste-etudiants',
  templateUrl: './liste-etudiants.component.html',
  styleUrls: ['./liste-etudiants.component.css']
})
export class ListeEtudiantsComponent {

  x:any;
  etudiant: any;
  popform !: FormGroup;
  popform1!:FormGroup;
  private modalService = inject(NgbModal);
  @ViewChild('pop') popRef!: TemplateRef<any>;
  @ViewChild('pop1') popRef1!: TemplateRef<any>;

  openAjout(){
    this.initForm1();
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
  }

  listeEtudiants!:any[];
  constructor(private etud : ListeOffresService , private router : ActivatedRoute , private formbuild : FormBuilder){}
  ngOnInit(): void {
    this.etud.getListeEtudiants().subscribe(data=>{
      this.listeEtudiants=data;
    })
    this.initForm();
    this.initForm1();
  }
  initForm(){ // edit
    this.popform = this.formbuild.group({
      id_etu: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email]],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', [Validators.minLength(4)]],
      departement: ['', Validators.required],
    });
  }
  initForm1(){ // add
    this.popform1 = this.formbuild.group({
      // id_ent: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      prenom: ['', Validators.required],
      contact: ['', Validators.required],
      password: ['', [Validators.required , Validators.minLength(4)]],
      departement: ['', Validators.required],
    });
  }
  onSupprime(i:any){
    if(confirm("Etes-vous sûr de vouloir supprimer cet étudiant ?"))
    this.etud.deleteEtudiant(i.id_etu).subscribe((res:any)=>{
      console.log("supprimé avec succés");
      window.location.reload();
    },
    error=>{
      console.error('Erreur lors de la suppression de l\'entreprise :', error);
      alert("Erreur lors de la suppression de l'entreprise");
    }) 
  
    
  }


  onModifie(i:any){
    
        this.popform.patchValue({
          id_etu: i.id_etu,
          nom: i.nom,
          prenom:i.prenom,
          email: i.email,
          departement:i.departement,
          contact: i.contact,
          // password:i.password, //On ne peut pas recupérer le mot de passe (Haché) 
      }
    );
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
    
  }
  onSubmit(){ // submit the edit
  //  const formData=this.popform.value;
  let formData : any = {
    id_etu: this.popform.value.id_etu,
    nom: this.popform.value.nom,
    email: this.popform.value.email,
    departement:this.popform.value.departement,
    contact: this.popform.value.contact,
    prenom:this.popform.value.prenom
    // password: this.popform.value.password !== '' ? this.popform.value.password : undefined
  }
  if(this.popform.value.password !== ''){
    formData['password'] = this.popform.value.password;
  }
   this.etud.editEtudiant(formData).subscribe(()=>{
    // this.popform.reset();
    this.modalService.dismissAll();
    console.log("Mise à Jour avec Succés");
    // this.ngOnInit();
    window.location.reload();
   },error=>{
    console.error('Erreur lors de la mise à jour de l\'entreprise :', error);
    alert("Erreur lors de la mise à jour de l'entreprise");
   })
  //  console.log(formData);
   
  }
  onAjout(){ // submit the add
    
    const formData=this.popform1.value;
    if(this.popform1.valid){
    this.etud.addEtudiant(formData).subscribe(()=>{
      this.modalService.dismissAll();
      console.log("Ajouté avec Succés");
      // this.ngOnInit();
      window.location.reload();
     },error=>{
      console.error('Erreur lors de l\'ajout de l\'entreprise :', error);
      alert("Erreur lors de l'ajout de l'entreprise");
     })
    }
  }
  
}
