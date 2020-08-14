import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_LIVE } from '../models/api.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

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
}
