import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //esta dizendo que é nula
  private _storage: Storage | null = null;

  //cria a instancia do Storage //
  constructor(private storage: Storage) {
  // chama a função init, na hora que o serviço é iniciado
    this.init();
  }

  async init() {
    //Inicia o banco de Dados e Verifica se já existe ou não e o cria.
    const storage = await this.storage.create();
    this.storage = storage;
  }

  // metodo set guarda e get pega - pra guarda a gente precisa passar dois paramentos, aonde e o que?
  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  public get(key: string){
    return this.storage?.get(key);
  }

  async remove(key: string){
    await this.storage.remove(key);
  }
}

//any - qualquer
