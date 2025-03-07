import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';

import { SegmentosRoutingModule } from './segmentos-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SegmentoPesquisaComponent } from './segmento-pesquisa/segmento-pesquisa.component';
import { SegmentoCadastroComponent } from './segmento-cadastro/segmento-cadastro.component';


@NgModule({
  declarations: [SegmentoPesquisaComponent, SegmentoCadastroComponent],
  imports: [
    CommonModule,
    SegmentosRoutingModule,

    CardModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    MessagesModule,
    MessagesModule,
    SidebarModule,
    InputTextareaModule,
    InputSwitchModule,
    ToolbarModule,

    SharedModule,
    HttpClientModule,
  ]
})
export class SegmentosModule { }
