import { UsuariosService } from './../services/usuarios.service';
import { Usuario } from './../models/Usuario.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario: Usuario = new Usuario();

  formRegistro = this.formBuilder.group({
    nome: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3)]),
    ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ])
    ],
    cpf: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ]),
    ],
    senha: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]),
    ],
    confirmaSenha: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ]),
    ],
  });

  mensagemErro = {
    email: [
      { tipo: 'required', aviso: 'Digite um e-mail!' },
      { tipo: 'email', aviso: 'Tem que ser um e-mail!' },
      { tipo: 'minlenght', aviso: 'No minimo 6 digitos!'},
    ],
    senha: [
      { tipo: 'required', aviso: 'Digite uma senha!' },
      { tipo: 'minlength', aviso: 'No mínimo 8 dígitos!' },
    ],
    nome: [
      { tipo: 'required', aviso: 'Digite um nome!' },
      { tipo: 'minlength', aviso: 'No mínimo 3 dígitos!' },
    ],
    cpf: [
      { tipo: 'required', aviso: 'Digite uma CPF!' },
      { tipo: 'minlength', aviso: 'No mínimo e máximo 11 dígitos!' },
      { tipo: 'maxlenght', aviso: 'um CPF tem 11 digitos'},
    ],
    confirmaSenha: [
      { tipo: 'required', aviso: 'Digite uma senha!' },
      { tipo: 'minlength', aviso: 'No mínimo 8 dígitos!' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private route: Router) {}

  get email() {
    return this.formRegistro.get('email');
  }

  get senha() {
    return this.formRegistro.get('senha');
  }

  get nome() {
    return this.formRegistro.get('nome');
  }

  get cpf() {
    return this.formRegistro.get('cpf');
  }

  get confirmaSenha() {
    return this.formRegistro.get('confirmaSenha');
  }


  ngOnInit() {}

  async salvar(){
    if(this.formRegistro.valid){
       this.usuario.nome = this.formRegistro.get('nome').value;
       this.usuario.email = this.formRegistro.get('email').value;
       this.usuario.cpf = this.formRegistro.get('cpf').value;
       this.usuario.senha = this.formRegistro.get('senha').value;

       const id = (await this.usuariosService.buscarID()) as number;
       this.usuario.id = id;

       this.usuariosService.salvar(this.usuario);

       console.log(this.usuario);

       alert('Sucesso!!');

       this.usuariosService.salvarID(id + 1);

       this.route.navigateByUrl('/login');

    }else{
      alert('Formulário Inválido!');
    }
  }
}
