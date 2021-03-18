import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JarwisService } from 'src/app/Services/jarwis.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css'],
})
export class ResponseResetComponent implements OnInit {
  public form = {
    password: null,
    email: null,
    password_confirmation: null,
    resetToken: null,
  };
  public error = {
    email: null,
    password: null,
  };

  constructor(
    private route: ActivatedRoute,
    private Jarwis: JarwisService,
    private router: Router,
    private Notify: SnotifyService
  ) {
    route.queryParams.subscribe((params) => {
      this.form.resetToken = params['token'];
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    this.Jarwis.changePassword(this.form).subscribe(
      (data) => this.handlerResponse(data),
      (error) => this.handlerError(error)
    );
  }
  handlerResponse(data: any) {
    this.Notify.confirm('Done!, Now with new Password', {
      timeout: 5000,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Oky',
          action: (toster) => {
            this.router.navigateByUrl('/login'), this.Notify.remove(toster.id);
          },
        },
      ],
    });
  }
  handlerError(error: any) {
    this.error = error.error.errors;
  }
}
