import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardInvestimentosRoutingModule } from './dashboard-investimentos-routing.module';
import { SharedModule } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { DashboardInvestimentosComponent } from './dashboard-investimentos/dashboard-investimentos.component';
import {TabViewModule} from 'primeng/tabview';
import { FullCalendarModule } from 'primeng/fullcalendar';



@NgModule({
  declarations: [DashboardInvestimentosComponent],
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
    ProgressBarModule,
    ChartModule,
    PanelModule,
    TabViewModule,
    FullCalendarModule,


    SharedModule,
    DashboardInvestimentosRoutingModule
  ]
})
export class DashboardInvestimentosModule { }
