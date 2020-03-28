import { IColaborador } from './../servicos/colaborador';
import { Component, OnInit } from '@angular/core';
import { ColaboradorServiceService } from '../servicos/colaborador-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import * as jsPDF from './../../../node_modules/jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-listaconvidados',
  templateUrl: './listaconvidados.component.html',
  styleUrls: ['./listaconvidados.component.css']
})
export class ListaconvidadosComponent implements OnInit {

  constructor(private colaboradorService: ColaboradorServiceService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  colaboradores: IColaborador[];

  exclusaoColaborador = true; // logica exclusao

  displayedColumns: string[] = ['colaborador', 'acompanhantes', 'edicaoexclusao'];

  ngOnInit(): void {
    this.carregarLista();
  }

  carregarLista() {
    this.colaboradorService.getColaboradores()
    .subscribe(data => this.colaboradores = data);
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

  // logica exclusao
  excluirColaborador(element) {
    console.log(element);
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
        .subscribe( () => this.carregarLista());
      this.carregarLista();
    }
  }

  // salvar lista em PDF
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
