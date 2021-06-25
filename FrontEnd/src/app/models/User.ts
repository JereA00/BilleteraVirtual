export class User{
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    dni: string;
    jwtToken: string;
    // capitalPesos: number;
    // capitalDolares: number;
    // capitalCriptomonedas: number;

    constructor(){
        this.id = '';
        this.username = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.dni = '';
        this.jwtToken = '';
        // this.capitalPesos = 100;
        // this.capitalDolares = 0;
        // this.capitalCriptomonedas = 0;
    }
}