import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  private iss ={
    signup : 'http://localhost:8000/api/signup',
    login : 'http://localhost:8000/api/login'
  }
  handler(token: string) {
    this.set(token);
  }
  set(token: string) {
    localStorage.setItem('token', token);
  }
  get() {
    return localStorage.getItem('token');
  }
  remove() {
    localStorage.removeItem('token');
  }
  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) >= 0 ? true : false;
      }
    }
    return false;
  }
  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }
  decode(payload: any) {
    return JSON.parse(atob(payload));
  }
  loogedIn(){
    return this.isValid();
  }
}
