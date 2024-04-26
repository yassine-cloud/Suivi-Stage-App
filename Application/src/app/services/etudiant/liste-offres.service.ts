import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class ListeOffresService {
  private url: string = environment.apiUrl ;
  

  getListe_Offres():Observable<any[]>{
    const id_etu = this.loginS.user.id_etu;
    return this.http.post<any[]>(this.url+"/offreetudiant", {id_etu} , this.options ).pipe(
      catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }

  constructor(private http:HttpClient,private loginS : LoginService) { }
  options = {headers : new HttpHeaders({
    'content-type' : "application/json",
    'authorization' : "Bearer "+sessionStorage.getItem("accessToken")
  })}
}
