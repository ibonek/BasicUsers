import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.scss']
})
export class NavTabsComponent implements OnInit {
  @Input() tabsInfo: any;

  tabViews: any;
  tabLinks: any;
  currentView: any;

  constructor(private router: Router) {
    this.tabViews = {};
    this.tabLinks = {};

    // Buscar alternativa, esto da errores cuando varias navtabs se renderizan. 
    // La suscripción sigue activa aunque no esté a la vista el componente
    this.router.events.subscribe(route => {
      if (route instanceof NavigationEnd) {
        if (this.tabsInfo) {
          this.changeViewOnRoute(route.urlAfterRedirects);
        }
      }
    })
  }

  ngOnInit(): void {
    if (this.tabsInfo && this.tabsInfo) {
      for (let t of this.tabsInfo) {
        if (!this.currentView) this.currentView = t.text;
        this.tabViews[t.text] = t.text;
        this.tabLinks[t.link] = t.text;
      }
    }
    this.changeViewOnRoute(this.router.url);
  }

  changeViewOnRoute(route: string): void {
    let section = route.split('/').at(-1);
    if (section && this.tabLinks.hasOwnProperty(section)) {
      this.currentView = this.tabLinks[section];
    } else {
      //console.log("[!] NAVTABS Error ruta: " + route);
      //this.router.navigate(this.tabsInfo['tabs'][0].link);
    }
  }

}
