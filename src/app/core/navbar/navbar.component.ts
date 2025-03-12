import { ThemeService } from './../../services/theme.service';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { ErrorHandlerService } from '../error-handler.service';
import { LogoutService } from '../../seguranca/logout.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('subMenu') subMenu: any;

  temaColor: string = '#172230';

  alertasAutomaticos = [];

  codigoUsuarioLogado: string;
  qtdAlertasBadge = 0;

  exibindoMenu = false;

  items: MenuItem[];
  items2: MenuItem[];
  activeItem: MenuItem;

  itemsBadge: MenuItem[];

  dashboardFicanceiroRota = '/dashboard';
  dashboardInvestimentoRota = '/dashboard-investimentos';

  pessoasRota = '/pessoas';
  categoriasRota = '/categorias';
  metodosDeCobrancaRota = '/metodo-de-cobranca';
  usuariosRota = '/usuarios';
  bancosRota = '/bancos';
  coresConfigRota = '/cores';

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
  acompanhamentoEstrategicoRota = '/acompanhamento-estrategico';

  origem = '/origens';
  wallets = 'wallets';
  criptoTransacao = 'cripto-transacao';

  alertasAutomaticosRota = '/avisos-automaticos';


  constructor(
    public auth: AuthService,
    private router: Router,
    private navBarService: NavbarService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private themeService: ThemeService,
    private logoutService: LogoutService,
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? "";

    this.themeService.currentTheme$.subscribe(theme => {
      if (theme === 'vela-blue') {
        this.temaColor = '#1f2d40';
      } else {
        this.temaColor = 'white';
      }
    });

    this.carregaMenuDetalhe();

    this.activeItem = this.items[0];

    this.pesquisaQtdAlertas();
    this.pesquisaAlertasAutomaticos();

    //setInterval(function() {
      //alert("Este é um alerta a cada 5 segundos!");
    //}, 10000); // 5000 milissegundos = 5 segundos

    this.items2 = [
      { label: 'Item 1', icon: 'pi pi-fw pi-home' },
      { label: 'Item 2', icon: 'pi pi-fw pi-calendar' },
      { label: 'Item 3', icon: 'pi pi-fw pi-pencil' }
    ];

  }

  logout() {
    //this.auth.limparAccessToken();
    this.logoutService.logout()
  }

  pesquisaQtdAlertas() {

    this.navBarService.retornaQuantidadeTotalDeAlertas(this.codigoUsuarioLogado)
    .then(response => {
      this.qtdAlertasBadge = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  pesquisaAlertasAutomaticos() {

    this.navBarService.retornaAlertasNaoVisualizados(this.codigoUsuarioLogado)
    .then(response => {
      this.alertasAutomaticos = response;
      this.items2 = this.alertasAutomaticos.map(alerta => {
        return {
          label: alerta.titulo,
          command: () => this.exibirMensagem(alerta.mensagem) // Ação a ser executada ao selecionar o item do menu
        };
      });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  // Método para exibir a mensagem do alerta
  exibirMensagem(mensagem: string) {
    //alert(mensagem);
    this.messageService.add({ severity: 'info', detail: mensagem, closable: true });
  }



  //************************************ MENU ************************************************************************** */


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
            {label: 'Usuários', icon: 'pi pi-id-card', command: () => this.navigateToUsuarios()},
            {label: 'Bancos', icon: 'pi pi-building', command: () => this.navigateToBanco()},
            {separator:true},
            {
              label: 'Configurações', icon: 'pi pi-cog',
              items: [
                  {label: 'Cores', icon: 'pi pi-palette', command: () => this.navigateToCoresConfig()}
              ]
          }
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
              {separator:true},
              {label: 'Acompanhamento estratégico', command: () => this.navigateToAcompanhamentoEstrategico()}
          ]
      },

      {label: '<img src="assets/bitcoin-circle.png" width="16" height="18" style="margin-right: 5px;"> Criptomoeda', escape: false,
        items: [
          {label: 'Cadastro Origem', icon: 'pi pi-building', command: () => this.navigateToOrigem()},
          {label: 'Cadastro Wallet', icon: 'pi pi-wallet', command: () => this.navigateToWallet()},
          {separator:true},
          {label: 'Transações cripto', icon: 'pi pi-dollar', command: () => this.nativateToCriptoTransacao()}
      ]
  },

      {separator:true},
      {label: 'Dividendos', icon: 'pi pi-dollar',command: () => this.navigateToControleDividendos() },
      {label: 'Historico rendimento RF', icon: 'pi pi-book',command: () => this.navigateToHistoricoRendaFixa() }
    ]
    },
    {
      label: 'Alertas',
      items: [
          {label: 'Alertas', icon: 'pi pi-bell', command: () => this.navigateToAlertas()}
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

  navigateToBanco() {
    this.router.navigate([this.bancosRota]);
  }

  navigateToAcompanhamentoEstrategico() {
    this.router.navigate([this.acompanhamentoEstrategicoRota]);
  }

  navigateToAlertas() {
    this.router.navigate([this.alertasAutomaticosRota]);
  }

  navigateToCoresConfig() {
    this.router.navigate([this.coresConfigRota]);
  }

  navigateToOrigem() {
    this.router.navigate([this.origem])
  }

  navigateToWallet() {
    this.router.navigate([this.wallets])
  }

  nativateToCriptoTransacao() {
    this.router.navigate([this.criptoTransacao])
  }


  //************************************ FIM MENU ************************************************************************** */



}
