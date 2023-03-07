import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  visible: boolean;

  constructor(private router: Router) {
    this.visible = false;
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          if (event.url == "/login" || event.url == "/register") this.visible = false;
          else this.visible = true;
        }
      }
    );
  }

  hide() { this.visible = false; }
  show() { this.visible = true; }
}
