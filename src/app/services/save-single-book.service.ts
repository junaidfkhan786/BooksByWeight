import { Injectable } from '@angular/core';
import { API_LIVE, httpOptions, API_URL } from '../models/api.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveSingleBookService {
  private bookload = new Subject<any>();
  getbookload() {
    return this.bookload;
  }
  constructor(
    private http : HttpClient,
  ) { }

  public savesinglebook(book):Observable<any>{
    
    
   return this.http.post<any>('https://bbw-backend.herokuapp.com/api/book/singleBook/',book).pipe(
    tap(() => {
      this.bookload.next();
    })
  );
  


  }

  public deletebook(id):Observable<any>{
    console.log(id)
     return this.http.delete<any>(`${API_LIVE}` + '/book/'+id,httpOptions).pipe(
      tap(() => {
        this.bookload.next();
      })
    );
  }

  public bulkbook(book):Observable<any>{
    
    
    return this.http.post<any>(`${API_LIVE}`+'/book/saveBook/',book).pipe(
     tap(() => {
       this.bookload.next();
     })
   );
   
 
 
   }
}
