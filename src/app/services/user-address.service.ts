import { useradd } from './../models/useraddress.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_LIVE } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {



  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  private userrefresh = new Subject<any>();
  getrefresuser() {
    return this.userrefresh;
  }
  public getaddress(): Observable<any> {



    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    return this.http.get<any>(`${API_LIVE}` + "/userAdd/get-addresses", httpOptionsauth);
  }

  public editaddress() {


    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    if (localStorage.getItem('User') != null) {
      return this.http.put(`${API_LIVE}` + "/userAdd/address/" + localStorage.getItem('User').slice(1, -1), httpOptionsauth);
    }
  }
  public postadd(add: useradd): Observable<any> {
    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    if (localStorage.getItem('User') != null) {
      return this.http.post<useradd>(`${API_LIVE}` + "/userAdd/new-address", add, httpOptionsauth).pipe(
        tap(() => {
          this.userrefresh.next();
        })
      );
    }
  }

  public editadd(id, add: useradd): Observable<any> {


    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    if (localStorage.getItem('User') != null) {
      return this.http.put(`${API_LIVE}` + "/userAdd/address/" + id, add, httpOptionsauth);
    }
  }

  public deladd(): Observable<any> {


    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    if (localStorage.getItem('User') != null) {
      return this.http.delete(`${API_LIVE}` + "/userAdd/address", httpOptionsauth).pipe(
        tap(() => {
          this.userrefresh.next();
        })
      );;
    }
  }

}
