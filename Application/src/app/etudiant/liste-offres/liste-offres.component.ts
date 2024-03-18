import { Component, OnInit } from '@angular/core';
import { ListeOffresService } from 'src/app/services/etudiant/liste-offres.service';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit{
  filtre="";
  offres:any;
constructor(private list:ListeOffresService){}
ngOnInit(): void {
  this.list.getListe_Offres().subscribe(data=>{this.offres=data; console.log(data)})
}


filtredOffres = ()=>{
    if(this.filtre!="")
   return this.offres.filter((offre:any)=>offre.secteuractivite.includes(this.filtre))
  else
  return this.offres;
  }
}
