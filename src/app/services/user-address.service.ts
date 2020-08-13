import { useradd } from './../models/useraddress.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_LIVE } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  public getaddress():Observable<any>{
    
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
      })
    }
  return this.http.get<any>(`${API_LIVE}`+"/userAdd/get-addresses",httpOptionsauth); 
  }

  public editaddress(){
   

    const httpOptionsauth = {
     
     headers: new HttpHeaders({
        'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
     })
   }
   if(localStorage.getItem('User') != null){
  return this.http.put(`${API_LIVE}`+"/userAdd/address/"+localStorage.getItem('User').slice(1,-1),httpOptionsauth);
   }
  }
  public postadd(add : useradd):Observable<any>{
    const httpOptionsauth = {
     
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
      })
    }
   if(localStorage.getItem('User') != null){
  return this.http.post<useradd>(`${API_LIVE}`+"/userAdd/new-address",add,httpOptionsauth);
   }
  }

  public editadd(id, add:useradd):Observable<any>{
   

    const httpOptionsauth = {
     
     headers: new HttpHeaders({
       'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
  
     })
   }
   if(localStorage.getItem('User') != null){
  return this.http.put(`${API_LIVE}`+"/userAdd/address/"+id,add,httpOptionsauth);
   }
  }

}
