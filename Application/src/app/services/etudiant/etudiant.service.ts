import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  private url: string = environment.apiUrl ;
  constructor(private http : HttpClient) { }
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}


  getListeEtudiants():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/etudiants", this.options).pipe(catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }
  getEtudiant(id:string):Observable<any[]>{
    return this.http.post<any[]>(`${this.url}/etudiant`, { id_etu : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la recuperation des offres");
      return of([]);
      })
    );
  }

  editEtudiant(i:any):Observable<any>{
    return this.http.post<any>(this.url+"/editEtudiant",i , this.options);
  }
  deleteEtudiant(id: any): Observable<any> {
    const params = new HttpParams().set('id_etu', id);
    return this.http.delete<any>(this.url + "/deleteEtudiant", { params });
}

  addEtudiant(data:any):Observable<any>{
    return this.http.post<any>(this.url+"/addEtudiant",data , this.options);
  }
  /*supprimerEtudiant(id : string){
    return this.http.post<any>(`${this.url}/deleteEtudiant`, { id_etu : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la suppression de l'etudiant");
      return of([]);
      })
    );
  }*/

}
