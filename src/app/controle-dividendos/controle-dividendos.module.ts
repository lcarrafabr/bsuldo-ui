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
import { CheckboxModule } from 'primeng/checkbox';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControleDividendosRoutingModule } from './controle-dividendos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ControleDividendosPesquisaComponent } from './controle-dividendos-pesquisa/controle-dividendos-pesquisa.component';
import { ControleDividendosCadastroComponent } from './controle-dividendos-cadastro/controle-dividendos-cadastro.component';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [ControleDividendosPesquisaComponent, ControleDividendosCadastroComponent],
  imports: [
    CommonModule,
    ControleDividendosRoutingModule,

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
    CheckboxModule,
    InputNumberModule,
    CheckboxModule,

    SharedModule,
    HttpClientModule,
  ]
})
export class ControleDividendosModule { }
