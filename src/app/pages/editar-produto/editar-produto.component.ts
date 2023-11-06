import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProdutos } from 'src/app/interfaces/produtos';
import { ProdutosService } from 'src/app/service/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent {
  produtoForm: FormGroup = new FormGroup({
    nome: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required),
    preco: new FormControl('', Validators.required),
    codigoBarras: new FormControl('', Validators.required)
  });

  protected produtoId: string = '';

  protected produto: IProdutos|any = {
    id: 0,
    codigoBarras: 0,
    nome: '',
    preco: 0
  };

  protected nome: string = '';
  protected codigoBarras: string = '';
  protected preco: string = '';

  constructor(
    private produtosService: ProdutosService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.route.url.forEach( value => {
      this.produtoId = value[2].path;
    })

    this.buscarProduto();

  }

  ngOnInit(): void {

    this.produtoForm = new FormGroup({
      id: new FormControl(this.produtoId, Validators.required),
      nome: new FormControl(this.nome, Validators.required),
      codigoBarras: new FormControl(this.codigoBarras, Validators.required),
      preco: new FormControl(this.preco, Validators.required)
    });


  }

  buscarProduto(): void {
    this.produtosService.buscarProduto(this.produtoId).subscribe({
      next: (res) => {
        this.produto = res;

        this.nome = this.produto.nome;
        this.codigoBarras = this.produto.codigoBarras;
        this.preco = this.produto.preco;

      },
      error: (err) => {
        const { message } = err;
        console.error(err)
        Swal.fire('ALGO ESTÁ ERRADO', message, 'error');
      }
    });
  }

  salvar(){
    const idControl = this.produtoForm.get('id');
    const nomeControl = this.produtoForm.get('nome');
    const codigoBarrasControl = this.produtoForm.get('codigoBarras');
    const precoControl = this.produtoForm.get('preco');

    if (codigoBarrasControl && precoControl) {
      const produto: Partial<IProdutos> = {
        nome: nomeControl?.value ? nomeControl?.value : undefined,
        codigoBarras: codigoBarrasControl.value ? +codigoBarrasControl.value : undefined,
        preco: precoControl.value ? +precoControl.value : undefined
      };

      console.log(produto);

      this.produtosService.cadastrarProdutos(produto).subscribe(
        (result) => {
          Swal.fire('Confirmado', 'Produto editado com sucesso', 'success');
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
