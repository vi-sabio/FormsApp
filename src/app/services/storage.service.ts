import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //esta dizendo que é nula 
  private _storage: Storage | null = null;

  //cria a instancia para que podemos trabalhar com ionic 
  constructor(private storage: Storage) {
  // chama a função init, na hora que o serviço é iniciado
    this.init();
  }

  async init() {
    // a função init inicializa e chama a função init e cria a storage, caso ja criado so inicia 
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // metodo set guarda e get pega - pra guarda a gente precisa passar dois paramentos, aonde e o que?
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string){
    return this._storage?.get(key);
  }

  async remove(key: string){
    await this._storage.remove(key);
  }
}

//any - qualquer 