import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_LIVE } from '../models/api.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map, toArray, filter, delay, tap } from 'rxjs/operators';
import { UserAcc } from '../models/useracc.model';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

  private useraccrefresh = new Subject<any>();
  getrefresuseracc() {
    return this.useraccrefresh;
  }
  constructor(private http: HttpClient) { }

  
  public getuser():Observable<any>{
    
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
      })
    }
  return this.http.get<any>(`${API_LIVE}`+"/user/ById",httpOptionsauth);
  }
  public edituser(user:UserAcc):Observable<any>{
    
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
      })
    }
  return this.http.patch<any>(`${API_LIVE}`+"/user/",user,httpOptionsauth).pipe(
    tap(() => {
      this.useraccrefresh.next();
    })
  );
  }
}
