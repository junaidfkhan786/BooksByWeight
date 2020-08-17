import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { API_URL, API_LIVE, httpOptions } from '../models/api.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) { }
  public AddUser(user) {

    return this._http.post(`${API_LIVE}` + '/user/signup', user, { responseType: 'text' as 'json' })

  }

  public Verify(phonenumber, otp, user):Observable<any>{
    return this._http.post(`${API_LIVE}` + '/user/verify?phonenumber=' + phonenumber + '&code=' + otp, user);
  }

  resendOTp(phonenumber) {
    return this._http.post<any>(`${API_LIVE}` + '/user/resendOtp/' + phonenumber, httpOptions);
  }
}
