import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { LancamentoPesquisaComponent } from './lancamento-pesquisa/lancamento-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ],
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
    InputSwitchModule,
    BrowserAnimationsModule,
    InputNumberModule,
    FormsModule,
    MessagesModule,
    MessageModule,
    SidebarModule,

    SharedModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    LancamentoCadastroComponent,
    LancamentoPesquisaComponent
  ]
})
export class LancamentosModule { }
