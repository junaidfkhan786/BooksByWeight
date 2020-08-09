import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_LIVE } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _http : HttpClient
    ) { }

  public  getUsers():Observable<any> {

    return this._http.get<any[]>(`${API_LIVE}`+"/user");


  }
}
