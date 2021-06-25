import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class DineroService {

  //user : User;

  constructor(private http: HttpClient) {
      //Referencia al usuario logeado  
      //this.user = this.accountService.userValue;
    }

    updateMonto(id: string, monto : any): Observable<any> {
      return this.http.put(`${environment.apiUrl}/users/monto/${id}`,monto);
    }
    getSaldoPesos(id: string): Observable<any>{
      return this.http.get<User>(`${environment.apiUrl}/users/monto/pesos/${id}`);
    }
    getSaldoDolares(id: string): Observable<any>{
      return this.http.get<User>(`${environment.apiUrl}/users/monto/dolares/${id}`);
    }
    getSaldoCriptomonedas(id: string): Observable<any>{
      return this.http.get<User>(`${environment.apiUrl}/users/monto/criptomonedas/${id}`);
    }
}
