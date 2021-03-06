import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ContactService } from '../../services/contact.service';
import { LoadscriptService } from '../../services/loadscript.service';
import { AuthService } from '../../services/auth.service';
import { environment as ENV } from "../../../environments/environment";

declare var grecaptcha: any;
declare var window: any;

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.component.html',
  styleUrls: ['./bugreport.component.scss']
})
export class BugreportComponent implements OnInit {

  error: any = false;
  success: any = false;
  submitting: any = false;
  user: any = false;
  formData: any;
  actionLabel: String = 'Send Report';

  recaptcha: any = false;
  recapchaKey: String = ENV.recapchaKey;
  bugReportCaptcha: any;
  bugReportCaptchaId: any;

  submitSub: any;
  authSub: any;

  constructor(private CS: ContactService, private LS: LoadscriptService, private Auth: AuthService, private titleService: Title) {
    this.formData = {
      'description': ""
    };

    this.LS.loadScript(ENV.recaptchaScript, 'js', () => {
      this.recaptcha = true;
      this.pollCaptchaReady();
    });

    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
    });
  }

  ngOnDestroy() {
    if (this.submitSub) this.submitSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }

  ngOnInit() {
    this.titleService.setTitle('TV Tracker | Report broken stuff');
  }

  pollCaptchaReady() {
    if (window.hasOwnProperty('grecaptcha') && window.grecaptcha.hasOwnProperty('render')) {
      return this.initCaptchas();
    }

    setTimeout(() => {
      this.pollCaptchaReady();
    }, 30);
  }

  initCaptchas() {
    this.bugReportCaptcha = grecaptcha.render('bug-report-captcha', {
      'sitekey': this.recapchaKey,
      'callback': (data) => {
        this.bugReportCaptcha = data;
        this.error = false;
      },
      'expired-callback': () => {
        this.bugReportCaptcha = false;
      }
    });
  }

  onSubmit(form) {

    if (this.submitting) return false;
    this.submitting = true;

    this.error = false;
    this.success = false;

    this.submitSub = this.CS.bugReport(this.formData.description, this.bugReportCaptcha).subscribe(data => {
      if (data.state == 'failure') {
        this.error = data;
      } else {
        this.success = data;
      }
      this.submitting = false;
    }, err => {
      this.error = err;
      this.submitting = false;
    });
  }
}
