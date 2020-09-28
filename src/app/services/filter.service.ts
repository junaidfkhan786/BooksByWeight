import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { httpOptions, API_LIVE } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private _http: HttpClient)  { }
  public priceDefine(modal,page):Observable<any> {
    console.log(modal,page)
    return this._http.get<any>(`${API_LIVE}` + '/filter/sort/' + modal+'?page='+page );
  }

  public sortBy(variant,page):Observable<any>{
    console.log(variant,page)
    return this._http.get<any>(`${API_LIVE}`+ '/filter/price?sortBy='+ variant+'&page='+page );
  }
  public priceDefinenew(modal,page):Observable<any> {
    console.log(modal,page)
    return this._http.get<any>(`${API_LIVE}` + '/search/priceDefined/'+modal+"?condition=new"+'&page='+page );
  }
  public sortBynew(variant,page):Observable<any>{
    console.log(variant,page)
    return this._http.get<any>(`${API_LIVE}`+ '/search/filter/new?sortBy='+variant+'&page='+page);
  }
  public priceDefinepre(modal,page):Observable<any> {
    console.log(modal,page)
    return this._http.get<any>(`${API_LIVE}` + '/search/priceDefined/'+modal+"?condition=pre"+'&page='+page );
  }
  public sortBypre(variant,page):Observable<any>{
    console.log(variant,page)
    return this._http.get<any>(`${API_LIVE}`+ '/search/filter/preowned?sortBy='+variant+'&page='+page);
  }






}
