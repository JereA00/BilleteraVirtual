import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { AccountService } from 'src/app/services/account.service';
import { DineroService } from 'src/app/services/dinero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  user: User;
  form: FormGroup;
  submitted = false;
  saldoPesos = 0;
  saldoDolares = 0;
  saldoCriptomonedas = 0;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private dineroService: DineroService
    ) {
    //Referencia al usuario logeado  
    this.user = this.accountService.userValue;
    // console.log("Usuario en home")
    // console.log(this.user)
    this.form = this.fb.group({
      monto: [0, [Validators.required,Validators.min(1)]],
    });
    this.obtenerSaldos();
   }

   obtenerSaldos(){
      this.dineroService.getSaldoPesos(this.user.id).subscribe(data => {
        this.saldoPesos = data;
      });
      this.dineroService.getSaldoDolares(this.user.id).subscribe(data => {
        this.saldoDolares = data;
      });
      this.dineroService.getSaldoCriptomonedas(this.user.id).subscribe(data => {
        this.saldoCriptomonedas = data;
      });
   }

   // Getter conveniente para acceder mas facil a los campos de form
  get f() { return this.form.controls; }

   onSubmit(){
      this.submitted = true;

      // Para aca si el formulario es invalido
      if (this.form.invalid) {
        console.log("formulario incompleto")
        return;
      }
      console.log(this.form.value)
      this.dineroService.updateMonto(this.user.id,this.form.value).subscribe(data => {
        console.log(data); //que se realizo correctamente
      });
      //this.obtenerSaldos();
   }
}
