import { MenuItem } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  items: MenuItem[];
  activeItem: MenuItem;

  dashboardFicanceiroRota = '/dashboard';
  dashboardInvestimentoRota = '/dashboard-investimentos';
  pessoasRota = '/pessoas';
  categoriasRota = '/categorias';
  metodosDeCobrancaRota = '/metodo-de-cobranca';
  usuariosRota = '/usuarios';
  lancamentosRota = '/lancamentos';
  emissoresRota = '/emissores';
  setoresRota = '/setores';
  segmentoRota = '/segmentos';
  ordemRendaFixaRota = '/ordem-renda-fixa';
  ordemCompraRendaVariavelRota = '/ordens-de-compra';
  dividendosRota = '/controle-dividendos';
  historicoRendimentoRFRota = '/historico-renda-fixa';
  produtoRendaFixaRota = '/produto-renda-fixa';
  produtoRendaVariavelRota = '/produto-renda-variavel';


  constructor(
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.carregaMenuDetalhe();

    this.activeItem = this.items[0];

  }

  logout() {
    this.auth.limparAccessToken();
  }

  alertas() {

    alert("Em desenvolvimento");
  }


  carregaMenuDetalhe() {

      this.items = [{
        label: 'Dashboards',
        items: [
            {label: 'Dashboard Financeiro', icon: 'pi pi-chart-bar', command: () => this.navigateToDasboardFinanceiro()},
            {label: 'Dashboard Investimento', icon: 'pi pi-chart-line', command: () => this.navigateToDashboardInvestimento()}
        ]
    },

    {
        label: 'Cadastros',
        items: [
            {label: 'Pessoas', icon: 'pi pi-users',command: () => this.navigateToPessoas() },
            {label: 'Categorias', icon: 'pi pi-sitemap', command: () => this.navigateToCategorias() },
            {label: 'Método de cobrança', icon: 'pi pi-file-o', command: () => this.navigateToMetodoDeCobranca()},
            {label: 'Usuários', icon: 'pi pi-id-card', command: () => this.navigateToUsuarios()}
        ]
    },
    {
        label: 'Financeiro',
        items: [
            {label: 'Lançamentos', icon: 'pi pi-money-bill', command: () => this.navigateToLancamentos()}
        ]
    },
    {
      label: 'Área de investimentos',
      items: [
          {label: 'Cadastros', icon: 'pi pi-plus-circle',
          items: [
            {label: 'Emissores', command: () => this.navigateToEmissores()},
            {label: 'Setores', command: () => this.navigateToSetores()},
            {label: 'Segmentos', command: () => this.navigateToSegmento()},
            {separator:true},
            {label: 'Produto Renda Fixa', command: () => this.navigateToProdutoRendaFixa()},
            {separator:true},
            {label: 'Produto Renda Variavel', command: () => this.navigateToProdutoRendaVariavel()}
        ]
    },

    {label: 'Gerenciamento', icon: 'pi pi-wallet',
          items: [
            {label: 'Renda Fixa', icon: 'pi pi-dollar', command: () => this.navigateToOrdemRendaFixa()},
            {label: 'Renda Variável', icon: 'pi pi-money-bill', command: () => this.navigateToOrdemRendaVariavel()},
        ]
    },
    {separator:true},
    {label: 'Dividendos', icon: 'pi pi-dollar',command: () => this.navigateToControleDividendos() },
    {label: 'Historico rendimento RF', icon: 'pi pi-book',command: () => this.navigateToHistoricoRendaFixa() }
  ]
  }
  ];
  }


  navigateToDasboardFinanceiro() {
    this.router.navigate([this.dashboardFicanceiroRota]);
  }

  navigateToDashboardInvestimento() {
    this.router.navigate([this.dashboardInvestimentoRota]);
  }

  navigateToPessoas() {
    this.router.navigate([this.pessoasRota]);
  }

  navigateToCategorias() {
    this.router.navigate([this.categoriasRota]);
  }

  navigateToMetodoDeCobranca() {
    this.router.navigate([this.metodosDeCobrancaRota]);
  }

  navigateToUsuarios() {
    this.router.navigate([this.usuariosRota]);
  }

  navigateToLancamentos() {
    this.router.navigate([this.lancamentosRota]);
  }

  navigateToEmissores() {
    this.router.navigate([this.emissoresRota]);
  }

  navigateToSetores() {
    this.router.navigate([this.setoresRota]);
  }

  navigateToSegmento() {
    this.router.navigate([this.segmentoRota]);
  }

  navigateToOrdemRendaFixa() {
    this.router.navigate([this.ordemRendaFixaRota]);
  }

  navigateToOrdemRendaVariavel() {
    this.router.navigate([this.ordemCompraRendaVariavelRota]);
  }

  navigateToControleDividendos() {
    this.router.navigate([this.dividendosRota]);
  }

  navigateToHistoricoRendaFixa() {
    this.router.navigate([this.historicoRendimentoRFRota]);
  }

  navigateToProdutoRendaFixa() {
    this.router.navigate([this.produtoRendaFixaRota]);
  }

  navigateToProdutoRendaVariavel() {
    this.router.navigate([this.produtoRendaVariavelRota]);
  }



}
