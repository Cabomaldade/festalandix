import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent {

  areas: string[] = ['Gestão', 'Serviço ao Cliente', 'Infraestrutura', 'Desenvolvimento', 'Financeiro', 'Diretoria'];

  areaSelecionada: string;

  formColaborador = this.fb.group({
    nomeColaborador: [
      null, [
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'),
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]
    ],
    emailColaborador: [null, [
        Validators.required,
        Validators.email
      ]
    ],
    areaColaborador: [null, Validators.required],
    acompanhante: [
      null, [
        Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$'),
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ]
    ]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.formColaborador.get('nomeColaborador').value);
    console.log(this.formColaborador.get('emailColaborador').value);
    console.log(this.areaSelecionada);
    console.log(this.formColaborador.get('acompanhante').value);
  }

  atribuiArea(selecaoArea: string) {
    this.areaSelecionada = selecaoArea;
  }
}
