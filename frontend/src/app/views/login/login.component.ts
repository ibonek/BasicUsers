import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/components/navbar/navbar.service';
import { ToastService } from 'src/app/components/toast/toast.service';
import { APIResponse, User } from 'src/app/models/app.model';
import { APIClientService } from 'src/app/services/apiclient.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  version = "0.0.1" // TODO From project config
  loginForm: FormGroup;
  requireMFA: boolean;

  constructor(private apiClient: APIClientService,
      private toastService: ToastService,
      private router: Router,
      private authService: AuthService,
      private navService: NavbarService,
      private formBuilder: FormBuilder) {
    this.navService.hide();
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.requireMFA = false;
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  login(): void {
    this.apiClient.endpoints.auth.login(this.loginForm.value).subscribe({
      next: (resp: HttpResponse<APIResponse<any>>) => {
        if (resp.body) {
          if (resp.body.success) {
            this.authService.saveAccessToken(resp.body.data['access_token']);
            this.authService.saveRefreshToken(resp.body.data['refresh_token']);
            this.router.navigate(["/"]);
          } else {
            this.toastService.show(resp.body.message, {classname: 'bg-danger text-light', delay: 3000});
          }
        }
      },
      error: () => {
        this.toastService.show("Error inesperado al iniciar sesión", {classname: 'bg-danger text-light', delay: 3000});
      }
    });
  }

  goToRegister(){
    this.router.navigate(["/register"]);
  }

}
