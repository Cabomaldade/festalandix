import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IColaborador, IIds } from './colaborador';

import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorServiceService {

  api = 'https://tecnodix.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  // Retorna a lista de todos colaboradores no servidor - api + 'collaborator'
  getColaboradores(): Observable<IColaborador[]> {
    const url = `${this.api}collaborator/`;
    return this.http.get<IColaborador[]>(url)
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
}
