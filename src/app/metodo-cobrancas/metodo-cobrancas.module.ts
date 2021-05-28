import { InputTextareaModule } from 'primeng/inputtextarea';
import { MetodoCobrancaRoutingModule } from './metodo-cobranca-routing.module';
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
import { SharedModule } from './../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetodoCobrancaPesquisaComponent } from './metodo-cobranca-pesquisa/metodo-cobranca-pesquisa.component';
import { MetodoCobrancaCadastroComponent } from './metodo-cobranca-cadastro/metodo-cobranca-cadastro.component';



@NgModule({
  declarations: [MetodoCobrancaPesquisaComponent, MetodoCobrancaCadastroComponent],
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

    MetodoCobrancaRoutingModule
  ]
})
export class MetodoCobrancasModule { }
