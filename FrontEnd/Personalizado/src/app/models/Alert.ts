/*
El modelo Alert define las propiedades de cada objeto alert y define el enum AlertType que contiene 
los tipos de alertas permitidas en la aplicacion
*/
export class Alert {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange?: boolean;
    fade: boolean;

    constructor(init?:Partial<Alert>) {
        this.id = '';
        this.message = '';
        this.type = AlertType.Success;
        this.autoClose = false;
        this.keepAfterRouteChange = false;
        this.fade = false;
         
        Object.assign(this, init);
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
