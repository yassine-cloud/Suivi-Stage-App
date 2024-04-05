import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DepotService } from '../services/Depot/depot-stage.service';
import { Depot } from '../interfaces/depot';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-depot-offre',
  templateUrl: './depot-offre.component.html',
  styleUrls: ['./depot-offre.component.css']
})
export class DepotOffreComponent {
id_entreprise:number=0
  constructor(private depotService: DepotService,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
       this.id_entreprise = params['id_entreprise'];
    });
  }

  registerForm = new FormGroup({
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    email: new FormControl(""),
    mobile: new FormControl(""),
    gender: new FormControl("")
  });

  registerSubmited() {
    const depotData: Depot = {
      first_name: this.registerForm.value.firstname ?? '',
      last_name: this.registerForm.value.lastname ?? '',
      email: this.registerForm.value.email ?? '',
      phone: this.registerForm.value.mobile ?? '',
      gender: this.registerForm.value.gender ?? '',
      id_etudiant: 4, 
      id_entreprise: this.id_entreprise 
    
    };
  

    this.depotService.addDepot(depotData).subscribe(
      (      response: any) => {
        console.log('Depot added successfully:', response);
       
        this.registerForm.reset();
      },
      (      error: any) => {
        console.error('Error adding depot:', error);
      }
    );
  }
}
