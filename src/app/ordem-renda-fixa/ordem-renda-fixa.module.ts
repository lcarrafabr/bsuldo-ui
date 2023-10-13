import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdemRendaFixaRoutingModule } from './ordem-renda-fixa-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OrdemRendaFixaPesquisaComponent } from './ordem-renda-fixa-pesquisa/ordem-renda-fixa-pesquisa.component';
import { InputTextModule } from 'primeng/inputtext';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { OrdemRendaFixaCadastroComponent } from './ordem-renda-fixa-cadastro/ordem-renda-fixa-cadastro.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [OrdemRendaFixaPesquisaComponent, OrdemRendaFixaCadastroComponent],
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
    FieldsetModule,
    PanelModule,
    SelectButtonModule,
    InputNumberModule,
    DialogModule,

    SharedModule,
    HttpClientModule,
    OrdemRendaFixaRoutingModule
  ]
})
export class OrdemRendaFixaModule { }
