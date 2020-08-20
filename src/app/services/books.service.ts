import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, API_LIVE } from '../models/api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private _http : HttpClient) { }
  public  getBooks():Observable<any> {

    return this._http.get<any[]>(`${API_LIVE}`+"/book");


  }

  public  getlatestBooks():Observable<any> {

    return this._http.get<any[]>(`${API_LIVE}`+"/book/latest");


  }
  public getDetailPackage(_id: number): Observable<any> {
    return this._http.get<any[]>(`${API_LIVE}`+"/book/"+ _id);
  }

  public  getPopularBooks():Observable<any> {

    return this._http.get<any[]>(`${API_LIVE}`+"/book/popular");


  }

  public getNewBooks():Observable<any>{
    return this._http.get<any[]>(`${API_LIVE}`+"/search/filter/new?sortBy=asc");
  }
  public getPreBooks():Observable<any>{
    return this._http.get<any[]>(`${API_LIVE}`+"/search/filter/preowned?sortBy=asc");
  }

}
