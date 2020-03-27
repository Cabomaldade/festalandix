import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IColaborador } from './colaborador';

import { catchError, map } from 'rxjs/operators';

// const api = 'https://tecnodix.herokuapp.com/swagger/';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorServiceService {

  // Virá do EndPoint - Por enquanto está Local
  private url = '/assets/data/colaboradores.json';

  constructor(private http: HttpClient) { }

  // Retorna a lista de todos colaboradores no servidor - api + 'collaborator'
  getColaboradores(): Observable<IColaborador[]> {
    return this.http.get<IColaborador[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error.message);
  }
}
