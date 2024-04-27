import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor( private http: HttpClient,private loginS:LoginService) { }

  uploadCV(cvFile : File ){
    const id_etu = this.loginS.user.id_etu;
    const cvData = new FormData();
    cvData.append('cv',cvFile);
    cvData.append('id_etu', id_etu)
    const url = environment.apiUrl+ '/upload-cv';
    console.log('POST request URL:', url);
    return this.http.post(url,cvData);
    
  }

  importCV(){
    const id_etu = this.loginS.user.id_etu;
    const url = environment.apiUrl+ '/import-cv/'+id_etu;
    console.log('GET request URL:', url);
    return this.http.post(url,{id_etu});
  }
}
