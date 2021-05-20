import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import { LancamentoPesquisaComponent } from './lancamentos/lancamento-pesquisa/lancamento-pesquisa.component';

@NgModule({
  declarations: [
    AppComponent,
    LancamentoPesquisaComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
