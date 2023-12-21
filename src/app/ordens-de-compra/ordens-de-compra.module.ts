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

import { OrdensDeCompraRoutingModule } from './ordens-de-compra-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { OrdensDeCompraPesquisaComponent } from './ordens-de-compra-pesquisa/ordens-de-compra-pesquisa.component';
import { OrdensDeCompraCadastroComponent } from './ordens-de-compra-cadastro/ordens-de-compra-cadastro.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';


@NgModule({
  declarations: [OrdensDeCompraPesquisaComponent, OrdensDeCompraCadastroComponent],
  imports: [
    CommonModule,
    OrdensDeCompraRoutingModule,

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

    SharedModule,
    HttpClientModule,
  ]
})
export class OrdensDeCompraModule { }
