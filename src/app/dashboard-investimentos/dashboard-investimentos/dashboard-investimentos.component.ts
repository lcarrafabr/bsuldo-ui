import { ActivatedRoute, Router } from '@angular/router';
import { DashboardInvestimentosService } from './../dashboard-investimentos.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-dashboard-investimentos',
  templateUrl: './dashboard-investimentos.component.html',
  styleUrls: ['./dashboard-investimentos.component.css']
})
export class DashboardInvestimentosComponent implements OnInit {

  temaColor: string = '#172230';
  currentTheme: string;


  filtroGriProventosRecebidosEFuturos = [
    {label: 'AMBOS', value: 'AMBOS'},
    {label: 'RECEBIDOS', value: 'RECEBIDO'},
    {label: 'A RECEBER', value: 'A_RECEBER'}
  ]

  panelHeaderTemplate = 'Histórico mensal';

  codigoUsuarioLogado: string;

  dataSelecionada: Date;
  totalDivRecebido: any = 0;
  valorTotalAplicadoRF: any = 0;
  valorTotalResgatadoRF: any = 0;
  valorAplicadoDisponivelRF: any = 0;
  valorInvestidoRV: any = 0;

  //==== TAB MENU 01  ===================

  ano: string
  mes: string

  graficoBarrasDividendoRecebido: any;
  basicOptions: any;
  basicOptionsVelaBlue: any;
  labels = [];
  valorrecebido = [];
  options: any;

  totalDivRecebidoNoAno = [];
  historicoProvendosFuturosGrid = [];
  totalDivRecebidogrid: any;

  valorDivRecGridJAN: any;
  valorDivRecGridFEV: any;
  valorDivRecGridMAR: any;
  valorDivRecGridABR: any;
  valorDivRecGridMAI: any;
  valorDivRecGridJUN: any;
  valorDivRecGridJUL: any;
  valorDivRecGridAGO: any;
  valorDivRecGridSET: any;
  valorDivRecGridOUT: any;
  valorDivRecGridNOV: any;
  valorDivRecGridDEZ: any;
  valorTotalDivGrid: any;

  graficoBarrasDivMesEAno: any;
  labelsGraficoDivMesEAno = [];
  valorRcebidoGraficoDivMesEAno = [];

  filtroSelecionado: string;
  gridProventosRecebidosEFuturos = [];


  //==== TAB MENU 02  ===================
  relatorioBasicoVisualizacao = [];
  relatorioBasicoComDivRecebido = [];
  graficoPizzaTotalCarteira: any;
  graficoPercentualAcoes: any;
  graficoPercentualFiis: any;
  relatorioCompletoAcoesGrid = [];
  relatorioCompletoFIISsGrid = [];
  relatorioCompletoBRDsGrid = [];

  relatorioSegmentoAcoes = [];
  relatorioSetoresAcoes = [];

  relatorioSegmentoFIIS = [];
  relatorioSetoresFIIS = [];

  graficoPorSegmentoAcoes: any;
  graficoPorSetoresAcoes: any;

  graficoPorSegmentoFIIS: any;
  graficoPorSetoresFIIS: any;

  totalProjetivoGridAcoes: number = 0;
  totalInvestidoAcoesGrid: number = 0;

  totalProjetivoGridAFiis: number = 0;
  totalInvestidoFiisGrid: number = 0;

  totalProjetivoGridBDR: number = 0;
  totalInvestidoBDRGrid: number = 0;

  quantidadeTotalAcoes: number = 0;
  quantidadeTotalFiis: number = 0;
  quantidadeTotalBDR: number = 0;

  graficoPizzaAcoesFiis: any;
  graficoPizzaAcoesFiisRendaFixa: any;

  progresbarAcoes: any;


  backgroundColorPadrao01 = [];
  hoverBackgroundColorPadrao01 = [];
  borderColorPadrao01 = [];

