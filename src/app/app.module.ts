import { OrigensModule } from './origens/origens.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';
import { AvisosAutomaticosModule } from './avisos-automaticos/avisos-automaticos.module';
import { AcompanhamentoEstrategicoModule } from './acompanhamento-estrategico/acompanhamento-estrategico.module';
import { BancosModule } from './bancos/bancos.module';
import { HistoricoRfModule } from './historico-rf/historico-rf.module';
import { DashboardInvestimentosModule } from './dashboard-investimentos/dashboard-investimentos.module';
import { ControleDividendosModule } from './controle-dividendos/controle-dividendos.module';
import { OrdensDeCompraModule } from './ordens-de-compra/ordens-de-compra.module';
import { ProdutoRendaVariavelModule } from './produto-renda-variavel/produto-renda-variavel.module';
import { SegmentosModule } from './segmentos/segmentos.module';
import { SetoresModule } from './setores/setores.module';
import { OrdemRendaFixaModule } from './ordem-renda-fixa/ordem-renda-fixa.module';
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
import { ThemeService } from './services/theme.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,

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
    OrdemRendaFixaModule,
    SetoresModule,
    SegmentosModule,
    ProdutoRendaVariavelModule,
    OrdensDeCompraModule,
    ControleDividendosModule,
    DashboardInvestimentosModule,
    HistoricoRfModule,
    BancosModule,
    AcompanhamentoEstrategicoModule,
    AvisosAutomaticosModule,
    ConfiguracoesModule,
    OrigensModule,


    AppRoutingModule
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
