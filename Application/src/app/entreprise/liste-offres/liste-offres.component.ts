import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntrepriseService } from 'src/app/services/entreprise/entreprise.service';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent {

  constructor(private entre : EntrepriseService , private router : ActivatedRoute) { }

  offres: any[] =[]

  id_ent : string ='';

  ngOnInit(): void {

    this.id_ent = this.router.snapshot.paramMap.get('id') ?? '';
    if(this.id_ent == ''){
      alert("Erreur lors de la recuperation de l'identifiant de la societe");
      return;
    }

    this.entre.getListeOffresSociete(this.id_ent).subscribe(
      (res) => {
        this.offres = res;
        // console.log(res);
      }
    );
  
  
  }

}
