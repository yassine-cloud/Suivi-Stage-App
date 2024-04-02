import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  societe:any;
  private url:string=environment.apiUrl;
  getListeSocietes():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/entreprises").pipe(catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }

  EditSociete(i:any):Observable<any>{
    return this.http.put<any>(this.url+"/editEntreprise",i);
  }
  AddSociete(data:any):Observable<any>{
    return this.http.post<any>(this.url+"/addEntreprise",data);
  }

  constructor(private http:HttpClient) { }
}
