import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      
    ]),
    FormsModule,
    BrowserAnimationsModule
  ]
})
export class UserModule { }
