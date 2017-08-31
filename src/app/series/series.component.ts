import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenRingService } from '../services/token-ring.service';
import { environment } from '../../environments/environment';
import { LoadedService } from '../services/loaded.service';

declare var Swiper: any;

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  private seriesSub: any;
  private recentSub: any;
  private futureSub: any;
  private authSub: any;
  private user: any;

  private recentSwiper: any;
  private futureSwiper: any;

  public recentEpisodes: any = [{
    'test': 1
  }, {
    'test': 2
  }, {
    'test': 3
  }, {
    'test': 4
  }];

  public futureEpisodes: any = [{
    'test': 1
  }, {
    'test': 2
  }, {
    'test': 3
  }, {
    'test': 4
  }];

  constructor(private Auth: AuthService, private TRS: TokenRingService, private LS: LoadedService) {

    this.authSub = this.Auth.userState.subscribe(value => {
      this.user = value;
      this.createRecentSub();
      this.createFutureSub();
    });

    this.buildSwiper('recent');
    this.buildSwiper('future');
  }

  createRecentSub() {
    let endpoint = (this.user ? 'episodes-user-recent' : 'episodes-recent');
    this.recentSub = this.TRS.apiGetCall(environment.endpoint[endpoint]).subscribe((data) => {

      this.recentEpisodes = data.data.items;

      this.recentSwiper.slideTo(0);
      setTimeout(() => {
        this.recentSwiper.slideTo(0);
      }, 300);
    });
  }

  createFutureSub() {
    let endpoint = (this.user ? 'episodes-user-future' : 'episodes-future');
    this.futureSub = this.TRS.apiGetCall(environment.endpoint[endpoint]).subscribe((data) => {

      this.futureEpisodes = data.data.items;

      this.futureSwiper.slideTo(0);
      setTimeout(() => {
        this.futureSwiper.slideTo(0);
      }, 300);
    });
  }

  buildSwiper(type) {
    this.LS.waitForLoad('Swiper', () => {
      let swiperParams = {
        direction: 'horizontal',
        loop: false,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        scrollbar: '.swiper-scrollbar',
        height: 'auto',
        slidesPerColumn: 1,
        slidesPerView: 4,
        observer: true,
        initialSlide: 0,
        preloadImages: false,
        lazyLoading: true,
        slidesPerGroup: 4,
        spaceBetween: 20,
        breakpoints: {
          320: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10
          },
          480: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3
          }
        }
      };

      if (type == 'recent') {
        let recentParams = Object.assign({}, swiperParams);
        recentParams.pagination = "#recent-pagination";
        recentParams.prevButton = "#recent-prev";
        recentParams.nextButton = "#recent-next";
        this.recentSwiper = new Swiper('.swiper-container-recent', recentParams);
      }

      if (type == 'future') {
        let futureParams = Object.assign({}, swiperParams);
        futureParams.pagination = "#future-pagination";
        futureParams.prevButton = "#future-prev";
        futureParams.nextButton = "#future-next";
        this.futureSwiper = new Swiper('.swiper-container-future', futureParams);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.seriesSub) this.seriesSub.unsubscribe();
    if (this.recentSub) this.recentSub.unsubscribe();
    if (this.futureSub) this.futureSub.unsubscribe();
    if (this.authSub) this.authSub.unsubscribe();
  }
}
