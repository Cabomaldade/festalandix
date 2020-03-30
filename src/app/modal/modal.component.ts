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

  acompanhantes = [];

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

    console.log(JSON.stringify(this.data.companions));

    const estrutura = {
      id_col: this.data.id_col,
      col_name: this.data.col_name,
      col_email: this.data.col_email,
      id_dep: idDep
    };

    this.colaboradorServico.putColaborador(estrutura)
        .subscribe(res => {
          console.log(res);
          this.excluirAcompanhantes(this.data.id_col);
          this.salvarAcompanhantes(this.data.id_col, this.data.companions);
        });
  }

  alterarDadosAcompanhantes() {
    console.log('TODO');
  }

  salvarAcompanhantes(id: number, nomeAcompanhantes: string[] ) {
    console.log(nomeAcompanhantes);

    let acompanhantes = [];
    if (nomeAcompanhantes !== null) {
        for (const acompanhante of nomeAcompanhantes) {
          const tempData = {
            comp_name: acompanhante.replace(',', ''),
            id_col: id
          };
          this.colaboradorServico.postAcompanhante(tempData)
            .subscribe();
        }
    } else {
      acompanhantes = null;
    }
  }

  excluirAcompanhantes(id: number) {
    this.colaboradorServico.getAcompanhantes(id).subscribe(res => {
      this.acompanhantes = res;

      console.log(this.acompanhantes);
      for (const temp of this.acompanhantes) {
        console.log(temp.id_comp);
        this.colaboradorServico.excluiAcompanhante(temp.id_comp)
          .subscribe();
      }
    });
  }
}
