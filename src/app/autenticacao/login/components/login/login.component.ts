import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

import {Login} from '../../models';
import {LoginService} from '../../services';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(

    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router:Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.gerarForm();
  }

  gerarForm(){
    this.form = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      senha:['',[Validators.required, Validators.minLength(6)]]
    });
  }

 logar(){
  if(this.form.invalid){
    this.snackBar.open("Dados inválidos"," Erro",{duration:5000});
    return;
  }
  const login = this.form.value;
  this.loginService.logar(login)
  .subscribe(
    data => {
      console.log(JSON.stringify(data));
      localStorage[''] = Token;
      
     
      // nao precisa pegar o perfil pois serao apenas clientes
        this.router.navigate(['produtos']);
      },
    err => {
      let msg: string = "Tente novamente em instantes.";
      if (err['status'] == 401) {
        msg = "Email/senha inválido(s)."
      }
      this.snackBar.open(msg, "Erro", { duration: 5000 });
     }
    );
  }
}
