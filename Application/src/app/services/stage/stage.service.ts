import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private url: string = environment.apiUrl ;
  constructor(private http : HttpClient) { }
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}


  // getListeStages():Observable<any[]>{
  //   return this.http.get<any[]>(this.url+"/stages", this.options).pipe(
  //     catchError(err=>{
  //     console.error('Error Connexion:', err);
  //       return of([]);
  //   }))
  // }

  getListeStagesNonNote():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/stagesnonnote", this.options).pipe(
      catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }

  getListeStagesNote():Observable<any[]>{
    return this.http.get<any[]>(this.url+"/stagesnote", this.options).pipe(
      catchError(err=>{
      console.error('Error Connexion:', err);
        return of([]);
    }))
  }

  // getListeNAStages():Observable<any[]>{
  //   return this.http.get<any[]>(this.url+"/NAstages", this.options).pipe(catchError(err=>{
  //     console.error('Error Connexion:', err);
  //       return of([]);
  //   }))
  // }
  getStage(id:string):Observable<any[]>{
    return this.http.post<any[]>(`${this.url}/stage`, { id_stg : +id } ,this.options  ).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la recuperation des Stages");
      return of([]);
      })
    );
  }

  editStage(i:any):Observable<any>{
    return this.http.post<any>(this.url+"/affecteEncadrant",i , this.options).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de l'affectation de l'encadrant");
      return of([]);
      })
    );
    
  }


  affecterJuries(data : any):Observable<any>{
    return this.http.post<any>(this.url+"/affecterjury",data , this.options).pipe(
      map((val)=>{
        return val;
      }),
      catchError(err => {
      console.log(err)
      alert("Erreur lors de l'affectation du jury");
      return of([]);
      })
    );
    
  }

  affecterNoteStage(data : any):Observable<any>{
    return this.http.post<any>(this.url+"/affecternote",data , this.options).pipe(
      map((val)=>{
        return val;
      }),
      catchError(err => {
      console.log(err)
      alert("Erreur lors de l'affectation de la note");
      return of([]);
      })
    );
  }

  supprimerStage(id:number):Observable<any>{
    return this.http.post<any>(this.url+"/supprimerstage",{id_stg:id} , this.options).pipe(
      catchError(err => {
      console.log(err)
      alert("Erreur lors de la suppression du stage");
      return of([]);
      })
    );
  }

  addStage(data:any):Observable<any>{
    return this.http.post<any>(this.url+"/addStage",data , this.options);
  }

}
