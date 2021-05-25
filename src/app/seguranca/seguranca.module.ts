import { InputTextModule } from 'primeng/inputtext';
import { SegurancaRoutingModule } from './seguranca.routing-module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './login-form/login-form.component';
import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';



@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    SegurancaRoutingModule,

    InputTextModule,
    PasswordModule,
    ButtonModule
  ]
})
export class SegurancaModule { }
