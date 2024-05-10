import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  

  constructor(private http : HttpClient , private loginS : LoginService) { }
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

  supprimerOffre(id : string){
    return this.http.post<any[]>(`${this.url}/deleteoffre`, { id :+id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la suppression de l'offre");
      return of([]);
      })
    );
  }

  // Entreprise
  getEntreprises():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/entreprises", this.options).pipe(catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }


  getEntreprise(id : string):Observable<any[]>{
    return this.http.post<any[]>(`${this.url}/entreprise`, { id_ent : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la recuperation des offres");
      return of([]);
      })
    );
  }
  editEntreprise(i:any):Observable<any>{
    return this.http.post<any>(this.url+"/editEntreprise",i , this.options);
  }
  addEntreprise(data:any):Observable<any>{
    return this.http.post<any>(this.url+"/addEntreprise",data , this.options);
  }

  supprimerEntreprise(id : string){
    return this.http.post<any>(`${this.url}/deleteEntreprise`, { id_ent : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la suppression de l'entreprise");
      return of([]);
      })
    );
  }


  getStagiairesEnt(): Observable<any> {
    const id_ent = this.loginS.user.id_ent;
    return this.http.post<any>(`${this.url}/stagiaireactiveent` , {id_ent :id_ent} , this.options);
  }

  getDetailStage(id: number): Observable<any> {
    return this.http.post<any>(`${this.url}/detailstageenc` , {id_stg : id} , this.options);
  }
  
}
