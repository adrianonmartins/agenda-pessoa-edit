import { Component, OnInit } from '@angular/core';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/service/produtos.service';


@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css'],
})
export class ProdutosComponent implements OnInit{
    produtos!: IProdutos[];

  constructor
  (public listProdutos: ProdutosService) {}

  ngOnInit(): void{
    this.getProdutos();
  }

  getProdutos() {
    const requestGet = this.listProdutos.buscarTodos();

    requestGet.subscribe({
      next: (response) => {
        this.produtos = response;
        console.log(this.produtos);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
