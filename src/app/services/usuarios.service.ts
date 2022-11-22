import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  listaUsuarios: Usuario[] = [];

  constructor(private storageService: StorageService) { }

  async login(email: string, senha: string) {
    this.buscarTodos();
    let usuario: Usuario;
    this.listaUsuarios.filter((item => {
      if (item.email.toLocaleLowerCase() == email.toLocaleLowerCase()) {
        usuario = item;
      }
    });

    if (usuario?.senha === senha) {
      return usuario;
    }
    return null;
  }
  

  // crud - create, read, update, delete
  // recebe um usuario para salvar
  async salvar(usuario: Usuario){
    this.buscarTodos();
    this.listaUsuarios[usuario.id] = usuario;
    this.storageService.set('usuario', this.listaUsuarios);
  
  }
  async buscarUm(id: number){
    this.buscarTodos();
    return this.listaUsuarios[id];
  }
  async buscarTodos(){
    this.listaUsuarios = (await this.storageService.get('usuarios')) as unknown as Usuario[];
    if(!this.listaUsuarios) {
      return [];   // return mata 
    }
    return this.listaUsuarios;
  }
  async deletar(id: number){
    this.buscarTodos();
    this.listaUsuarios.splice(id, 1);           // splice pega a posição e deleta apatir de uma posição e quantidade 
    this.storageService.set('usuarios', this.listaUsuarios);
  }

  async salvarID(id: number){
    await this.storageService.set('idUsuario', id);
  }
  async buscarID(){
    const id = await this.storageService.get('idUsuario');

    if(!id) {
      return 0;
    }

    return id;
  }
}
