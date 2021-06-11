import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from 'src/app/interfaces/UserLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;


  constructor(private fb: FormBuilder) {
    this.loginUser = fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    }); 
  }

  ngOnInit(): void {
  }

  login() {
    const login: UserLogin = {
      username: this.loginUser.get('username')?.value,
      password: this.loginUser.get('password')?.value
    };

    console.log(login)
  }

}
