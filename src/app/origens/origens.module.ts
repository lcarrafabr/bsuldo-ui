import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { OrigemPesquisaComponent } from './origem-pesquisa/origem-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrigensRoutingModule } from './origens-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrigemCadastroComponent } from './origem-cadastro/origem-cadastro.component';


@NgModule({
  declarations: [OrigemPesquisaComponent, OrigemCadastroComponent],
  imports: [
    CommonModule,
    OrigensRoutingModule,

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
    PanelModule,
    ToolbarModule,

    SharedModule,
    HttpClientModule,
  ]
})
export class OrigensModule { }
