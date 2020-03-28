import { IColaborador } from './../servicos/colaborador';
import { DepartamentoService } from './../servicos/departamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColaboradorServiceService } from '../servicos/colaborador-service.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {

  departamentos = []; // guarda os departamentos vindos do back
  colaboradores: IColaborador[];
  idsEmUtilizacao: number[];

  departamentoSelecionado: string;

  // Código para fazer a validação dos campos e vínculos com a view
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

  constructor(private fb: FormBuilder,
              private colaboradorService: ColaboradorServiceService,
              private departamentoServico: DepartamentoService) {}

  // Aqui fica se observando dados alterados no servidor de backend
  ngOnInit() {
    this.departamentoServico.getDepartamentos()
      .subscribe(data => this.departamentos = data);
    this.carregarLista();
  }

  /*filtra o Maior Id do Banco
  retornaMaiorId(): number {
    this.carregarLista();
    //return Math.max(...this.colaboradores.id_col.map(o => o), 0);
  }*/

  carregarLista() {
    this.colaboradorService.getColaboradores()
    .subscribe(data => this.colaboradores = data);
  }

  // Classe para chamar o serviço de salvar no BD
  onSubmit() {

  }

  atribuiDepartamento(departamentoSelecionado: string) {
    this.departamentoSelecionado = departamentoSelecionado;
  }
}
