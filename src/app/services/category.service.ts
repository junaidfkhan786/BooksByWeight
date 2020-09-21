import { API_LIVE, httpOptions } from './../models/api.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Category } from '../models/categories.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryload = new Subject<any>();
  getcategoryload() {
    return this.categoryload;
  }
  constructor(private _http : HttpClient) { }

  public  getCategory() {

    return this._http.get(`${API_LIVE}`+"/categories");


  }
  public  getCategoryById(_id) {
    return this._http.get(`${API_LIVE}`+"/book/categories/" + _id);
  }
  public  getSubCatById(_id) {
    return this._http.get(`${API_LIVE}`+"/book/subcategory/" + _id);
  }
  public postcategory(categories):Observable<any>{
    console.log(categories)
    return this._http.post<any>(`${API_LIVE}`+ "/categories/",categories,httpOptions)
    .pipe(
      tap(() => {
        this.categoryload.next();
      })
    );
  }

  public postsubcategory(subcategories):Observable<any>{
    return this._http.post<any>(`${API_LIVE}`+ "/subcategory/",subcategories,httpOptions)
    .pipe(
      tap(() => {
        this.categoryload.next();
      })
    );
  }
  
  public  getallsub() {
    return this._http.get(`${API_LIVE}`+"/subcategory");
  }
}
