import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

import { BancosRoutingModule } from './bancos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BancoPesquisaComponent } from './banco-pesquisa/banco-pesquisa.component';
import { BancoCadastroComponent } from './banco-cadastro/banco-cadastro.component';


@NgModule({
  declarations: [BancoPesquisaComponent, BancoCadastroComponent],
  imports: [
    CommonModule,

    FormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    CardModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    InputTextareaModule,

    SharedModule,
    HttpClientModule,

    BancosRoutingModule
  ]
})
export class BancosModule { }
