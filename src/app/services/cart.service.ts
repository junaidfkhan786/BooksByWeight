import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { API_LIVE, API_URL } from '../models/api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http : HttpClient) { }

  public getCart():Observable<any>{
   

    const httpOptionsauth = {
     
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)
 
     })
   }
   
   if(localStorage.getItem('User') != null){

 return this.http.get<any[]>(`${API_LIVE}`+"/cart/User",httpOptionsauth);
   }
}
public postProduct(_id  , selling_price ){
   

  const httpOptionsauth = {
   
   headers: new HttpHeaders({
     'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)

   })
 }

return this.http.post(`${API_LIVE}`+"/cart/"+_id +"?quantity=1"+"&price="+selling_price,localStorage.getItem('User').slice(1,-1),httpOptionsauth);

}

public deleteProduct(_id ){
   

  const httpOptionsauth = {
   
   headers: new HttpHeaders({
     'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)

   })
 }
const token = localStorage.getItem('User').slice(1,-1);
return this.http.delete(`${API_LIVE}`+"/cart/" +_id,httpOptionsauth);

}

public updateqty(countervalue,_id,selling_price ){
   

  const httpOptionsauth = {
   
   headers: new HttpHeaders({
     'Authorization': 'Bearer ' + localStorage.getItem('User').slice(1,-1)

   })
 }
 if(localStorage.getItem('User') != null){
return this.http.put(`${API_LIVE}`+"/cart/update/quantity?quantity="+countervalue+"&bookId="+_id+"&price="+selling_price,localStorage.getItem('User').slice(1,-1),httpOptionsauth);
 }
}
}
