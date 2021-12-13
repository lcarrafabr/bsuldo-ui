import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { SidebarModule } from 'primeng/sidebar';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import {FieldsetModule} from 'primeng/fieldset';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { DialogModule } from 'primeng/dialog';
import { UsuarioPermissaoComponent } from './usuario-permissao/usuario-permissao.component';
import {PickListModule} from 'primeng/picklist';



@NgModule({
  declarations: [UsuarioPesquisaComponent, UsuarioCadastroComponent, UsuarioPermissaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    CardModule,
    BrowserAnimationsModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    SidebarModule,
    FieldsetModule,
    PanelModule,
    DialogModule,
    PickListModule,

    SharedModule,
    HttpClientModule,

    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
