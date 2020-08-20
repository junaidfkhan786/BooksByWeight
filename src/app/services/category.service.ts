import { API_LIVE } from './../models/api.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http : HttpClient) { }

  public  getCategory() {

    return this._http.get(`${API_LIVE}`+"/categories");


  }
  public  getCategoryById(_id) {
    return this._http.get(`${API_LIVE}`+"/book/categories/" + _id);
  }

}
