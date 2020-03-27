import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'festalandix';

  senha = '12345';

  validou = false;

  validaSenha(senha: string) {
    if (this.senha === senha) {
      this.validou = true;
    } else {
      console.log('Senha inválida!');
    }
  }

  checarValidacao(): boolean {
    return this.validou;
  }
}
