import { Component, OnInit } from '@angular/core';
import { SnotifyModule, SnotifyService } from 'ng-snotify';
import { JarwisService } from 'src/app/Services/jarwis.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css'],
})
export class RequestResetComponent implements OnInit {
  constructor(private Jarwis: JarwisService,private notify:SnotifyService) {}

  ngOnInit(): void {}
  public form = {
    email: null,
  };
  onSubmit() {
    this.notify.info('Wait....',{
      timeout: 5000,
    })
    this.Jarwis.senPasswordResetLink(this.form).subscribe(
      (data) => this.handlerResponse(data),
      (error) => this.notify.error(error.error.error)
    );
  }
  handlerResponse(res: any) {
    this.notify.success(res.success,{
      timeout: 0,
    })
    this.form.email = null;
  }
}
