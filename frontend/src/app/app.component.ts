import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'forntend';
  public visible: boolean;
  constructor(private authService: AuthService,
              private router: Router){
    this.visible = false;
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          if (event.url == "/login" || event.url == "/register")
            document.body.style.backgroundColor = 'var(--color-sofistic-dark)';
          else
            document.body.style.backgroundColor = 'white';
        }
      }
    );
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/login"]);
    }
  }
}
