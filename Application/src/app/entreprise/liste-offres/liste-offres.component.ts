import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-offres',
  templateUrl: './liste-offres.component.html',
  styleUrls: ['./liste-offres.component.css']
})
export class ListeOffresComponent {

  listeSociete=[
    { nom:"ooredoo",
      email:"ooredoo@gmail.com",
      password:"ooredoo123",
      logo:"https://upload.wikimedia.org/wikipedia/commons/b/b6/Ooredoo.svg",
      prop:[{
        sujet:"gestion facture",
        description:"ccccccccccccc",
        nbrEtudiant:4 
      },{
        sujet:"aaaaaaaaaaaa",
        description:"wwwwwwwww",
        nbrEtudiant:2 
      },{
        sujet:"bbbbbbbbbb",
        description:"dddddddddddd",
        nbrEtudiant: 7
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

}
