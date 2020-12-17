import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key:string,objeto:any){
    try{
      localStorage.setItem(key, JSON.stringify(objeto));
    }catch(error){
      console.log(error);
    }
  }

  get(key:string): any{
    try{
      return JSON.parse(localStorage.getItem(key));
    }catch(error){
      console.log(error);
    }
  }

  remove(key:string){
    try{
      localStorage.removeItem(key);
    }catch(error){
      console.log(error);
    }
  }

  clear(key:string){
    try{
      localStorage.clear();
    }catch(error){
      console.log(error);
    }
  }
}
