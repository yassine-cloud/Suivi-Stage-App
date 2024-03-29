import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }
  private url: string = environment.apiUrl ;
  options = {headers : new HttpHeaders(
    {'content-type' : "application/json"}
  )}

  user : any;
  acessTocken : string='';
  connected : boolean = false;



  controle(){

  }

  deconnexion(){
    sessionStorage.clear();
    window.location.replace(window.location.href+"/Deconnecter");    
  }

  login(email: string, password: string): Observable<boolean > {
    console.log("login service");
    
    return this.http.post<any>(`${this.url}/login`, { email, password })
      .pipe(
        map( (response) => {
          
  
          // Store login information for successful login
          // sessionStorage.setItem("accessToken", response.accessToken);
          // sessionStorage.setItem("user", JSON.stringify(response.user));
  
          alert("Connexion Reussi \n Bienvenue "+response.user.nom+" "+response.user.prenom);
          return true; // Login successful
        }),
        tap(result => {
          // console.log(result); // Log the login result (true or false)
          // console.log(JSON.parse(sessionStorage.getItem("user")!).role);
          
        }),
        catchError(error => {
          // console.error(error);
          console.error('Error:', error);
          alert("An error occurred during login");
          return of(false); // Return false in case of error
        })
      );
  }

  register(user: any , pass : string): Observable<boolean> {
    return this.http.post<{ accessToken: string, user: any }>(`${this.url}/register`, {...user , 'password' : pass }).pipe(
      map(
        (response) =>{
          if(response.accessToken && response.user){return true;}
          else {return false;}
        }
      ),
      catchError(error => {
        console.error('Error Connexion:', error);
        throw of(false);
      })
  
    )
  }



}
