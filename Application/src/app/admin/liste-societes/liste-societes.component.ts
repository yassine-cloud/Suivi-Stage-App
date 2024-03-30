import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';

@Component({
  selector: 'app-liste-societes',
  templateUrl: './liste-societes.component.html',
  styleUrls: ['./liste-societes.component.css']
})
export class ListeSocietesComponent implements OnInit{
  x:any;
  entreprise: any;
  popform !: FormGroup;
  popform1!:FormGroup;
  private modalService = inject(NgbModal);
  @ViewChild('pop') popRef!: TemplateRef<any>;
  @ViewChild('pop1') popRef1!: TemplateRef<any>;

  listeSocietes!:any[];
  constructor(private liste:AdminService,private entre : EntrepriseService , private router : ActivatedRoute , private formbuild : FormBuilder){}
  ngOnInit(): void {
    this.liste.getListeSocietes().subscribe(data=>{
      this.listeSocietes=data;
    })
    this.initForm();
    this.initForm1();
  }
  initForm(){
    this.popform = this.formbuild.group({
      id_ent: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
      contact: ['', Validators.required],
      secteuractivite:['',Validators.required],
      password: ['', Validators.required],
      logo: ['', Validators.required],
    });
  }
  initForm1(){
    this.popform1 = this.formbuild.group({
      id_ent: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
      contact: ['', Validators.required],
      secteuractivite:['',Validators.required],
      password: ['', Validators.required],
      logo: ['', Validators.required],
    });
  }

  onModifie(i:any){
    this.entre.getEntreprise(i.id_ent).subscribe(
      (res: any) => {
        this.entreprise = res[0];
        this.popform.patchValue({
          id_ent: i.id_ent,
          nom: i.nom,
          email: i.email,
          adresse: i.adresse,
          contact: i.contact,
          secteuractivite:i.secteuractivite,
          password:i.password,
          logo:i.logo
        });
      }
    );
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
    
  }
  onSubmit(){
   const formData=this.popform.value;
   this.liste.EditSociete(formData).subscribe(()=>{
    this.popform.reset();
    this.modalService.dismissAll();
    console.log("Mise à Jour avec Succés");
   },error=>{
    console.error('Erreur lors de la mise à jour de l\'entreprise :', error);
   })
   
  }
  onAjout(){
    this.initForm1();
    
    const formData=this.popform.value;
    if(this.popform.valid){
    this.liste.AddSociete(formData).subscribe(()=>{
      this.modalService.dismissAll();
      console.log("Ajouté avec Succés");
     },error=>{
      console.error('Erreur lors de l\'ajout de l\'entreprise :', error);
     })
    }
    this.modalService.open(this.popRef1, { backdropClass: 'pop-up-backdrop' });
    console.log(formData);
  }

}
