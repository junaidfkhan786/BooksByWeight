import { Injectable } from '@angular/core';
import { API_LIVE, httpOptions, API_URL } from '../models/api.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
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


   return this.http.post<any>(`${API_LIVE}`+'/book/singleBook/',book).pipe(
    tap(() => {
      this.bookload.next();
    })
  );



  }
  public editbook(id,book):Observable<any>{


    return this.http.put<any>(`${API_LIVE}`+'/book/editBook/'+id,book).pipe(
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

  // public bulkbook(book):Observable<any>{


  //   return this.http.post<any>(`${API_LIVE}`+'/book/saveBook/',book).pipe(
  //    tap(() => {
  //      this.bookload.next();
  //    })
  //  );



  //  }
   public bulkbook(book): Observable<HttpEvent<any>>{


    const req = new HttpRequest('POST',`${API_LIVE}`+'/book/saveBook/',book,{ reportProgress: true,
      responseType: 'json'})

      return this.http.request(req);

   }

   public editgoc(book):Observable<any>{

     return this.http.put<any>(`${API_LIVE}` + '/book/updategoc/',book,httpOptions).pipe(
      tap(() => {
        this.bookload.next();
      })
    );
  }

  public Exportexcel():Observable<any>{
    return this.http.get<any[]>(`${API_LIVE}`+"/book/export");
  }

}
