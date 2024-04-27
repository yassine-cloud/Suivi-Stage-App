import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor( private http: HttpClient) { }

  uploadCV(cvFile : File , id_etu:number){
    const cvData = new FormData();
    cvData.append('cv',cvFile);
    cvData.append('id_etu', id_etu.toString())
    const url = 'http://localhost:3000/upload-cv';
    console.log('POST request URL:', url);
    return this.http.post(url,cvData);
    
  }
}
