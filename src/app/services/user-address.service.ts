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
  unsubscribe() {
    throw new Error("Method not implemented.");
  }



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

  public editaddress(id, editadd: useradd) {


    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    if (localStorage.getItem('User') != null) {
      return this.http.post(`${API_LIVE}` + "/userAdd/new-address?add="+id,editadd, httpOptionsauth).pipe(
        tap(() => {
          this.userrefresh.next();
        })
      );
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

  public deladd(id): Observable<any> {


    const httpOptionsauth = {

      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1, -1)

      })
    }
    if (localStorage.getItem('User') != null) {
      return this.http.delete(`${API_LIVE}` + "/userAdd/address/"+id, httpOptionsauth).pipe(
        tap(() => {
          this.userrefresh.next();
        })
      );;
    }
  }

}
