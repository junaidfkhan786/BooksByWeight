import { Injectable } from '@angular/core';
import { API_LIVE, httpOptions, API_URL } from '../models/api.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SaveSingleBookService {

  constructor(
    private http : HttpClient,
  ) { }

  public savesinglebook(book):Observable<any>{
    
    
   return this.http.post<any>(`${API_URL}` + '/book/singleBook/',book)
  


  }
}
