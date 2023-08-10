import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { EmissoresRoutingModule } from './emissores-routing.module';
import { EmissoresPesquisaComponent } from './emissores-pesquisa/emissores-pesquisa.component';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EmissoresCadastroComponent } from './emissores-cadastro/emissores-cadastro.component';
import { InputSwitchModule } from 'primeng/inputswitch';


@NgModule({
  declarations: [EmissoresPesquisaComponent, EmissoresCadastroComponent],
  imports: [
    CommonModule,
    CardModule,
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
    InputSwitchModule,

    SharedModule,
    HttpClientModule,
    EmissoresRoutingModule
  ]
})
export class EmissoresModule { }
