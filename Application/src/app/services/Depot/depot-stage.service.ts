import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private url: string = environment.apiUrl ;
  httpOptions = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}
  constructor(private http: HttpClient,private loginS : LoginService) { 
        
  }

  id_os ?:number ;
  id_etu ?:number ;

  canActivate():boolean{
    this.id_etu = this.loginS.user.id_etu;
    return this.id_etu!=undefined && this.id_os!=undefined;
  }

  postuler(idOffre: number): Observable<any> {
    let id_etu = this.loginS.user.id_etu;
    const data = {
      id_os: idOffre,
      id_etu: id_etu,
      status : "En cours",
      date : new Date()
    };
    return this.http.post<any>(`${this.url}/postuler`, data, this.httpOptions).pipe(
      map((response) => {
        console.log('Postulation avec succès:');
        alert('Postulation réussie !');
        return response;
      }),
      catchError(err=>{
        console.error('Error Connexion:', err);
        alert('Erreur lors de la postulation');
        return of([]);
      })
    
    );
  }

  getStagiaires(entrepriseId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/entreprise/${entrepriseId}/stagiaires`);
  }

  

  Status(depotId: number, newStatus: string) {
    return this.http.post<any>(`${this.url}/updatestagiaire`, { id_ds : depotId , status : newStatus});
  }




}

