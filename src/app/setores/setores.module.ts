import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetoresRoutingModule } from './setores-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SetoresPesquisaComponent } from './setores-pesquisa/setores-pesquisa.component';
import { SetoresCadastroComponent } from './setores-cadastro/setores-cadastro.component';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [SetoresPesquisaComponent, SetoresCadastroComponent],
  imports: [
    CommonModule,
    SetoresRoutingModule,
    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    MessagesModule,
    MessagesModule,
    SidebarModule,
    InputTextareaModule,
    InputSwitchModule,
    ToolbarModule,
    PanelModule,

    SharedModule,
    HttpClientModule,
  ]
})
export class SetoresModule { }
