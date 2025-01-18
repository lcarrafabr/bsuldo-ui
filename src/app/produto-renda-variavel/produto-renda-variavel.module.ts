import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {KeyFilterModule} from 'primeng/keyfilter';
import {InputMaskModule} from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRendaVariavelRoutingModule } from './produto-renda-variavel-routing.module';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoRendaVariavelPesquisaComponent } from './produto-renda-variavel-pesquisa/produto-renda-variavel-pesquisa.component';
import { ProdutoRendaVariavelCadastroComponent } from './produto-renda-variavel-cadastro/produto-renda-variavel-cadastro.component';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [ProdutoRendaVariavelPesquisaComponent, ProdutoRendaVariavelCadastroComponent],
  imports: [
    CommonModule,
    ProdutoRendaVariavelRoutingModule,

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
    ToolbarModule,

    SharedModule,
    HttpClientModule,
  ]
})
export class ProdutoRendaVariavelModule { }
