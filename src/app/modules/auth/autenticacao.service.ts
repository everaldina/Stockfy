import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { Usuario } from './models/usuario';
import { environment } from '../auth/environment.auth';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  usuario = new BehaviorSubject<Usuario>(new Usuario('', '', '', new Date()));

  constructor(private http: HttpClient) {}

  signupUser(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`;

    return this.http
      .post<AuthResponseData>(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          const expiracaoData = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const usuario = new Usuario(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );

          this.usuario.next(usuario);
          localStorage.setItem('userData', JSON.stringify(usuario));
        })
      );
  }

  loginUser(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;

    return this.http
      .post<AuthResponseData>(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((resData) => {
          const expiracaoData = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const usuario = new Usuario(
            resData.email,
            resData.localId,
            resData.idToken,
            expiracaoData
          );
          this.usuario.next(usuario);
          localStorage.setItem('userData', JSON.stringify(usuario));
        }),
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'Esse email não existe';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'A senha esta incorreta';
              break;
            case 'USER_DISABLED':
              errorMessage = 'Esse user foi desativado';
              break;
          }
          return throwError(errorMessage);
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') as string);

    if (!userData) {
      return;
    }

    const loadedUser = new Usuario(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.usuario.next(loadedUser);
    }
  }

  logout() {
    this.usuario.next(new Usuario('', '', '', new Date()));
    localStorage.removeItem('userData');
  }

  isLoggedIn() {
    return this.usuario.value.token != null;
  }
}
