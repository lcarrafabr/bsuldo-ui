import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import {ProgressBarModule} from 'primeng/progressbar';


@NgModule({
  declarations: [DashboardComponent],
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

    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
