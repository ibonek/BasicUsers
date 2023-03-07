import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {APIClientService} from "../../services/apiclient.service";
import {ToastService} from "../../components/toast/toast.service";
import {first} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {APIResponse, Client, User} from "../../models/app.model";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  regFrom: FormGroup;

  constructor( private fb: FormBuilder,
               private router:Router,
               private apiClient: APIClientService,
               private authService: AuthService,
               private toastService: ToastService) {

    this.regFrom = this.fb.group({
      login: ['',Validators.required],
      password: ['',Validators.required]
    })

  }

  loadUserList(): void {
    this.apiClient.endpoints.users.list().subscribe({
      next: (resp: HttpResponse<APIResponse<User[]>>) => {
        if (resp.body?.success) {
          console.log('ole ole')
          console.log( resp.body?.data! );

        } else {
          this.toastService.show(resp.body?.message, { classname: 'bg-danger text-light', delay: 3000 });
        }
      }
    });
  }

  newUser(froms:any): void {

    this.apiClient.endpoints.users.create(
      this.regFrom.value.login,
      this.regFrom.value.password
    ).pipe(first()).subscribe({
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
}
