import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShortDatePipe } from './pipes/short-date.pipe';
import { DurationPipe } from './pipes/duration.pipe';
import { TagItemComponent } from './components/tag-item/tag-item.component';
import { CustomFieldsComponent } from './components/custom-fields/custom-fields.component';
import { CustomFieldValuePipe } from './pipes/custom-field-value.pipe';
import { UserComponent } from './components/user/user.component';
import { DefangPipe } from './pipes/defang.pipe';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToggleButtonComponent } from './components/toggle-button/toggle-button.component';
import { InputComponent } from './components/input/input.component';
import { NgbToast } from "@ng-bootstrap/ng-bootstrap";
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ShortDatePipe,
    DurationPipe,
    TagItemComponent,
    CustomFieldsComponent,
    CustomFieldValuePipe,
    UserComponent,
    DefangPipe,
    NavTabsComponent,
    ToastComponent,
    ToggleButtonComponent,
    InputComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbToast
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
