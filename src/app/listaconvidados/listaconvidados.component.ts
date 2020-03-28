import { IColaborador } from './../servicos/colaborador';
import { Component, OnInit } from '@angular/core';
import { ColaboradorServiceService } from '../servicos/colaborador-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';

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

  email: string; // logica modal popup

  displayedColumns: string[] = ['colaborador', 'acompanhantes', 'edicaoexclusao'];

  ngOnInit(): void {
    this.colaboradorService.getColaboradores()
      .subscribe(data => this.colaboradores = data);
  }

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
      duration: 5000
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.excluirColaboradorBD(this.exclusaoColaborador);
      this.exclusaoColaborador = true;
    });

    snackBarRef.onAction().subscribe(() => {
      this.exclusaoColaborador = false;
    });
  }

  // logica exclusao
  excluirColaboradorBD(validaExclusao: boolean) {
    if (validaExclusao) {
      console.log('é se ferrou!!!');
    } else {
      console.log('aí garoto se safou');
    }
  }
}
