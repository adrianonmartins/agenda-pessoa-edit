import { Component, Input } from '@angular/core';

@Component({
  selector: 'treinamento-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() nome: string = 'Digite seu nome';

  ngOnInit() {
    if (this.nome === 'Rafael') {
      console.log('to com fome');
    }
  }

  cadastroValido(): boolean {
    return this.nome === 'Ativado';
  }

}
