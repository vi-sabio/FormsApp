import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {
  constructor(private route: Router) {}

  ngOnInit() {}

  mostrarProdutos() {
    this.route.navigateByUrl('/produtos');
  }
}
