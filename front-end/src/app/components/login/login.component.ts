import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { TokenService } from 'src/app/Services/token.service';
import { AuthService } from 'src/app/Services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null,
  };
  public error = null;
  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.Jarwis.login(this.form).subscribe(
      (data) => this.handlerResponse(data),
      (error) => this.handlerError(error)
    );
  }
  handlerResponse(data: any) {
    this.Token.handler(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }
  handlerError(error: any): any {
    this.error = error.error.error;
  }
}
