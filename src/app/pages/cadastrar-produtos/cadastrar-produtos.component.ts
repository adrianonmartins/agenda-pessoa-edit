import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/service/produtos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css'],
})

export class CadastrarProdutosComponent implements OnInit {

  produtoForm: Object|any;

  constructor(private produtosService: ProdutosService, private router: Router) {}

  ngOnInit(): void {
    this.produtoForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      codigoBarras: new FormControl('', Validators.required)
    });
  }



  enviar() {

    const nomeControl = this.produtoForm.get('nome');
    const codigoBarrasControl = this.produtoForm.get('codigoBarras');
    const precoControl = this.produtoForm.get('preco');

    if (codigoBarrasControl && precoControl) {
      const produto: Partial<IProdutos> = {
        nome: nomeControl.value ? nomeControl.value : undefined,
        codigoBarras: codigoBarrasControl.value ? +codigoBarrasControl.value : undefined,
        preco: precoControl.value ? +precoControl.value : undefined
      };

      console.log(produto);


      this.produtosService.cadastrarProdutos(produto).subscribe(
        (result) => {
          Swal.fire('Confirmado', 'Produto cadastrado com sucesso', 'success');
          this.router.navigate(['/produtos']);
          console.log(result);
        },
        (error) => {
          const { message } = error;
          console.error(error);
          Swal.fire('ALGO ESTÁ ERRADO', message, 'error');
        }
      );
    } else {
      Swal.fire('ALGO ESTÁ ERRADO', 'error');
    }
  }

}
