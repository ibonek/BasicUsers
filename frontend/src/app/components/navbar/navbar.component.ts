import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from '../toast/toast.service';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userName?: string;

  constructor(public navService: NavbarService,
    private router: Router,
    private toastService: ToastService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.router

  }

  logout(): void {
    this.authService.logout();
    this.toastService.show("Sesión cerrada correctamente", { classname: 'bg-warning text-light', delay: 5000 });
    this.router.navigate(["/login"]);
  }

}
