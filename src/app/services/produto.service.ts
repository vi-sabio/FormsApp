import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Produto } from '../models/Produto.model';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  listaProdutos: Produto[] = [];

  constructor(private StorageService: StorageService) {}

  async salvar(produto: Produto) {
    await this.buscarTodos();
    this.listaProdutos[produto.id] = produto;
    this.StorageService.set('produtos', this.listaProdutos);
  }

  async buscarTodos() {
    this.listaProdutos = (await this.StorageService.get(
      'produtos'
    )) as unknown as Produto[];

    if (!this.listaProdutos) {
      this.listaProdutos = [];
    }
    return this.listaProdutos;
  }

  async salvarId(Id: number) {
    await this.StorageService.set('IdProduto', Id);
  }

  async buscarId(){
    const id = await this.StorageService.get('IdProduto');

    if (!id) {
      return 0;
    }

    return id;
 }
}
