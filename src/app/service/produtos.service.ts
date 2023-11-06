import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProdutos } from '../interfaces/produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
apiUrl = 'http://localhost:8081/api/produtos';

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

  constructor( private httpClient: HttpClient) { }

  buscarTodos():Observable<any> {
     return this.httpClient.get(`${this.apiUrl}`);
  }

  cadastrarProdutos(produto: Partial<IProdutos>){
    return this.httpClient.post(this.apiUrl, produto);
  }

  excluirProduto(id: Number){
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
  buscarProduto(id: string){
    return this.httpClient.get(`${this.apiUrl}/${id}`);
  }
}
