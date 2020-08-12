import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions, API_LIVE } from '../models/api.model';
import {AdminLogin} from 'src/app/models/admin-login.model'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private http : HttpClient) { }

  login(AdminLogins : AdminLogin): Observable<AdminLogin>{
    return this.http.post<AdminLogin>(`${API_LIVE}` + '/admin/login' ,AdminLogins,httpOptions );
  }
}
