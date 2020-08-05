import { httpOptions, API_URL } from './../models/api.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_LIVE,  } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
 
  constructor(private http: HttpClient) { }
  
 


public getwish():Observable<any>{
   

    const httpOptionsauth = {
     
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
 
     })
   }
   
 if(localStorage.getItem('User')!=null){
  return this.http.get<any[]>(`${API_LIVE}`+"/wishlist/ByUser",httpOptionsauth);
 }

 

}
public postProduct(bookId ){
   

  const httpOptionsauth = {
   
   headers: new HttpHeaders({
     'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)

   })
 }

return this.http.post(`${API_LIVE}`+"/wishlist/" +bookId,localStorage.getItem('User').slice(1,-1),httpOptionsauth);

}

public deleteProduct(WishlistId ){
   

  const httpOptionsauth = {
   
   headers: new HttpHeaders({
     'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)

   })
 }
const token = localStorage.getItem('User').slice(1,-1);
return this.http.delete(`${API_LIVE}`+"/wishlist/" +WishlistId,httpOptionsauth);

}

}
