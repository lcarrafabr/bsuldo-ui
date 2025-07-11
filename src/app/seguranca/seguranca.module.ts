import { AuthGuard } from './auth.guard';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { InputTextModule } from 'primeng/inputtext';
import { SegurancaRoutingModule } from './seguranca.routing-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    HttpClientModule,


    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
    allowedDomains: ['192.168.1.105:8080'],
    disallowedRoutes: ['http://192.168.1.105:8080/oauth/token']
      }
    }),


    /*
    // Abaixo é o codigo antes de ir para produção
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
        //allowedDomains: environment.tokenWhitelistedDomains,
        //disallowedRoutes: environment.tokenBlackListdRoutes
      }
    }),*/

    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },
    AuthGuard
  ]
})
export class SegurancaModule { }
