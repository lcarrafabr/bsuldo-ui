import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletsRoutingModule } from './wallets-routing.module';
import { FormsModule } from '@angular/forms';
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
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { WaletPesquisaComponent } from './walet-pesquisa/walet-pesquisa.component';
import { WaletCadastroComponent } from './walet-cadastro/walet-cadastro.component';


@NgModule({
  declarations: [WaletPesquisaComponent, WaletCadastroComponent],
  imports: [
    CommonModule,
    WalletsRoutingModule,

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
export class WalletsModule { }
