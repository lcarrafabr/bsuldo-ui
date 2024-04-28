import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvisosAutomaticosRoutingModule } from './avisos-automaticos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AvisosAutomaticosPesquisaComponent } from './avisos-automaticos-pesquisa/avisos-automaticos-pesquisa.component';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [AvisosAutomaticosPesquisaComponent],
  imports: [
    CommonModule,
    AvisosAutomaticosRoutingModule,

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
    DialogModule,

    SharedModule,
    HttpClientModule
  ]
})
export class AvisosAutomaticosModule { }
