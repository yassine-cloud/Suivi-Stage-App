import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile-entreprise',
  templateUrl: './profile-entreprise.component.html',
  styleUrls: ['./profile-entreprise.component.css']
})
export class ProfileEntrepriseComponent {

  // pop up view
  private modalService = inject(NgbModal);

  @ViewChild('pop') popRef!: TemplateRef<any>;


  openPopup() {
    this.modalService.open(this.popRef, { backdropClass: 'pop-up-backdrop' });
  }

  constructor(private entre : EntrepriseService , private router : ActivatedRoute , private formbuild : FormBuilder,private logU : LoginService) { }

  entreprise: any;
  id_ent : string ='';

  popform !: FormGroup;

  ngOnInit(): void {
    // this.id_ent = this.router.snapshot.paramMap.get('id') ?? '';
    

    this.id_ent = this.logU.user.id_ent ?? '';
    if(this.id_ent == ''){
      alert("Erreur lors de la recuperation de l'identifiant de la societe");
      return;
    }

    this.entre.getEntreprise(this.id_ent).subscribe(
      (res) => {
        this.entreprise = res[0];
        this.popform = this.formbuild.group({
          titre: ['' , Validators.required],
          description: ['' , Validators.required],
          date_debut: ['' , Validators.required],
          date_fin: ['' , Validators.required],
          id_ent: [this.id_ent , Validators.required],
          nombre : [0 , Validators.required]
        });
      }
    );

  }

onAjout(){
  alert("Ajout d'offre");
  console.log(this.popform);
  
}



}