  backgroundColorido01 = [
    '#FF573366', '#33FF5766', '#3357FF66', '#FF33A666', '#A633FF66',
    '#33FFF066', '#FFBD3366', '#DB33FF66', '#33FF8E66', '#FF333366',
    '#33FFBD66', '#5733FF66', '#FF33F666', '#FFAF3366', '#F633FF66',
    '#33FF5766', '#FF33A666', '#A6FF3366', '#5733FF66', '#FF33BD66',
    '#33FF7366', '#FF335766', '#57FF3366', '#33A6FF66', '#FF573366',
    '#33FFBD66', '#AF33FF66', '#33FFAF66', '#FF573366', '#3357FF66',
    '#33FF5766', '#FF33BD66', '#57FF3366', '#FF33A666', '#AF33FF66',
    '#33FF5766', '#FF33AF66', '#5733FF66', '#FF33BD66', '#33FFBD66'
  ];


  backgroundColorVelaBlue = ['#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99',
    '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99',
    '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99',
    '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99',
    '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99',
    '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99', '#1adbdb99'];

    backgroundColorSagaPurple = ['#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66',
  '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66','#3b2dff66', '#3b2dff66',
  '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66',
  '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66',
  '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66',
  '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66'];

  borderColorPadraoVelaBlue = ['#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f',
    '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f',
    '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f',
    '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f',
    '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f',
    '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f', '#0d8f8f'];

  borderColorPadraoSagaPurple = ['#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff',
    '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff',
    '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff',
    '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff',
    '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff',
    '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff'
  ];

  hoverBackgroundColorPadraoSagaPurple = ['#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99',
    '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99',
  '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99',
  '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99',
  '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99',
  '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99'];

  hoverBackgroundColorPadraoVelaBlue = ['#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363',
    '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363',
    '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363',
    '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363',
    '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363',
    '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363', '#0b6363'
  ];




  graficoBarrasQtdTotalCotasEAcoes: any;

  private intervalId: any;
  private interval02Id: any;

  constructor(
    private title: Title,
    private dashboardInvestimentoService: DashboardInvestimentosService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';
    this.title.setTitle('Dashboard de Investimentos');

    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
      if (theme === 'vela-blue') {
        this.temaColor = '#1f2d40';
        this.backgroundColorPadrao01 = this.backgroundColorVelaBlue;
        this.borderColorPadrao01 = this.borderColorPadraoVelaBlue;
        this.hoverBackgroundColorPadrao01 = this.hoverBackgroundColorPadraoVelaBlue;
      }
      if (theme === 'saga-purple') {
        this.temaColor = 'white';
        this.backgroundColorPadrao01 = this.backgroundColorSagaPurple;
        this.borderColorPadrao01 = this.borderColorPadraoSagaPurple;
        this.hoverBackgroundColorPadrao01 = this.hoverBackgroundColorPadraoSagaPurple;
      }
    });

    this.dataSelecionada = new Date();

    this.atualizarDashboard();

    //this.retornaRelatorioCompletoFIISGrid();

    const delay = 1000;

