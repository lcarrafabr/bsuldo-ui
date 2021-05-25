import { JwtModule } from '@auth0/angular-jwt';
import { InputTextModule } from 'primeng/inputtext';
import { SegurancaRoutingModule } from './seguranca.routing-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),

    InputTextModule,
    PasswordModule,
    ButtonModule
  ]
})
export class SegurancaModule { }
