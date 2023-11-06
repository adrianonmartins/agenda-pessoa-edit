import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarProdutosComponent } from './pages/cadastrar-produtos/cadastrar-produtos.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { ExcluirProdutoComponent } from './pages/excluir-produto/excluir-produto.component';
import { EditarProdutoComponent } from './pages/editar-produto/editar-produto.component';

const routes: Routes = [
  {
      path: '', component: HomeComponent
  },
  {
    path: 'produtos', component: ProdutosComponent
  },
  {
    path: 'produtos/cadastrar', component: CadastrarProdutosComponent
  },
  {
    path: 'produtos/excluir/:id', component: ExcluirProdutoComponent
  },
  {
    path: 'produtos/editar/:id', component: EditarProdutoComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
