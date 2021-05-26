import { AuthService } from './../seguranca/auth.service';
import { RouterModule } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ErrorHandlerService } from './error-handler.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'primeng/sidebar';
import { NavbarComponent } from './navbar/navbar.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { NaoAutorizadoComponent } from './nao-autorizado/nao-autorizado.component';



@NgModule({
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SidebarModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule

  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    AuthService,
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt-BR'}
  ]
})
export class CoreModule { }
