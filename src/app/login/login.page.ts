import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = this.formBuilder.group({
    email:['',Validators.compose([Validators.required, Validators.email])],
    senha:['',Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensagemErro = {
    email: [{tipo:'required', aviso:'Digite um e-mail!'}, {tipo:'email', aviso:'Tem que ser um e-mail!'}],
    senha: [{tipo:'required', aviso:'Digite uma senha!'}, {tipo:'minLength', aviso:'No mínimo 6 dígitos!'}],
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
