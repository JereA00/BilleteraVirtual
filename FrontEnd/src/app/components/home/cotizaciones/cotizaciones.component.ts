import { Component, OnInit } from '@angular/core';
import { CotizacionesService } from 'src/app/services/cotizaciones.service';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  constructor(private cotizacionesService : CotizacionesService) { }

  criptomonedas_arg = ["BTC-ARS","ETH-ARS","BCH-ARS","LTC-ARS","XLM-ARS","ETC-ARS","EOS-ARS","XTZ-ARS",
    "DASH-ARS","ZRX-ARS"];
  criptomonedas_usd = ["BTC-USD","ETH-USD","BCH-USD","LTC-USD","XLM-USD","ETC-USD","EOS-USD","XTZ-USD",
  "DASH-USD","ZRX-USD"];


  listCotizacionesARS : any = [];
  listCotizacionesUSD : any = [];
  listCotizacionDolar : any = [];

  ngOnInit(): void {
    this.obtenerCriptomonedas();
    this.obtenerDolar()
  }
  obtenerDolar(){
    let cotizacionOficial = {
      titulo: "",
      compra: 0,
      venta: 0
    }
    let cotizacionBlue = {
      titulo: "",
      compra: 0,
      venta: 0
    }
    this.cotizacionesService.getCotizacionDolar().subscribe(data => {
      cotizacionOficial.titulo = data[0].casa.nombre;
      cotizacionOficial.compra = data[0].casa.compra;
      cotizacionOficial.venta = data[0].casa.venta;
      cotizacionBlue.titulo = data[1].casa.nombre;
      cotizacionBlue.compra = data[1].casa.compra;
      cotizacionBlue.venta = data[1].casa.venta;
      this.listCotizacionDolar.push(cotizacionOficial);
      this.listCotizacionDolar.push(cotizacionBlue);
    });
    console.log(this.listCotizacionDolar)
  }

  obtenerCriptomonedas(){
    for(let indice in this.criptomonedas_usd){
      let cotizacion = {
        titulo: "",
        compra: 0,
        venta: 0
      }
      this.cotizacionesService.getCotizacionCriptomonedasCompra(this.criptomonedas_usd[indice]).subscribe(data => {
        cotizacion.compra = data.data.amount;        
      });
      this.cotizacionesService.getCotizacionesCriptomonedasVenta(this.criptomonedas_usd[indice]).subscribe(data => {
        cotizacion.venta = data.data.amount;
      });
      cotizacion.titulo = this.criptomonedas_usd[indice];
      this.listCotizacionesUSD.push(cotizacion);
    }
    console.log(this.listCotizacionesARS)

    for(let indice in this.criptomonedas_arg){
      let cotizacion = {
        titulo: "",
        compra: 0,
        venta: 0
      }
      this.cotizacionesService.getCotizacionCriptomonedasCompra(this.criptomonedas_arg[indice]).subscribe(data => {
        cotizacion.compra = data.data.amount;        
      });
      this.cotizacionesService.getCotizacionesCriptomonedasVenta(this.criptomonedas_arg[indice]).subscribe(data => {
        cotizacion.venta = data.data.amount;
      });
      cotizacion.titulo = this.criptomonedas_arg[indice];
      this.listCotizacionesARS.push(cotizacion);
    }
    console.log(this.listCotizacionesARS)
  }
}
