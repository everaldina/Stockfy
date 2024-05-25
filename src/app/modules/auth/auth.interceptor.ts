import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AutenticacaoService } from './autenticacao.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authServico: AutenticacaoService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authServico.usuario.pipe(
      take(1),
      exhaustMap(usuario => {
        if(!usuario){
          return next.handle(request);
        }
        const requestModificado = request.clone({
          params: new HttpParams().set('auth', usuario.token!)
        });
        return next.handle(requestModificado);
      }
      ),
    );
  }
}