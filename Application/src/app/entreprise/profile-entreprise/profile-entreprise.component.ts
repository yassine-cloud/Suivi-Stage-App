import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-entreprise',
  templateUrl: './profile-entreprise.component.html',
  styleUrls: ['./profile-entreprise.component.css']
})
export class ProfileEntrepriseComponent {


  fc:boolean=false;
  ngOnInit(): void {
    this.fc=false;
  }
listeSociete=[
  { nom:"ooredoo",
    email:"ooredoo@gmail.com",
    password:"ooredoo123",
    logo:"https://upload.wikimedia.org/wikipedia/commons/b/b6/Ooredoo.svg",
    prop:[{
      sujet:"gestion facture",
      description:"ccccccccccccc",
      nbrEtudiant:4 
    },
  ]
  },
    {
      nom:"orange",
      email:"orange@gmail.com",
      password:"orange123",
      logo:"https://logowik.com/content/uploads/images/650_orange.jpg",
      prop:[{
        sujet:"e-commerce",
        description:"bbbbbb",
        nbrEtudiant:2  
      },
    ]
    },
    {
      nom:"Tunisie Telecom",
      email:"tt@gmail.com",
      password:"tt123",
      logo:"https://upload.wikimedia.org/wikipedia/fr/f/f9/LOGO_TT_.jpg",
      prop:[{
        sujet:"e-learning",
        description:"aaaaaaaaaaaaaa",
        nbrEtudiant:5  
      },
    ]
    }
]
societe=this.listeSociete[0];

onAnnuler(){
  this.fc=false;
}
onCommence(){
  this.fc=true;
}
onAjout(ff:any){
  if(ff.description!="" && ff.sujet!="" && Number(ff.nbr)>0)
    this.listeSociete[0].prop.push(ff);
  else
    alert("les champs doivent etre non vide");
}



}
