import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IColaborador } from './colaborador';
import { catchError } from 'rxjs/operators';

export interface IAcompanhantes {
  id_comp: number;
  id_col_id: number;
  comp_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradorServiceService {

  api = 'https://tecnodix.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  private httpOptions: { headers; observe; } = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    }),
    observe: 'response'
  };

  // Retorna a lista de todos colaboradores no servidor - api + 'collaborator'
  getColaboradores(): Observable<IColaborador[]> {
    const url = `${this.api}collaborator/`;
    return this.http.get<IColaborador[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Retorna a lista de todos colaboradores no servidor - api + 'collaborator'
  getIdColaborador(): Observable<IColaborador[]> {
    const url = `${this.api}collaborator/`;
    return this.http.get<IColaborador[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Retornar os acompanhantes de um certo Id de colaborador
  getAcompanhantes(id: number): Observable<IAcompanhantes[]> {
    const url = `${this.api}companion/${id}`;
    return this.http.get<IAcompanhantes[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }

  // Exclui Colaborardor
  deleteColaborador(id: number) {
    const url = `${this.api}collaborator/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Salvar Colaborador no Back/Banco
  postColaborador(data: any): Observable<any> {
    console.log('entrou no post Colaborador');
    const url = `${this.api}collaborator/`;
    return this.http.post<any>(url, data , this.httpOptions);
  }

  // Salvar Acompanhantes no Back/Banco
  postAcompanhante(data: any): Observable<any> {
    console.log('entrou no post acompanhante');
    const url = `${this.api}companion/`;
    return this.http.post<any>(url, data , this.httpOptions);
  }

  // Alterar dados Colaborador
  putColaborador(data: any): Observable<any> {
    console.log('entrou no put');
    const url = `${this.api}collaborator/`;
    return this.http.put<any>(url, data , this.httpOptions);
  }

  // Alterar dados Acompanhante
  putAcompanhante(data: any): Observable<any> {
    console.log('entrou no put2');
    const url = `${this.api}companion/`;
    return this.http.put<any>(url, data , this.httpOptions);
  }

  excluiAcompanhante(id: any): Observable<any> {
    const url = `${this.api}companion/${id}`;
    return this.http.delete(url);
  }
}

