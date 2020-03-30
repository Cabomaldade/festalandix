import { IAcompanhantes } from './../servicos/colaborador-service.service';
import { DepartamentoService } from './../servicos/departamento.service';
import { IColaborador } from './../servicos/colaborador';
import { Component, OnInit } from '@angular/core';
import { ColaboradorServiceService } from '../servicos/colaborador-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import * as jsPDF from './../../../node_modules/jspdf';
import 'jspdf-autotable';
import { IDepartamento } from '../servicos/departamento';

@Component({
  selector: 'app-listaconvidados',
  templateUrl: './listaconvidados.component.html',
  styleUrls: ['./listaconvidados.component.css']
})
export class ListaconvidadosComponent implements OnInit {

  constructor(private colaboradorService: ColaboradorServiceService,
              private departamentosService: DepartamentoService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  colaboradores: IColaborador[];

  acompanhantes: IAcompanhantes[];

  departamentos: IDepartamento[];

  exclusaoColaborador = true; // logica exclusao

  displayedColumns: string[] = ['colaborador', 'acompanhantes', 'edicaoexclusao'];

  ngOnInit(): void {
    this.carregarListas();
  }

  carregarListas() {
    // Carrega dados colaborador
    this.colaboradorService.getColaboradores().subscribe(data => this.colaboradores = data);
    // Carrega dados departamentos
    this.departamentosService.getDepartamentos().subscribe(data => this.departamentos = data);
  }

  buscarAcompanhantes(id: number) {
    this.colaboradorService.getAcompanhantes(id)
        .subscribe(res => this.acompanhantes = res);
  }

  // logica modal dialogo edição
  editarColaborador(data) {
    console.log(data);
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        id_col: data.id_col,
        id_dep_id: data.id_dep_id,
        col_name: data.col_name,
        col_email: data.col_email,
        companions: data.companions
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  // logica exclusao Colaborador
  excluirColaborador(element) {
    const snackBarRef = this.snackBar.open(`Cadastro ${element.col_name} Excluído`, 'DESFAZER', {
      duration: 3000
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.excluirColaboradorBD(this.exclusaoColaborador, element.id_col);
      this.exclusaoColaborador = true;
    });

    snackBarRef.onAction().subscribe(() => {
      this.exclusaoColaborador = false;
    });
  }

  // logica exclusao
  excluirColaboradorBD(validaExclusao: boolean, id: number) {
    if (validaExclusao) {
      this.colaboradorService.deleteColaborador(id)
        .subscribe( () => this.carregarListas());
    }
  }

  // salvar lista em PDF
  // O Warning no console quando se sobe a aplicação não pode ser corrido, pois é da api de terceiro
  gerarPDF() {
    const doc = new jsPDF();
    doc.autoTable({
      html: '#my-table',
      columns: [
        { header: 'Nome do Colaborador', dataKey: 'colaborador' },
        { header: 'Nome dos Acompanhantes', dataKey: 'acompanhante' },
      ]
    });
    doc.save('listaconvidados.pdf');
  }
}
