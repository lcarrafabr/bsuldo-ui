import { ProdutoRendaFixaModule } from './produto-renda-fixa/produto-renda-fixa.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { EmissoresModule } from './emissores/emissores.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MetodoCobrancasModule } from './metodo-cobrancas/metodo-cobrancas.module';
import { CategoriasModule } from './categorias/categorias.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';;
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarModule} from 'primeng/sidebar';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SidebarModule,

    CoreModule,
    LancamentosModule,
    SegurancaModule,
    PessoasModule,
    CategoriasModule,
    MetodoCobrancasModule,
    DashboardModule,
    UsuariosModule,
    EmissoresModule,
    ProdutoRendaFixaModule,

    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
