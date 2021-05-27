import { CategoriasRoutingModule } from './categorias-routing.module';
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
import { CategoriaPesquisaComponent } from './categoria-pesquisa/categoria-pesquisa.component';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CategoriaCadastroComponent } from './categoria-cadastro/categoria-cadastro.component';



@NgModule({
  declarations: [CategoriaPesquisaComponent, CategoriaCadastroComponent],
  imports: [
    CommonModule,
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

    CategoriasRoutingModule
  ]
})
export class CategoriasModule { }
