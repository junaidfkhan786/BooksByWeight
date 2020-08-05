import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpOptions, API_LIVE } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private _http: HttpClient)  { }
  public priceDefine(modal) {
    return this._http.get(`${API_LIVE}` + '/filter/sort/' + modal );
  }

  public sortBy(variant){
    return this._http.get(`${API_LIVE}`+ '/filter/price?sortBy='+ variant);
  }
}
