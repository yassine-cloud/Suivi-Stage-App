import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private url: string = environment.apiUrl ;
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}
  constructor(private http: HttpClient) { 
    this.id_etu = 1;
  }

  id_os ?:number ;
  id_etu ?:number ;

  canActivate():boolean{
    return this.id_etu!=undefined && this.id_os!=undefined;
  }

  addDepot(depot: any):Observable<boolean>{
    depot.id_etu = this.id_etu;
    depot.id_os = this.id_os;
    depot.date = new Date();
    depot.status = "En attente";
    return this.http.post<any>(`${this.url}/depotOffre`, depot , this.options).pipe(
      map((res) => {
        alert("Offre ajoutée avec succès");
        return true;
      }),
      catchError((err) => {
        console.log("err",err);
        return of(false);
      })

    );
  }
}
