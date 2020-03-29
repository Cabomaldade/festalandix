import { element } from 'protractor';
import { IColaborador } from './../servicos/colaborador';
import { DepartamentoService } from './../servicos/departamento.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColaboradorServiceService } from '../servicos/colaborador-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {

  departamentos = []; // guarda os departamentos vindos do back
  colaboradores: IColaborador[];
  departamentoSelecionado: string;
  idDepartamentoSelecionado: number;
  idColaboradorInserido: [];

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
    acompanhante: []
  });

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private colaboradorService: ColaboradorServiceService,
              private departamentoServico: DepartamentoService) {}

  // Aqui fica se observando dados alterados no servidor de backend
  ngOnInit() {
    this.carregarListas();
  }

  // Carrega as listas do BD
  carregarListas() {
    this.colaboradorService.getColaboradores()
    .subscribe(data => this.colaboradores = data);
    this.departamentoServico.getDepartamentos()
    .subscribe(data => this.departamentos = data);
  }

  // Classe para chamar o serviço de salvar no BD
  onSubmit() {

    const dadosFormulario = this.formColaborador.value;

    const dataColaborador = {
      col_name: dadosFormulario.nomeColaborador,
      col_email: dadosFormulario.emailColaborador,
      id_dep : this.idDepartamentoSelecionado
    };

    if (dadosFormulario.emailColaborador !== '' && dadosFormulario.emailColaborador != null) {
      this.colaboradorService.postColaborador(dataColaborador)
          .subscribe(res => {
            this.salvarAcompanhantes(res.body.id_col, dadosFormulario.acompanhante);
            this.formColaborador.reset();
            this.snackBar.open(`Cadastro Salvo com Sucesso`, 'Fechar', { duration: 3000});
          });
    }
  }

  salvarAcompanhantes(id: number, nomeAcompanhantes: string ) {
    let acompanhantes = [];

    if (nomeAcompanhantes !== '' && nomeAcompanhantes !== null) {
        acompanhantes = nomeAcompanhantes.split(',');

        for (const acompanhante of acompanhantes) {
          const tempData = {
            comp_name: acompanhante,
            id_col: id
          };
          this.colaboradorService.postAcompanhante(tempData)
            .subscribe();
        }
    } else {
      acompanhantes = null;
    }
  }

  // lógica exibição no select
  atribuiDepartamento(departamentoSelecionado: string, idDepartamentoSelecionado: number) {
    this.idDepartamentoSelecionado = idDepartamentoSelecionado;
    this.departamentoSelecionado = departamentoSelecionado;
  }

}
