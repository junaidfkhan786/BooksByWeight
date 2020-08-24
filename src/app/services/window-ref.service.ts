import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor() { }
  
  _window() : any {
  // return the global native browser window object
  return window;
}
get nativeWindow() : any {
  return this._window();
}
}
