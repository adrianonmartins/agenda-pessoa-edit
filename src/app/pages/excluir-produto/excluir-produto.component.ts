import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/service/produtos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-excluir-produto',
  templateUrl: './excluir-produto.component.html',
  styleUrls: ['./excluir-produto.component.css']
})
export class ExcluirProdutoComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService
    ){}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.produtosService.excluirProduto(+id).subscribe({
          next: (response) => {
            console.log(response)
            Swal.fire('Confirmado', 'Produto excluido com sucesso', 'success');
            this.router.navigate(['/produtos']);
          },
          error: (error) => {
            console.log(error);
            Swal.fire('ALGO ESTÁ ERRADO', error, 'error');
          }
        });
      }
    }
}



