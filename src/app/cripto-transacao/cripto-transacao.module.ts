import { DynamicCurrencyPipe } from './../dynamic-currency.pipe';
import { InputNumberModule } from 'primeng/inputnumber';
import { KeyFilterModule } from 'primeng/keyfilter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriptoTransacaoRoutingModule } from './cripto-transacao-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
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
import { CriptoTransacaoPesquisaComponent } from './cripto-transacao-pesquisa/cripto-transacao-pesquisa.component';
import { CriptoTransacaoCadastroComponent } from './cripto-transacao-cadastro/cripto-transacao-cadastro.component';


@NgModule({
  declarations: [
    CriptoTransacaoPesquisaComponent, CriptoTransacaoCadastroComponent, DynamicCurrencyPipe],
  imports: [
    CommonModule,
    CriptoTransacaoRoutingModule,

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
    KeyFilterModule,
    InputNumberModule,

    SharedModule,
    HttpClientModule,
  ],
  exports: [DynamicCurrencyPipe],
})
export class CriptoTransacaoModule {
}
