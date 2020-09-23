import { query } from '@angular/animations';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_LIVE, httpOptions } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  constructor(private http: HttpClient) { }
  public searched(query,page):Observable<any>{

  return this.http.get<any>(`${API_LIVE}`+"/search?searchKeyword="+query+'&page='+page,httpOptions);

  }

}
