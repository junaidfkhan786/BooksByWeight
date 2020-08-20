import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { filter, debounceTime } from 'rxjs/operators';
import { useradd } from '../models/useraddress.model';
import { fromEvent, from } from 'rxjs';

@Pipe({
  name: 'adminUser'
})
export class AdminUserPipe implements PipeTransform {

  transform(value: any, searchTerm: any): any {
    if(value.length === 0){
      
      return value
    }
    return value.filter(function(search){
// if(search.local){
//   var localname = search.local.name
//   var localphone = search.local.phonenumber
//   var localemail = search.local.local_email
// var userlocal = [].concat(localname,localphone,localemail)
// return userlocal.indexOf(searchTerm.toLowerCase()) > -1
// console.log(userlocal)
// }
// if(search.google){
//   var googlename = search.google.name
//   var googleemail = search.google.google_email
// var usergoogle = [].concat(googlename,googleemail)
// return usergoogle.indexOf(searchTerm.toLowerCase()) > -1
// console.log(usergoogle)
// }
// if(search.facebook){
//   var facebookname = search.facebook.name
//   var facebookemail = search.facebook.facebook_email
// var userfacebook = [].concat(facebookname,facebookemail)
// return userfacebook.indexOf(searchTerm.toLowerCase()) > -1
// console.log(userfacebook)
// }
let user = JSON.stringify(search)
return user.indexOf(searchTerm.toLowerCase()) > -1
    })
  }
}
