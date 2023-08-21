import { SharedModule } from './../shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRendaFixaRoutingModule } from './produto-renda-fixa-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoRendaFixaPesquisaComponent } from './produto-renda-fixa-pesquisa/produto-renda-fixa-pesquisa.component';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { ProdutoRendaFixaCadastroComponent } from './produto-renda-fixa-cadastro/produto-renda-fixa-cadastro.component';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [ProdutoRendaFixaPesquisaComponent, ProdutoRendaFixaCadastroComponent],
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
    InputNumberModule,

    SharedModule,
    HttpClientModule,
    ProdutoRendaFixaRoutingModule
  ]
})
export class ProdutoRendaFixaModule { }
