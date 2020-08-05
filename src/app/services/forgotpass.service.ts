import { Forgotpass } from 'src/app/models/forgotpass.model';
import { Observable } from 'rxjs';
import { API_URL, API_LIVE, httpOptions } from './../models/api.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotpassService {

  constructor(private _http : HttpClient) {


   }

   public ChangePass(phonenumber,otp,password){
    return this._http.post(`${API_LIVE}` + '/user/forgetpw?phonenumber='+phonenumber+'&code='+otp+'&password='+password,{responseType: 'text' as 'json'});
   }

   sendOTp(phonenumber){
  return this._http.post(`${API_LIVE}` + '/user/sendOtp/' + phonenumber,httpOptions);
   }
}
