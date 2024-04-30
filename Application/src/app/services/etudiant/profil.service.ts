import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';
import { catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor( private http: HttpClient,private loginS:LoginService) { }

  uploadCV(cvFile: File) {
    const id_etu = this.loginS.user.id_etu;
    const cvData = new FormData();
    cvData.append('cv', cvFile);
    cvData.append('id_etu', id_etu);
    const url = environment.apiUrl + '/upload-cv';
    console.log('POST request URL:', url);
    return this.http.post(url, cvData).pipe(
      map((response : any) => {
        console.log('Response:', response);
        this.loginS.setCvEtudiant(response.cv);
        return response;
      }),
      catchError((error) => {
        console.error('Error:', error);
        return of( null);
      })
    

    );
}


    private downloadPdf(id_etu: string) { 
      // to use this function use this.downloadPdf(id_etu) instead of this.downloadPdf()
      const url = environment.apiUrl + '/download-cv';
      const options = {
        responseType: 'blob' as 'json', // Receive response as Blob
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      return this.http.post(url, { id_etu }, options).pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError('Error downloading PDF');
        })
      );
    }
  
    openPdfInNewTab(id_etu: string) {
      this.downloadPdf(id_etu).subscribe((response: any) => { // Specify response type as any
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      });
    }
  



}
