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
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcompanhamentoEstrategicoRoutingModule } from './acompanhamento-estrategico-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AcompanhamentoEstrategicoPesquisaComponent } from './acompanhamento-estrategico-pesquisa/acompanhamento-estrategico-pesquisa.component';
import { AcompanhamentoEstrategicoCadastroComponent } from './acompanhamento-estrategico-cadastro/acompanhamento-estrategico-cadastro.component';
import { PanelModule } from 'primeng/panel';


@NgModule({
  declarations: [AcompanhamentoEstrategicoPesquisaComponent, AcompanhamentoEstrategicoCadastroComponent],
  imports: [
    CommonModule,
    AcompanhamentoEstrategicoRoutingModule,

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
    SelectButtonModule,
    InputNumberModule,
    PanelModule,

    SharedModule,
    HttpClientModule,
  ]
})
export class AcompanhamentoEstrategicoModule { }
