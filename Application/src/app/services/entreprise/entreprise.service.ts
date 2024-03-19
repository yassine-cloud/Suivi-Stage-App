import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  

  constructor(private http : HttpClient) { }
  private url: string = environment.apiUrl ;
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}


  getListeOffresSociete(id : string){
    return this.http.post<any[]>(`${this.url}/offresentreprise`, { id_ent : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la recuperation des offres");
      return of([]);
      })
    );
  }


  getEntreprise(id : string){
    return this.http.post<any[]>(`${this.url}/entreprise`, { id_ent : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la recuperation des offres");
      return of([]);
      })
    );
  }

  
}
