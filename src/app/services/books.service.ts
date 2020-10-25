import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, API_LIVE, httpOptions } from '../models/api.model';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  private postsUpdated = new Subject<any>();
  constructor(private _http : HttpClient) { }
  public  getBooks(page):Observable<any> {
    return this._http.get<any[]>(`${API_LIVE}`+"/book/?page="+page);


  }
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  public  getlatestBooks():Observable<any> {

    return this._http.get<any>(`${API_LIVE}`+"/book/latest");


  }
  public  getBannerBooks():Observable<any> {

    return this._http.get<any>(`${API_LIVE}`+"/book/banner");


  }
  public getDetailPackage(_id: number): Observable<any> {
    return this._http.get<any>(`${API_LIVE}`+"/book/"+ _id);
  }

  public  getPopularBooks():Observable<any> {

    return this._http.get<any>(`${API_LIVE}`+"/book/popular");


  }
  public  getcollectiblesBooks():Observable<any> {

    return this._http.get<any>(`${API_LIVE}`+"/book/collectibles/5f68900289f56d001842d994");
  }
  public getNewBooks(page):Observable<any>{
    return this._http.get<any>(`${API_LIVE}`+"/search/filter/new?sortBy=asc&page="+page);
  }
  public getPreBooks(page):Observable<any>{
    return this._http.get<any>(`${API_LIVE}`+"/search/filter/preowned?sortBy=asc&page="+page);
  }

}
