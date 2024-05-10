import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepotService } from 'src/app/services/Depot/depot-stage.service';
import { ListeOffresService } from 'src/app/services/etudiant/liste-offres.service';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent implements OnInit{

  adress : string[]=[]
  secteurs : string[]=[]

  filteradress : string="";
  filtersecteurs : string="";

  selectTypeStage : string = "";


  offres:any[] = [];
  

constructor(private list:ListeOffresService,private router:Router,private depotS : DepotService){}

postuler(offreStageId: number) {
  // this.depotS.id_os = offreStageId;
  
      this.depotS.postuler(offreStageId).subscribe(
        () => {
          window.location.reload();
        },
        (error) => {
          console.error('Erreur lors de la postulation : ', error);
        }
    
      )}

      


ngOnInit(): void {
  this.list.getListe_Offres().subscribe(data=>{
    this.offres=data; 
    // console.log(data)

    for(let c of data){
      if( !this.adress.includes(c.adresse!.trim().toUpperCase()) ) { this.adress.push(c.adresse!.trim().toUpperCase()) }
      this.extractSecturs(c.secteuractivite)
      
    }


  })
}

extractSecturs(col : string){
  let sec = [];
  sec = col.split(",");
  for(let c of sec){
    if( !this.secteurs.includes(c.trim().toUpperCase()) ) { this.secteurs.push(c.trim().toUpperCase()) }
  }
}


filtredOffres = ()=>{
    if(this.filteradress == "" && this.filtersecteurs == "" && this.selectTypeStage == "")
      return this.offres;
      else{
        let f : any[] =this.offres
        if(this.filteradress != ""){
          f=f.filter( c =>  c.adresse?.trim().toUpperCase().includes(this.filteradress)  )
        }
        if(this.filtersecteurs != ""){
          f=f.filter( c =>  c.secteuractivite?.trim().toUpperCase().includes(this.filtersecteurs)  )
        }
        if(this.selectTypeStage != ""){
          f=f.filter( c =>  c.type == this.selectTypeStage  )
        }
        
        // console.log(f);
        
        return f;
      }
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

}
