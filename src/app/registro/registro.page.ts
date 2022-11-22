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

  formregistro = this.formBuilder.group({
    nome: [
      '',
      Validators.compose([Validators.required, Validators.minLength(3)]),
    ],
    email: [
      '', 
      Validators.compose([Validators.required, Validators.email,Validators.minLength(6)])],
    cpf: [
      '',
      Validators.compose([Validators.required, Validators.maxLength(11),Validators.minLength(11)]),
    ],
    senha: [
      '',
      Validators.compose([Validators.required,Validators.minLength(8)]),
    ],
    confirmaSenha: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });

  mensagemErro = {
    email: [
      { tipo: 'required', aviso: 'Digite um e-mail!' },
      { tipo: 'email', aviso: 'Tem que ser um e-mail!' },
    ],
    senha: [
      { tipo: 'required', aviso: 'Digite uma senha!' },
      { tipo: 'minlength', aviso: 'No mínimo 8 dígitos!' },
    ],
    nome: [
      { tipo: 'required', aviso: 'Digite uma senha!' },
      { tipo: 'minlength', aviso: 'No mínimo 3 dígitos!' },
    ],
    cpf: [
      { tipo: 'required', aviso: 'Digite uma senha!' },
      { tipo: 'minlength', aviso: 'No mínimo e máximo 11 dígitos!' },
    ],
    confirmeSenha: [
      { tipo: 'required', aviso: 'Digite uma senha!' },
      { tipo: 'minlength', aviso: 'No mínimo 8 dígitos!' },
    ],
  };

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private route: Router) {}
  
  get email() {
    return this.formregistro.get('email');
  }

  get senha() {
    return this.formregistro.get('senha');
  }

  get nome() {
    return this.formregistro.get('nome');
  }

  get cpf() {
    return this.formregistro.get('cpf');
  }

  get confirmaSenha() {
    return this.formregistro.get('confirmaSenha');
  }


  ngOnInit() {}

  async salvar(){
    if(this.formregistro.valid){
       this.usuario.nome = this.formregistro.get('nome').value;
       this.usuario.email = this.formregistro.get('email').value;
       this.usuario.cpf = this.formregistro.get('cpf').value;
       this.usuario.senha = this.formregistro.get('senha').value;

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
