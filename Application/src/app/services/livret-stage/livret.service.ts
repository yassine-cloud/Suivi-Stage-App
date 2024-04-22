import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LivretService {

  constructor(private http : HttpClient , private login : LoginService) { }
  private url: string = environment.apiUrl ;
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}

getLivret(){
  let id = this.login.user.id_etu as number;
  return this.http.post<any[]>(`${this.url}/livret`, { id_etu : +id } ,this.options  ).pipe(
    map((res)=>{
      res.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      return res;
    }),
    catchError(err => {
    console.log(err)
    alert("Erreur lors de la recuperation des Livrets");
    return of([]);
    })
  );
}

addLivret(data:any){
  data.id_etu = this.login.user.id_etu;
  return this.http.post<any>(this.url+"/addLivret",data , this.options).pipe(
    map((res)=>{
      return true;
    }),
    catchError(err => {
    console.log(err)
    alert("Erreur lors de l'ajout de livret");
    return of(false);
    })
  );
}

editLivret(data:any){
  // data.id_etu = this.login.user.id_etu;
  return this.http.post<any>(this.url+"/editLivret",data , this.options).pipe(
    map((res)=>{
      return true;
    }),
    catchError(err => {
    console.log(err)
    alert("Erreur lors de l'edition de livret");
    return of(false);
    })
  );
}

deleteLivret(id_ls : string):Observable<boolean>{
  return this.http.post<any>(`${this.url}/delLivret`, { id_ls : +id_ls } ,this.options  ).pipe(
    catchError(err => {
    console.log(err)
    alert("Erreur lors de la suppression de livret");
    return of(false);
    })
  );
}


}
