import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ListaconvidadosDataSource, ListaconvidadosItem } from './listaconvidados-datasource';

@Component({
  selector: 'app-listaconvidados',
  templateUrl: './listaconvidados.component.html',
  styleUrls: ['./listaconvidados.component.css']
})
export class ListaconvidadosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ListaconvidadosItem>;
  dataSource: ListaconvidadosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'email', 'editar', 'excluir'];

  ngOnInit() {
    this.dataSource = new ListaconvidadosDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
