import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputMaskModule } from 'primeng/inputmask';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricoRfRoutingModule } from './historico-rf-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HistoricoRfPesquisaComponent } from './historico-rf-pesquisa/historico-rf-pesquisa.component';
import { PanelModule } from 'primeng/panel';
import { HistoricoRfCadastroComponent } from './historico-rf-cadastro/historico-rf-cadastro.component';


@NgModule({
  declarations: [HistoricoRfPesquisaComponent, HistoricoRfCadastroComponent],
  imports: [
    CommonModule,
    HistoricoRfRoutingModule,

    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    MessagesModule,
    SidebarModule,
    InputTextareaModule,
    InputSwitchModule,
    InputMaskModule,
    KeyFilterModule,
    InputNumberModule,
    CheckboxModule,
    PanelModule,

    SharedModule,
    HttpClientModule,
  ]
})
export class HistoricoRfModule { }
