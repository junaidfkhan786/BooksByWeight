import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { httpOptions, API_LIVE } from '../models/api.model';
import {AdminLogin} from 'src/app/models/admin-login.model'
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {
  private adminload = new Subject<any>();
  getadminload() {
    return this.adminload;
  }
  constructor(private http : HttpClient) { }

  login(AdminLogins : AdminLogin): Observable<any>{
    return this.http.post<any>(`${API_LIVE}` + '/admin/login' ,AdminLogins,httpOptions );
  }
  register(register): Observable<any>{
    return this.http.post<any>(`${API_LIVE}` + '/admin/signup' ,register,httpOptions ).pipe(
      tap(() => {
        this.adminload.next();
      })
    );

  }
  getadmin(): Observable<any>{
    return this.http.get<any>(`${API_LIVE}` + '/admin/getall',httpOptions );
  } 
  delete(id): Observable<any>{
    console.log(id)
    return this.http.delete<any>(`${API_LIVE}` + '/admin/'+ id,httpOptions ).pipe(
      tap(() => {
        this.adminload.next();
      })
    );

  }
}
