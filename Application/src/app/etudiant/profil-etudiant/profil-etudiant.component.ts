import { Component } from '@angular/core';
import { ProfilService } from 'src/app/services/etudiant/profil.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profil-etudiant',
  templateUrl: './profil-etudiant.component.html',
  styleUrls: ['./profil-etudiant.component.css']
})
export class ProfilEtudiantComponent {
  constructor(private profilService : ProfilService, private loginS : LoginService) {}

  etudiant : any ;
  ngOnINit(){
    this.etudiant = this.loginS.user;
  }
  onCVSelect(event: Event){
    const inputCV=event.target as HTMLInputElement;
    if (inputCV && inputCV.files){
      const cvFile= inputCV.files[0];
      this.profilService.uploadCV(cvFile).subscribe
      (()=>
        {
          alert('cv uploaded successully');
          console.log('cv uploaded successully');
        }
      )
    }
  }

}