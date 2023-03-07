import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Router, UrlHandlingStrategy } from "@angular/router";
import { catchError, Observable, of, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { ToastService } from "../components/toast/toast.service";
import { APIClientService } from "./apiclient.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshing: boolean;
  constructor(private router: Router,
      private toastService: ToastService,
      private apiClient: APIClientService, // DEBUG
      private authService: AuthService) {
    this.isRefreshing = false;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = (this.isRefreshing) ? this.authService.getRefreshToken() : this.authService.getAccessToken();
    req = req.clone({ setHeaders: { Authorization: token } });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401 && !req.url.includes("/auth/login")) {
          return this.handle401Error(req, next);
        } else if (!error.error.success && error.error.message) {
          this.toastService.show(error.error.message, { classname: 'bg-danger text-light', delay: 6000 });
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      
      if (this.authService.isLoggedIn()) {
        return this.authService.refreshToken().pipe(
          switchMap((resp: HttpResponse<any>) => {
            this.isRefreshing = false;
            this.authService.saveAccessToken(resp.body['access_token']);
            req = req.clone({ setHeaders: { Authorization: this.authService.getAccessToken() } });
            return next.handle(req);
          }),
          catchError((err) => {
            this.goToLogin();
            return throwError(() => err);
          })
        );
      } else {
        this.goToLogin();
      }
    } else {
      this.goToLogin();
    }

    return next.handle(req);
  }

  private goToLogin(): void {
    this.isRefreshing = false;
    this.authService.logout();
    this.toastService.show("La sesión ha caducado", { classname: 'bg-danger text-light', delay: 5000 });
    this.router.navigate(["/login"]);
  }
}