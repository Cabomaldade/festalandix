import { DepartamentoService } from './../servicos/departamento.service';
import { IColaborador } from './../servicos/colaborador';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ColaboradorServiceService } from '../servicos/colaborador-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  departamentos = [];

  flag = false;

  areaSelecionada;

  constructor(
    private departamentoServico: DepartamentoService,
    private colaboradorServico: ColaboradorServiceService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IColaborador) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.departamentoServico.getDepartamentos()
      .subscribe(data => this.departamentos = data);
    console.log(this.data);
  }

  atribuiDepartamento(selecaoArea: string) {
    this.areaSelecionada = selecaoArea;
    this.flag = true;
  }

  alterarDados() {
    let idDep: number;

    if (this.flag) {
      idDep = this.areaSelecionada.id_dep;
    } else {
      idDep = this.data.id_dep_id;
    }

    const estrutura = {
      id_col: this.data.id_col,
      col_name: this.data.col_name,
      col_email: this.data.col_email,
      id_dep: idDep
    };

    this.colaboradorServico.putColaborador(estrutura)
        .subscribe(res => {
          console.log(res);
        });
  }
}
