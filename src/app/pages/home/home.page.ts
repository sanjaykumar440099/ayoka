import { Component, OnInit } from '@angular/core';
import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  sliderOpts = {
    autoplay: true,
    zoom: {
      maxRatio: 5
    }
  };

  sliderOptsDiscounts = {
    autoplay: true,
    effect: 'coverflow',
    loop: false,
    zoom: {
      maxRatio: 5
    }
  };

  subscribe: any;

  constructor(private platform: Platform) {
    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name === 'HomePage') {
        if (window.confirm("Do you want to exit the app ?")) {
          navigator['app'].exitApp();
        }
      }
    })
  }

  ngOnInit() { }

  doRefresh(event: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
