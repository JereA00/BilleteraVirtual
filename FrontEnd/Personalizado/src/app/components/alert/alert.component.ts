import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Alert, AlertType } from 'src/app/models/Alert';
import { AlertService } from 'src/app/services/alert.service';

/* 
El componente alert agrega y elimina las alertas de la UI, esto mantiene un array que es renderizado en el HTML
*/

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = 'default-alert';
  @Input() fade = true;

  alerts : Alert[] = [];
  alertSubscription : Subscription;
  routeSubscription : Subscription;
  
  constructor(private router: Router, private alertService: AlertService) {  
    //Habilita la suscripción a alertas observables
    this.alertSubscription = this.alertService.onAlert(this.id) 
    .subscribe(alert => {
        // Borra las alertas cuando recibe una alerta vacia
        if (!alert.message) {
            // filtrar alertas sin el indicador 'keepAfterRouteChange'
            this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

            // eliminar la bandera 'keepAfterRouteChange' en el resto
            this.alerts.forEach(x => delete x.keepAfterRouteChange);
            return;
        }

        // Agrega la alerta al arreglo
        this.alerts.push(alert);

        // Cierra la alerta de forma automatica despues de 3 segundos
        if (alert.autoClose) {
            setTimeout(() => this.removeAlert(alert), 3000);
        }
   });

    // alertas claras sobre el cambio de ubicación
    this.routeSubscription = this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            this.alertService.clear(this.id);
        }
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    // darse de baja para evitar pérdidas de memoria
    this.alertSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    // verifica si ya se eliminó para evitar errores en el cierre automático
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
        // alerta de desvanecimiento
        alert.fade = true;

        // eliminar alerta después de desvanecerse
        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x !== alert);
        }, 250);
    } else {
        // elimina alerta
        this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];
            
    const alertTypeClass = {
        [AlertType.Success]: 'alert alert-success',
        [AlertType.Error]: 'alert alert-danger',
        [AlertType.Info]: 'alert alert-info',
        [AlertType.Warning]: 'alert alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
        classes.push('fade');
    }

    return classes.join(' ');
  }
}
