import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncadrantService {
  private url: string = environment.apiUrl ;
  constructor(private http : HttpClient) { }
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}

  getListeEncadrants():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/encadrants", this.options).pipe(catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }
  getEncadrant(id:string):Observable<any[]>{
    return this.http.post<any[]>(`${this.url}/encadrant`, { id_enc : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de l encadrant");
      return of([]);
      })
    );
  }

  editEncadrant(i:any):Observable<any>{
    return this.http.post<any>(this.url+"/editEncadrant",i , this.options);
  }
  deleteEncadrant(id: any): Observable<any> {
    const params = new HttpParams().set('id_enc', id);
    return this.http.delete<any>(this.url + "/deleteEncadrant", { params });
}

  addEncadrant(data:any):Observable<any>{
    return this.http.post<any>(this.url+"/addEncadrant",data , this.options);
  }
 

  getStagiairesNonValides(encadreurId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/encadrants/${encadreurId}/stagiaires`);
  }

  getStagiairesJurie(encadreurId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/jurie/${encadreurId}/stagiaires`);
  }

  getDetailStage(id: number): Observable<any> {
    return this.http.post<any>(`${this.url}/detailstageenc` , {id_stg : id} , this.options);
  }


  

}
