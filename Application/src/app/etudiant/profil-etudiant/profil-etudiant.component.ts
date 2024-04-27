import { Component } from '@angular/core';
import { ProfilService } from 'src/app/services/etudiant/profil.service';

@Component({
  selector: 'app-profil-etudiant',
  templateUrl: './profil-etudiant.component.html',
  styleUrls: ['./profil-etudiant.component.css']
})
export class ProfilEtudiantComponent {
  constructor(private profilService : ProfilService) {}

  onCVSelect(event: Event){
    const inputCV=event.target as HTMLInputElement;
    if (inputCV && inputCV.files){
      const cvFile= inputCV.files[0];
      const id_etu =2;
      this.profilService.uploadCV(cvFile,id_etu).subscribe
      (()=>
        {
          alert('cv uploaded successully');
          console.log('cv uploaded successully');
        }
      )
    }
  }

}
