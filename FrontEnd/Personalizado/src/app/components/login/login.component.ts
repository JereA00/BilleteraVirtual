import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators'
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';

//import { UserLogin } from 'src/app/interfaces/UserLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  error : any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService 
    ) {
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  // Getter conveniente para acceder mas facil a los campos de form
  get f() { return this.form.controls; }

  ngOnInit(): void {
  }

  onSubmit() {

    this.submitted = true;

    // Borra las alertas al presionar boton de login
    this.alertService.clear();

    // No hace nada si el formulario es invalido
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    // obtener la URL de retorno de los parámetros de consulta o por defecto a la página de inicio
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                    this.router.navigateByUrl(returnUrl);
                },
                error: error =>{
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    /*
    const login: UserLogin = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    };

    console.log(login)
    */
  }

}
