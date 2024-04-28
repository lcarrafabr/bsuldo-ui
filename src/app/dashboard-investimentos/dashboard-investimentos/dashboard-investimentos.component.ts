import { ActivatedRoute, Router } from '@angular/router';
import { DashboardInvestimentosService } from './../dashboard-investimentos.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-investimentos',
  templateUrl: './dashboard-investimentos.component.html',
  styleUrls: ['./dashboard-investimentos.component.css']
})
export class DashboardInvestimentosComponent implements OnInit {

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
  labels = [];
  valorrecebido = [];
  options: any;

  totalDivRecebidoNoAno = [];
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


  //==== TAB MENU 02  ===================
  relatorioBasicoVisualizacao = [];
  relatorioBasicoComDivRecebido = [];
  graficoPizzaTotalCarteira: any;
  graficoPercentualAcoes: any;
  graficoPercentualFiis: any;
  relatorioCompletoAcoesGrid = [];
  relatorioCompletoFIISsGrid = []

  totalProjetivoGridAcoes: number = 0;
  totalInvestidoAcoesGrid: number = 0;

  totalProjetivoGridAFiis: number = 0;
  totalInvestidoFiisGrid: number = 0;

  quantidadeTotalAcoes: number = 0;
  quantidadeTotalFiis: number = 0;

  graficoPizzaAcoesFiis: any;
  graficoPizzaAcoesFiisRendaFixa: any;


  backgroundColorPadrao01 = ['#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66',
  '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66'];

  hoverBackgroundColorPadrao01 = ['#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99',
  '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99', '#24126e99'];

borderColorPadrao01 = ['#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff',
'#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff', '#9966ff'];

backgroundColorido01 = ['#3b2dff66', '#611f3066', '#2d6b7966', '#b3532066', '#dbf20566',
'#44bd0866', '#bd08ae66', '#bd083866', '#3b2dff66', '#3b2dff66', '#3b2dff66', '#3b2dff66'];


  backgroundColorPadrao01_OLD = ['rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)',
  'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)',
  'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)'];

  hoverBackgroundColorPadrao01_OLD = ['rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)',
  'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)',
  'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)', 'rgba(36, 18, 110, 0.6)'];

  borderColorPadrao01_OLD = ['rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)',
  'rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)',
  'rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)','rgb(153, 102, 255)']

  backgroundColorido01_OLD = ['rgba(59, 45, 121, 0.4)', 'rgba(97, 31, 48, 0.4)', 'rgba(45, 107, 121, 0.4)', 'rgba(179, 83, 32, 0.4)',
  'rgba(219, 242, 5, 0.4)', 'rgba(68, 189, 8, 0.4)', 'rgba(189, 8, 174, 0.4)', 'rgba(189, 8, 56, 0.4)',
  'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)', 'rgba(59, 45, 121, 0.4)'];


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
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    this.codigoUsuarioLogado = localStorage.getItem('idToken');
    this.title.setTitle('Dashboard de Investimentos');

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
      });
    }, 30 * 60 * 1000);

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

    //====TAB menu 02 ======

    this.retornaRelatorioCompletoACOESGrid();


    this.retornaRelatorioBasicoVisualizacao();
    this.configuraGraficoPizzaCarteiraCompleta();
    this.configuraGraficoPizzaAcoesFiisRendaFixa();
    this.retornaRelatorioBasicoComDivRecebido();

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

        this.adicionarValoresAosRotulos();
      });
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
  console.log("projetivo Ações: " + this.totalProjetivoGridAcoes);
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
  console.log("projetivo fiis: " + this.totalProjetivoGridAFiis);
}


}
