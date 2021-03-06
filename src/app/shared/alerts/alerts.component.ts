import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenRingService } from '../../services/token-ring.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts: any = false;
  user: any;
  activeSeries: any = false;

  private alertSub: any;
  private authSub: any;

  private clearing: any;

  constructor(private Auth: AuthService, private TRS: TokenRingService) {
    this.clearing = {};
  }

  createAlertSub() {
    let endpoint = 'alerts';
    this.alertSub = this.TRS.apiGetCall(environment.endpoint[endpoint]).subscribe((data) => {
      if (data && data.data && data.data.items) {
        this.alerts = data.data.items;
      } else {
        this.alerts = false;
      }
    });
  }

  setActiveSeries(episode, e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    this.activeSeries = false;
    setTimeout(() => {
      this.activeSeries = episode;
    }, 10);
  }

  getImagePoster(series) {
    if (!series.image_url || series.image_url == '') {
      return 'assets/img/missing.png';
    }
    return series.image_url;
  }

  clearAlert(seriesid, e) {
    if (!seriesid) return false;
    e.preventDefault();
    e.stopPropagation();

    this.clearing[seriesid] = true;

    this.TRS.apiGetCall([environment.endpoint['alert-clear'], seriesid].join('/')).subscribe((data) => {
      this.alerts = data.data.items;
      this.clearing[seriesid] = false;
    });
  }

  ngOnInit() {
    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
      this.createAlertSub();
    });
  }

  ngOnDestroy() {
    if (this.alertSub) this.alertSub.unsubscribe();
  }
}
