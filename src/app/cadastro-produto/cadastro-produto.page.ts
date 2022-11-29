import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produto } from '../models/Produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  produto: Produto = new Produto();

  formRegistroProduto = this.formBuilder.group({
    nome: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3)]),
    ],
    descricao: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10)
      ])
    ],
    valor: [
      '',
        Validators.required,
    ],
    validade: [
      '',
        Validators.required,
    ],
  });

  mensagemErro = {
    valor: [
      { tipo: 'required', aviso: 'Digite um valor' },
    ],
    validade: [
      { tipo: 'required', aviso: 'Coloque a validade' },
    ],
    nome: [
      { tipo: 'required', aviso: 'Digite um nome!' },
      { tipo: 'minlength', aviso: 'No mínimo 3 dígitos!' },
    ],
    descricao: [
      { tipo: 'required', aviso: 'Digite uma descrição' },
      { tipo: 'minlength', aviso: 'No mínimo e máximo 11 dígitos!' },
      
    ],
  };

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private route: Router) {}

  get nome() {
    return this.formRegistroProduto.get('nome');
  }

  get validade() {
    return this.formRegistroProduto.get('validade');
  }

  get descricao() {
    return this.formRegistroProduto.get('descricao');
  }

  get valor() {
    return this.formRegistroProduto.get('valor');
  }



  ngOnInit() {}

  async salvar(){
    if(this.formRegistroProduto.valid){
       this.produto.nome = this.nome.value;
       this.produto.validade = this.validade.value;
       this.produto.valor = this.valor.value;
       this.produto.descricao = this.descricao.value;
      
       const id = (await this.produtoService.buscarId()) as number;
       this.produto.id = id;

       this.produtoService.salvar(this.produto);

       console.log(this.produto);

       alert('Sucesso!!');

       this.produtoService.salvarId(id + 1);

       this.route.navigateByUrl('/produto');

    }else{
      alert('Formulário Inválido!');
    }
  }
}

