import { API_LIVE } from './../models/api.model';
import { Login } from './../models/login.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL, httpOptions } from '../models/api.model';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }

  login(Login : Login): Observable<Login>{
    return this.http.post<Login>(`${API_LIVE}` + '/user/login' ,Login,httpOptions );
  }

  loginGoogle(googleId,name,email){
    return this.http.post(`${API_LIVE}` + '/user/loginGoogle/?googleId=' + googleId + '&name=' + name + '&email=' + email,httpOptions );
  }
  loginFacebook(facebookId,name,email){
    return this.http.post(`${API_LIVE}` + '/user/loginFacebook/?facebookId=' + facebookId + '&name=' + name + '&email=' + email,httpOptions );
  }
}
