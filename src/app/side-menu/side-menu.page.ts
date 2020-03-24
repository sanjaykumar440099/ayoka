import { Routes, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    private router: Router
  ) { }

  showSubmenu: boolean = false;
  showSubmenuItem: boolean = false;
  navIcon = 'chevron-forward';
  navIcons = 'chevron-forward';

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.close();
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  menuItemHandlerFirst(): void {
    this.showSubmenu = !this.showSubmenu;
    if (this.showSubmenu) {
      this.navIcon = 'chevron-down';
    } else {
      this.navIcon = 'chevron-forward';
    }
  }

  menuItemHandlerSecond(): void {
    this.showSubmenuItem = !this.showSubmenuItem;
    if (this.showSubmenuItem) {
      this.navIcons = 'chevron-down';
    } else {
      this.navIcons = 'chevron-forward';
    }
  }

  ngOnInit() { }

  //go to create satore
  goToPages(url: string) {
    this.menu.close();
    if (url === 'home') {
      return this.router.navigateByUrl('/home'); 
    } else if (url === 'createStore') {
      this.navIcons = 'chevron-forward';
      this.showSubmenuItem = false;
      this.router.navigateByUrl('/create-store');
    } else if (url === 'searchStore') {
      this.router.navigateByUrl('/search-store');
    } else if (url === 'loginStore') {
      this.router.navigateByUrl('/store-login');
    }
  }
}
