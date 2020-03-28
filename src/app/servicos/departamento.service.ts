import { IDepartamento } from './departamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const api = 'https://tecnodix.herokuapp.com/api/';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  // Virá do EndPoint - Por enquanto está Local
  private url = '/assets/data/departamentos.json';

  constructor(private http: HttpClient) { }

  // Retorna a lista de todos departamentos no servidor - api + 'departamentos'
  getDepartamentos(): Observable<IDepartamento[]> {
    return this.http.get<IDepartamento[]>(api + 'departament/')
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
