import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userAdd : FormGroup;

  constructor(private fb: FormBuilder) { 
    this.userAdd = fb.group({
      nombre: ['', Validators.required],
      apellido: ['',Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
  }

  addUser(){
    const newUser: User = {
      nombre: this.userAdd.get('nombre')?.value,
      apellido: this.userAdd.get('apellido')?.value,
      username: this.userAdd.get('username')?.value,
      password: this.userAdd.get('password')?.value
    };

    console.log(newUser)
  }
}
