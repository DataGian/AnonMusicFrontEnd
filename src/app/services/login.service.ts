import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {}
  login(request: JwtRequest) {
    return this.http.post('https://anonmusic-3rgu.onrender.com/login', request);
  }
  verificar() {
    let token = sessionStorage.getItem('token');
    return token != null;
  }
  showRole() {
  if (isPlatformBrowser(this.platformId)) {
    const token = sessionStorage.getItem('token');
    if (!token) return null;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
  return null;
}

}