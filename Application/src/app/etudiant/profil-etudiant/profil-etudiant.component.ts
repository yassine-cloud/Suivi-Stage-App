import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfilService } from 'src/app/services/etudiant/profil.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profil-etudiant',
  templateUrl: './profil-etudiant.component.html',
  styleUrls: ['./profil-etudiant.component.css']
})
export class ProfilEtudiantComponent {
  constructor(private profilService : ProfilService, private loginS : LoginService,private formB : FormBuilder) {}
  private modalService = inject(NgbModal);
  @ViewChild('pop') pop!: TemplateRef<any>;
  
  etudiant : any ;

  form !: FormGroup;

  ngOnInit(){
    this.etudiant = this.loginS.user;
    this.form = this.formB.group({
      cv: [null , Validators.required] // Initialize with null
    });
    
  }

  openpopup(){
    this.form.reset();
    this.modalService.open(this.pop, { backdropClass: 'pop-up-backdrop' });
  }

  closePop(){
    this.form.reset();
    this.modalService.dismissAll();
  }

  onCVSelect() {
    console.log(this.form)    
    const file : File = this.form.value.cv;
    if (!file) {
      console.log('No file selected');
      return;
    }
    if(file.type !== 'application/pdf'){
      alert('Please select a PDF file');
      return;
    }

    this.profilService.uploadCV(file).subscribe(
      (response) => {
        if(response){
          this.closePop();
          this.ngOnInit();
          this.downloadCV();
        }
      }
    );
}

updatedPDF(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (!inputElement.files || inputElement.files.length === 0) {
    console.log('No file selected');
    // Remove the 'cv' validator if no file is selected
    return;
  }
  const file: File = inputElement.files[0];
  if(file.type !== 'application/pdf'){
    alert('Please select a PDF file');
    return;
  }
  this.form.patchValue({
    cv: file
  });
  // Add the 'cv' validator if a file is selected
}

downloadCV() {
  this.profilService.openPdfInNewTab(this.etudiant.id_etu)
}

}
