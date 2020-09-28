import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_LIVE, httpOptions } from '../models/api.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userrefresh = new Subject<any>();
  getrefresuser() {
    return this.userrefresh;
  }
  constructor(
    private _http : HttpClient
    ) { }

  public  getUsers(page):Observable<any> {

    return this._http.get<any[]>(`${API_LIVE}`+"/user?page="+page);


  }
  public  block(id):Observable<any> {

    return this._http.put<any>(`${API_LIVE}`+"/user/block/"+id,httpOptions).pipe(
      tap(() => {
        this.userrefresh.next();
      })
    );


  }
  public  unblock(id):Observable<any> {

    return this._http.put<any>(`${API_LIVE}`+"/user/unblock/"+id,httpOptions).pipe(
      tap(() => {
        this.userrefresh.next();
      })
    );


  }

}
