import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';
import { Lote } from '../models/lote';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  endpoint = 'https://stockify-5c8ba-default-rtdb.firebaseio.com';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  // Metodos para produtos
  getProdutos() {
    return this.http
      .get<Produto[]>(this.endpoint + '/produtos.json')
      .pipe(retry(2), catchError(this.handleError));
  }

  getProduto(id: string) {
    return this.http
      .get<Produto>(this.endpoint + `/produtos/${id}.json`)
      .pipe(retry(2), catchError(this.handleError));
  }

  addProduto(produto: Produto) {
    return this.http
      .post(this.endpoint + '/produtos.json', produto)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateProduto(produto: Produto) {
    return this.http
      .put<Produto>(
        this.endpoint + `/produtos/${produto.id}.json`,
        produto,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError))
      .subscribe();
  }

  deleteProduto(id: string) {
    return this.http
      .delete<Produto>(this.endpoint + `/produtos/${id}.json`)
      .pipe(retry(2), catchError(this.handleError))
      .subscribe();
  }

  // Metodos para lotes
  getLotes(id_produto: string): Observable<Lote[]> {
    return this.http
      .get<Lote[]>(this.endpoint + `/produtos/${id_produto}/lotes.json`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getLote(id_produto: string, id_lote: string): Observable<Lote> {
    return this.http
      .get<Lote>(
        this.endpoint + `/produtos/${id_produto}/lotes/${id_lote}.json`
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  addLote(id_produto: string, lote: Lote) {
    return this.http
      .post<Lote>(this.endpoint + `/produtos/${id_produto}/lotes.json`, lote)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateLote(id_produto: string, lote: Lote) {
    return this.http
      .put<Lote>(
        this.endpoint + `/produtos/${id_produto}/lotes/${lote.id}.json`,
        lote,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError))
      .subscribe();
  }

  deleteLote(id_produto: string, id_lote: string) {
    return this.http
      .delete<Lote>(
        this.endpoint + `/produtos/${id_produto}/lotes/${id_lote}.json`
      )
      .pipe(retry(2), catchError(this.handleError))
      .subscribe();
  }

  // metodo para checar erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }

    return throwError(() => new Error('errorMessage'));
  }
}