// Chame o segundo método após o delay
    (window as any).setTimeout(() => {
      this.retornaRelatorioCompletoFIISGrid();
    }, delay)

    // Inicie o intervalo após um atraso inicial de 10 segundos
    this.intervalId = setInterval(() => {
      this.zone.run(() => {
        this.atualizaGridACoes();
        (window as any).setTimeout(() => {
          this.retornaRelatorioCompletoFIISGrid();
        }, delay)
        (window as any).setTimeout(() => {
          this.retornaRelatorioCompletoBDRsGrid();
        }, delay)
      });

    }, 30 * 60 * 1000);

    // Chame o terceiro método após o delay
   // (window as any).setTimeout(() => {
     // this.retornaRelatorioCompletoBDRsGrid();
    //}, delay)

    // Inicie o intervalo após um atraso inicial de 10 segundos
    this.intervalId = setInterval(() => {
      this.zone.run(() => {
        this.atualizaGridACoes();
        (window as any).setTimeout(() => {
          this.retornaRelatorioCompletoBDRsGrid();
        }, delay)
      });
    }, 30 * 60 * 1000);

    this.retornaRelatorioCompletoBDRsGrid();

  }

  ngOnDestroy(): void {
    // Limpe o intervalo ao destruir o componente
    clearInterval(this.intervalId);
    clearInterval(this.interval02Id);
  }


  atualizarDashboard() {

     //====TAB menu 01 ======

     this.preencherAnoEMesComDataSelecionada();
    this.totalDividendoRecebido();
    this.pesquisarTotalInvestido();
    this.pesquisarTotalResgatado();
    this.pesquisarTotalDisponivel();
    this.pesquisarTotalDInvestidoRendaVariavel();
    this.graficoBarrasDividendosRecebidosMesEAno();

    this.configuraGraficoBarrasDividendosRecebidos();
    this.configuraGraficoBarrasQtdTotalCotasEAcoes();

    this.buscaTotalDivsRecebidosNoAnoGRID();
    this.retornaQuatidadeTotalCotasEAcoes();
    this.buscaTotalDivsRecebidosNoAnoGRID();
    this.retornaQuatidadeTotalCotasEAcoes();

    this.configuraGraficoPizzaAcoesFiis();
    this.graficoBarrasGetDadosGraficoDivMesEAno();
    this.configuraGraficoBarrasBarrasGetDadosGraficoDivMesEAno();
    this.buscaProventosFuturos();
    this.buscaTotalProventosRecebidosEFuturos();

    //====TAB menu 02 ======

    this.retornaRelatorioCompletoACOESGrid();


    this.retornaRelatorioBasicoVisualizacao();
    this.configuraGraficoPizzaCarteiraCompleta();
    this.configuraGraficoPizzaAcoesFiisRendaFixa();
    this.retornaRelatorioBasicoComDivRecebido();
    this.graficorelatorioPorSegmentoAcoes();
    this.graficorelatorioPorSetoresAcoes();
    this.graficorelatorioPorSegmentoFIIS();
    this.graficorelatorioPorSetoresFIIS();

  }


  getStyles() {
    if (this.currentTheme === 'saga-purple') {
      return {
        color: '#FFFFFF',
        backgroundColor: '#b31535',
        defaultColor: '#1c4f2a',
        defaultBackgroundColor: '#FFFFFF'
      };
    } else if (this.currentTheme === 'vela-blue') {
      return {
        color: '#FFFFFF', // Estilo para erro no tema vela-blue
        backgroundColor: '#b31535', // Fundo para erro no tema vela-blue
        defaultColor: '#FFFFFF', // Estilo padrão no tema vela-blue
        defaultBackgroundColor: '#1f2d40' // Fundo padrão no tema vela-blue
      };

    }
  }


  preencherAnoEMesComDataSelecionada(): void {
    // Verifica se a data selecionada é válida
    if (!this.dataSelecionada) {
      console.error('Data selecionada inválida.');
      return;
    }

    // Extrai o ano e o mês da data selecionada
    const ano = this.dataSelecionada.getFullYear().toString();
    const mes = (this.dataSelecionada.getMonth() + 1).toString().padStart(2, '0'); // Adiciona um zero à esquerda se for necessário

    // Atribui os valores ao ano e ao mês
    this.ano = ano;
    this.mes = mes;
  }

  atualizaGridACoes() {

    this.retornaRelatorioCompletoACOESGrid();
  }

  atualizaGridFiiss() {

    this.retornaRelatorioCompletoFIISGrid();
  }

  totalDividendoRecebido() {

    this.dashboardInvestimentoService.totalDividendoRecebido(this.codigoUsuarioLogado)
    .then(response => {
      this.totalDivRecebido = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  pesquisarTotalInvestido() {

    this.dashboardInvestimentoService.listarTotalInvestido()
    .then(response => {
      this.valorTotalAplicadoRF = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  pesquisarTotalResgatado() {

    this.dashboardInvestimentoService.listarTotalResgatado()
    .then(response => {
      this.valorTotalResgatadoRF = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  pesquisarTotalDisponivel() {

    this.dashboardInvestimentoService.listarTotalDisponivel()
    .then(response => {
      this.valorAplicadoDisponivelRF = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  pesquisarTotalDInvestidoRendaVariavel() {

    this.dashboardInvestimentoService.listarTotalInvestidoRV(this.codigoUsuarioLogado)
    .then(response => {
      this.valorInvestidoRV = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  graficoBarrasDividendosRecebidosMesEAno() {

    this.dashboardInvestimentoService.retornaDivsRecebidosPorMesEAno(this.codigoUsuarioLogado)
    .then(response => {
     this.labels = response.dataReferencia
     this.valorrecebido = response.valorRecebido

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }


  configuraGraficoBarrasDividendosRecebidos() {
    this.dashboardInvestimentoService.retornaDivsRecebidosPorMesEAno(this.codigoUsuarioLogado)
      .then(dados => {
        const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

        this.graficoBarrasDividendoRecebido = {
          labels: formattedDates,
          datasets: [
            {
              label: 'Dividendos por mês',
              data: dados.map(dado => dado.valorRecebido),
              backgroundColor: this.backgroundColorPadrao01,
              hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
              borderColor: this.borderColorPadrao01,
              borderWidth: 1,
              datalabels: {
                anchor: 'end',
                align: 'top',
              }
            }
          ]
        };

        this.verificaOption();

        this.adicionarValoresAosRotulos();
      });
  }


  verificaOption() {
    if(this.currentTheme === 'vela-blue') {
      this.basicOptionsVelaBlue = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              fontColor: '#FFFFFF' // Cor do texto dos rótulos do eixo X
            }
          }],
          yAxes: [{
            ticks: {
              fontColor: '#FFFFFF' // Cor do texto dos rótulos do eixo Y
            }
          }]
        },
        legend: {
          labels: {
            fontColor: '#FFFFFF' // Cor do texto da legenda
          }
        },
        title: {
          display: true,
          text: 'Dividendos recebidos',
          fontColor: '#FFFFFF' // Cor do texto do título
        }
      };
    } else {
      this.basicOptionsVelaBlue = this.basicOptions;
    }
  }

  basicOptionsConfig() {
    this.basicOptions = {
      legend: {
        labels: {
          fontColor: '#495057'
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: '#495057'
          }
        }]
      },
      plugins: {
        datalabels: {
          color: 'black', // Cor dos rótulos
          display: true
          // ... outras opções do plugin conforme necessário
        }
      }
    };
  }

adicionarValoresAosRotulos() {
  // Adicione os valores ao array de labels
  this.graficoBarrasDividendoRecebido.labels = this.graficoBarrasDividendoRecebido.labels.map(
    (label, index) => `${label} - R$ ${this.graficoBarrasDividendoRecebido.datasets[0].data[index].toString().replace('.', ',')}`
  );
}

buscaTotalDivsRecebidosNoAnoGRID() {

  this.dashboardInvestimentoService.retornaDivsRecebidosPorAnoGRID(this.codigoUsuarioLogado)
  .then(response => {
    this.valorDivRecGridJAN = response[0].jan;
    this.valorDivRecGridFEV = response[0].fev;
    this.valorDivRecGridMAR = response[0].mar;
    this.valorDivRecGridABR = response[0].abr;
    this.valorDivRecGridMAI = response[0].mai;
    this.valorDivRecGridJUN = response[0].jun;
    this.valorDivRecGridJUL = response[0].jul;
    this.valorDivRecGridAGO = response[0].ago;
    this.valorDivRecGridSET = response[0].set;
    this.valorDivRecGridOUT = response[0].out;
    this.valorDivRecGridNOV = response[0].nov;
    this.valorDivRecGridDEZ = response[0].dez;
    this.valorTotalDivGrid = response[0].total;
   this.totalDivRecebidoNoAno = response;
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

retornaQuatidadeTotalCotasEAcoes() {

  this.dashboardInvestimentoService.retornaQuatidadeTotalCotasEAcoes(this.codigoUsuarioLogado)
  .then(response => {
    //console.log(response);
    //this.valorInvestidoRV = response;
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

configuraGraficoBarrasQtdTotalCotasEAcoes() {
  this.dashboardInvestimentoService.retornaQuatidadeTotalCotasEAcoes(this.codigoUsuarioLogado)
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.graficoBarrasQtdTotalCotasEAcoes = {
        labels: dados.map(dado => dado.ticker),
        datasets: [
          {
            label: 'Ticker',
            type: 'bar',
            data: dados.map(dado => dado.quantidadeCotas),
            backgroundColor: this.backgroundColorPadrao01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          },
          {
            label: 'Percentual investido',
            type: 'line',
            fill: false,
            data: dados.map(dado => dado.percentualValorInvestido),
            backgroundColor: this.backgroundColorPadrao01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: ['rgba(22, 33, 84, 0.6)'],
            borderWidth: 1.5,
            tension: 0.4,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarValoresAosRotulos_configuraGraficoBarrasQtdTotalCotasEAcoes();
    });
}

adicionarValoresAosRotulos_configuraGraficoBarrasQtdTotalCotasEAcoes() {
  // Adicione os valores ao array de labels
  this.graficoBarrasQtdTotalCotasEAcoes.labels = this.graficoBarrasQtdTotalCotasEAcoes.labels.map(
    (label, index) => `${label} - ${this.graficoBarrasQtdTotalCotasEAcoes.datasets[0].data[index]}`
  );
}



configuraGraficoBarrasBarrasGetDadosGraficoDivMesEAn() {

  this.ano = '2024';
  this.mes = '4';

  this.dashboardInvestimentoService.getDadosGraficoDivMesEAno(this.ano, this.mes, this.codigoUsuarioLogado)
    .then(dados => {

      this.graficoBarrasQtdTotalCotasEAcoes = {
        labels: dados.map(dado => dado.ticker),
        datasets: [
          {
            label: 'Ticker',
            type: 'bar',
            data: dados.map(dado => dado.valorRecebido),
            backgroundColor: this.backgroundColorPadrao01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

     // this.adicionarValoresAosRotulos_configuraGraficoBarrasQtdTotalCotasEAcoes();
    });
}


graficoBarrasGetDadosGraficoDivMesEAno() {

  this.ano = '2024';
  this.mes = '4';

  this.dashboardInvestimentoService.getDadosGraficoDivMesEAno(this.ano, this.mes, this.codigoUsuarioLogado)
  .then(response => {
   this.labelsGraficoDivMesEAno = response.ticker
   this.valorRcebidoGraficoDivMesEAno = response.valorRecebido

  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

configuraGraficoBarrasBarrasGetDadosGraficoDivMesEAno() {

  this.preencherAnoEMesComDataSelecionada();

  this.dashboardInvestimentoService.getDadosGraficoDivMesEAno(this.ano, this.mes, this.codigoUsuarioLogado)
    .then(dados => {

      this.graficoBarrasDivMesEAno = {
        labels: dados.map(dado => dado.ticker),
        datasets: [
          {
            label: 'Ticker',
            type: 'bar',
            data: dados.map(dado => dado.valorRecebido),
            backgroundColor: this.backgroundColorPadrao01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarValoresAosRotulos_configuraGraficoBarrasBarrasGetDadosGraficoDivMesEAno();
    });
}

adicionarValoresAosRotulos_configuraGraficoBarrasBarrasGetDadosGraficoDivMesEAno() {
  // Adicione os valores ao array de labels
  this.graficoBarrasDivMesEAno.labels = this.graficoBarrasDivMesEAno.labels.map(
    (label, index) => `${label} - R$${this.graficoBarrasDivMesEAno.datasets[0].data[index].toFixed(2)}`
  );
}


buscaProventosFuturos() {

  this.dashboardInvestimentoService.retornaHistoricoProventosFuturos(this.codigoUsuarioLogado)
  .then(response => {
   this.historicoProvendosFuturosGrid = response;
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));

}

buscaTotalProventosRecebidosEFuturos() {

  if(this.filtroSelecionado == null) {
    this.filtroSelecionado = 'AMBOS';
  }

  this.dashboardInvestimentoService.retornaProventosRecebidosEFuturos(this.codigoUsuarioLogado, this.filtroSelecionado)
  .then(response => {
   this.gridProventosRecebidosEFuturos = response;
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}





//=================== TAB MENU 02 ========================================================================


retornaRelatorioCompletoACOESGrid() {

  this.dashboardInvestimentoService.retornaRelatorioCompletoAcoesGrid(this.codigoUsuarioLogado)
  .then(response => {
    this.relatorioCompletoAcoesGrid = response;
    this.calculaTotaisAcoesGrid(response);
    this.graficoPercentualAcoesPizza(response);
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

retornaRelatorioCompletoFIISGrid() {

  this.dashboardInvestimentoService.retornaRelatorioCompletoFIISGrid(this.codigoUsuarioLogado)
  .then(response => {
    this.relatorioCompletoFIISsGrid = response;
    this.calculaTotaisFiissGrid(response);
    this.graficoPercentualFiisPizza(response);
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

retornaRelatorioCompletoBDRsGrid() {

  this.dashboardInvestimentoService.retornaRelatorioCompletoBRDsGrid(this.codigoUsuarioLogado)
  .then(response => {
    console.log(response);
    this.relatorioCompletoBRDsGrid = response;
    this.calculaTotaisBDRGrid(response);
    //this.graficoPercentualFiisPizza(response);
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

retornaRelatorioBasicoVisualizacao() {

  this.dashboardInvestimentoService.retornaRelatorioBasicoVisualizacao(this.codigoUsuarioLogado)
  .then(response => {
    this.relatorioBasicoVisualizacao = response;
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

retornaRelatorioBasicoComDivRecebido() {

  this.dashboardInvestimentoService.retornaRelatorioBasicComDivRecebido(this.codigoUsuarioLogado)
  .then(response => {
    this.relatorioBasicoComDivRecebido = response;
  })
  .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
}

configuraGraficoPizzaCarteiraCompleta() {
  this.dashboardInvestimentoService.retornaRelatorioBasicoVisualizacao(this.codigoUsuarioLogado)
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.graficoPizzaTotalCarteira = {
        labels: dados.map(dado => dado.ticker),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dados.map(dado => dado.valorInvestido),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarValoresAosRotulos();
    });
}


configuraGraficoPizzaAcoesFiis() {
  this.dashboardInvestimentoService.retornaRelatorioAcoesFiis(this.codigoUsuarioLogado)
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.graficoPizzaAcoesFiis = {
        labels: dados.map(dado => dado.tipoAtivoEnum),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dados.map(dado => dado.percentual),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarValoresAosRotulosgraficoacoesFiis();
    });
}

 private adicionarValoresAosRotulosgraficoacoesFiis() {
  // Adicione os valores ao array de labels
  this.graficoPizzaAcoesFiis.labels = this.graficoPizzaAcoesFiis.labels.map(
    (label, index) => `${label}: ${this.graficoPizzaAcoesFiis.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}

//-------------------------------------------------------------------------------------------------------------------------

configuraGraficoPizzaAcoesFiisRendaFixa() {
  this.dashboardInvestimentoService.retornaRelatorioAcoesFiisRendaFixa(this.codigoUsuarioLogado)
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.graficoPizzaAcoesFiisRendaFixa = {
        labels: dados.map(dado => dado.tipoAtivoEnum),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dados.map(dado => dado.percentual),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarValoresAosRotulosgraficoacoesFiisRendaFixa();
    });
}

 private adicionarValoresAosRotulosgraficoacoesFiisRendaFixa() {
  // Adicione os valores ao array de labels
  this.graficoPizzaAcoesFiisRendaFixa.labels = this.graficoPizzaAcoesFiisRendaFixa.labels.map(
    (label, index) => `${label}: ${this.graficoPizzaAcoesFiisRendaFixa.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}

//-------------------------------------------------------------------------------------------------------------------------

graficoPercentualAcoesPizza(dadosAcoes: any) { //ESSE GRAFICO USA A CHAMADA DE OUTRO METODO E JA RECEBE O RESPONSE COMO PARAMETRO

      this.graficoPercentualAcoes = {
        labels: dadosAcoes.map(dado => dado.ticker),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dadosAcoes.map(dado => dado.percentualValorInvestido),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarValoresAosRotulosgraficoPercentualAcoesPizza();

}

adicionarValoresAosRotulosgraficoPercentualAcoesPizza() {
  // Adicione os valores ao array de labels
  this.graficoPercentualAcoes.labels = this.graficoPercentualAcoes.labels.map(
    (label, index) => `${label}: ${this.graficoPercentualAcoes.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}

graficoPercentualFiisPizza(dadosFiis: any) { //ESSE GRAFICO USA A CHAMADA DE OUTRO METODO E JA RECEBE O RESPONSE COMO PARAMETRO

  this.graficoPercentualFiis = {
    labels: dadosFiis.map(dado => dado.ticker),
    datasets: [
      {
        //label: 'Dividendos por mês',
        type: 'pie',
        data: dadosFiis.map(dado => dado.percentualValorInvestido),
        backgroundColor: this.backgroundColorido01,
        hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
        borderColor: this.borderColorPadrao01,
        borderWidth: 1,
        datalabels: {
          anchor: 'end',
          align: 'top',
        }
      }
    ]
  };

  this.adicionarValoresAosRotulosgraficoPercentualFiisPizza();

}

adicionarValoresAosRotulosgraficoPercentualFiisPizza() {
  // Adicione os valores ao array de labels
  this.graficoPercentualFiis.labels = this.graficoPercentualFiis.labels.map(
    (label, index) => `${label}: ${this.graficoPercentualFiis.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}


graficorelatorioPorSegmentoAcoes() {
  this.dashboardInvestimentoService.relatorioPorSegmento(this.codigoUsuarioLogado, "ACOES")
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.relatorioSegmentoAcoes = dados;
      this.graficoPorSegmentoAcoes = {
        labels: dados.map(dado => dado.nomeSegmento),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dados.map(dado => dado.percentual),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarRotuloGraficoPorSegmentoAcoes();
    });
}

 private adicionarRotuloGraficoPorSegmentoAcoes() {
  // Adicione os valores ao array de labels
  this.graficoPorSegmentoAcoes.labels = this.graficoPorSegmentoAcoes.labels.map(
    (label, index) => `${label}: ${this.graficoPorSegmentoAcoes.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}


graficorelatorioPorSetoresAcoes() {
  this.dashboardInvestimentoService.relatorioPorSetores(this.codigoUsuarioLogado, "ACOES")
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.relatorioSetoresAcoes = dados;
      this.graficoPorSetoresAcoes = {
        labels: dados.map(dado => dado.nomeSetor),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dados.map(dado => dado.percentual),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarRotuloGraficoPorSetoress();
    });
}

 private adicionarRotuloGraficoPorSetoress() {
  // Adicione os valores ao array de labels
  this.graficoPorSetoresAcoes.labels = this.graficoPorSetoresAcoes.labels.map(
    (label, index) => `${label}: ${this.graficoPorSetoresAcoes.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}


graficorelatorioPorSegmentoFIIS() {
  this.dashboardInvestimentoService.relatorioPorSegmento(this.codigoUsuarioLogado, "FIIS")
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.relatorioSegmentoFIIS = dados;
      this.graficoPorSegmentoFIIS = {
        labels: dados.map(dado => dado.nomeSegmento),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dados.map(dado => dado.percentual),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarRotuloGraficoPorSegmentoFIIS();
    });
}

 private adicionarRotuloGraficoPorSegmentoFIIS() {
  // Adicione os valores ao array de labels
  this.graficoPorSegmentoFIIS.labels = this.graficoPorSegmentoFIIS.labels.map(
    (label, index) => `${label}: ${this.graficoPorSegmentoFIIS.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}


graficorelatorioPorSetoresFIIS() {
  this.dashboardInvestimentoService.relatorioPorSetores(this.codigoUsuarioLogado, "FIIS")
    .then(dados => {
      //const formattedDates = dados.map(dado => moment(dado.dataReferencia).format('MMM/YYYY'));

      this.relatorioSetoresFIIS = dados;
      this.graficoPorSetoresFIIS = {
        labels: dados.map(dado => dado.nomeSetor),
        datasets: [
          {
            //label: 'Dividendos por mês',
            type: 'pie',
            data: dados.map(dado => dado.percentual),
            backgroundColor: this.backgroundColorido01,
            hoverBackgroundColor: this.hoverBackgroundColorPadrao01,
            borderColor: this.borderColorPadrao01,
            borderWidth: 1,
            datalabels: {
              anchor: 'end',
              align: 'top',
            }
          }
        ]
      };

      this.adicionarRotuloGraficoPorSetoresFIIS();
    });
}

 private adicionarRotuloGraficoPorSetoresFIIS() {
  // Adicione os valores ao array de labels
  this.graficoPorSetoresFIIS.labels = this.graficoPorSetoresFIIS.labels.map(
    (label, index) => `${label}: ${this.graficoPorSetoresFIIS.datasets[0].data[index].toString().replace('.', ',')}%`
  );
}

private calculaTotaisAcoesGrid(relatorioCompletoAcoesGrid: any[]) {

  let valortotalProjetivo = 0;
  let valorTotalInvestido = 0;
  let qtdTotalAcoes = 0;

  for (const acao of relatorioCompletoAcoesGrid) {
    if (acao.ganhoPerdaProjetiva || acao.ganhoPerdaProjetiva == 0) {

      valortotalProjetivo = valortotalProjetivo + acao.ganhoPerdaProjetiva;
      valorTotalInvestido = valorTotalInvestido + acao.valorInvestido
      qtdTotalAcoes = qtdTotalAcoes + acao.quantidadeCotas;
    }
  }

  this.totalProjetivoGridAcoes = valortotalProjetivo;
  this.totalInvestidoAcoesGrid = valorTotalInvestido;
  this.quantidadeTotalAcoes = qtdTotalAcoes;
}

private calculaTotaisFiissGrid(relatorioCompletoFiisGrid: any[]) {

  let valortotalProjetivo = 0;
  let valorTotalInvestido = 0;
  let qtdTotalFiis = 0;

  for (const fiis of relatorioCompletoFiisGrid) {
    if (fiis.ganhoPerdaProjetiva || fiis.ganhoPerdaProjetiva == 0) {

      valortotalProjetivo = valortotalProjetivo + fiis.ganhoPerdaProjetiva;
      valorTotalInvestido = valorTotalInvestido + fiis.valorInvestido
      qtdTotalFiis = qtdTotalFiis + fiis.quantidadeCotas;
    }
  }

  this.totalProjetivoGridAFiis = valortotalProjetivo;
  this.totalInvestidoFiisGrid = valorTotalInvestido;
  this.quantidadeTotalFiis = qtdTotalFiis;
}

private calculaTotaisBDRGrid(relatorioCompletoBRDsGridGrid: any[]) {

  let valortotalProjetivo = 0;
  let valorTotalInvestido = 0;
  let qtdTotalFiis = 0;

  for (const bdrs of relatorioCompletoBRDsGridGrid) {
    if (bdrs.ganhoPerdaProjetiva || bdrs.ganhoPerdaProjetiva == 0) {

      valortotalProjetivo = valortotalProjetivo + bdrs.ganhoPerdaProjetiva;
      valorTotalInvestido = valorTotalInvestido + bdrs.valorInvestido
      qtdTotalFiis = qtdTotalFiis + bdrs.quantidadeCotas;
    }
  }

  this.totalProjetivoGridBDR = valortotalProjetivo;
  this.totalInvestidoBDRGrid = valorTotalInvestido;
  this.quantidadeTotalBDR = qtdTotalFiis;
}



}
