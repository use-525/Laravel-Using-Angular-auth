import { TokenService } from 'src/app/Services/token.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loogedIn = new BehaviorSubject <boolean>(this.Token.loogedIn());
  authStatus = this.loogedIn.asObservable();
  changeAuthStatus(values:boolean){
    this.loogedIn.next(values);
  }
  constructor(private Token:TokenService) { }
}
