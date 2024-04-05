import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depot } from 'src/app/interfaces/depot';

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addDepot(depot: Depot): Observable<Depot> {
    return this.http.post<Depot>(`${this.baseUrl}/depotOffre`, depot);
  }
}
