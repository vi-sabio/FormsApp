import { Usuario } from './../models/Usuario.model';
import { Router } from '@angular/router';
import { UsuariosService } from './../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });

  mensagemErro = {
    email: [
      { tipo: 'required', aviso: 'Digite um e-mail!' },
      { tipo: 'email', aviso: 'Tem que ser um e-mail!' },
    ],
    senha: [
      { tipo: 'required', aviso: 'Digite uma senha!' },
      { tipo: 'minlength', aviso: 'No mínimo 6 dígitos!' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuariosService, private route: Router) {}

  get email() {
    return this.formLogin.get('email');
  }

  get senha() {
    return this.formLogin.get('senha');
  }

  ngOnInit() {}

  async entrar() {
    if (this.formLogin.valid) {

      if (await this.usuarioService.login(this.email.value, this.senha.value)) {
        alert('Login com Sucesso');
        this.route.navigateByUrl('/tabs/tab1');
      } else {
        alert('Falha no login');
      }

    } else {
      alert ('Formulario Invalido');
    }
  }

  registro(){
    this.route.navigateByUrl('/registro');
  }
}

