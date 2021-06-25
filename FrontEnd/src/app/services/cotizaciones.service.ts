import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionesService {

  urlDolar = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
  urlCriptomonedas = 'https://api.coinbase.com/v2/prices/';
  constructor(private http: HttpClient) { }

  getCotizacionDolar(): Observable<any>{
    return this.http.get(this.urlDolar)
  }
  getCotizacionCriptomonedasCompra(criptomoneda_moneda: string): Observable<any>{
    const URL = this.urlCriptomonedas + criptomoneda_moneda + '/buy';
    return this.http.get(URL);
  }

  getCotizacionesCriptomonedasVenta(criptomoneda_moneda: string): Observable<any>{
    const URL = this.urlCriptomonedas + criptomoneda_moneda + '/sell';
    return this.http.get(URL);
  }
  
}
