import { ErrorHandlerService } from './../../core/error-handler.service';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

interface TotaisPorAno {
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
  total: number;
  media: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  codigoUsuarioLogado: string;

  nomeMes: string = '';

  valorAReceberNoMes: any = 0;
  valorRecebidoNoMes: any = 0;
  valorAtrasadoNoMes: any = 0;
  valorAReceberNoAno: any = 0;
  receitaTotalPorAnovalue: any = 0;
  valueRecebidoNoMes: any = 100;

  value: any = 100;
  dataSelecionada: Date;
  valorApagarNoMes: any = 0;
  valorPagoNoMes: any = 0;
  valorVencidoNoMes: any = 0;
  valorDevedorPorAno: any = 0;
  valorPagoPorAno: any = 0;
  basicData: any = 0;
  basicOptions: any;

  totaisPorAno: TotaisPorAno[] = [];
  totalMetodoCobrancaMes = [];
  products = [];



  graficoMetodoCobrancaMes: any;
  graficoCategoriaMes: any;


  lancamentosPorDia: any;
  graficoReceitaDespesaPorMesAno: any;
  graficoReceitaDespesaPorAno: any;

  constructor(
    private dashboardService: DashboardService,
    private errorHandler: ErrorHandlerService
  ) {

  }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    this.dataSelecionada = new Date();
    this.atualizarDashboard();
  }


  atualizarDashboard() {

    this.nomeMes = this.getNomeMes();

    this.pegarvalorApagarNoMes();
    this.pegarvalorPagoNoMes();
    this.pegarvalorVencidoNoMes();
    this.pegarvalorDevedorPorAno();
    this.percentualPagoNoMes();
    this.configurarGraficoPizzaCategoriaMes();
    this.configurarGraficoPizzaMetodoCobranca();
    //this.graficoLancamentosPorDia();
    this.graficoSituacaoMes();
    this.basicOptionsConfig();
    //this.carregaGradeTotaisPorAno();

    this.carregaGradeTotaisPorAno();

    this.carregaGradeTotalMetodoCobrancaMes();
    this.carregaGradeLancMetodoCobrancaMesExpansivo();
    this.pegarvalorPagoPorAno();

    this.pegarvalorAReceberNoMes();
    this.pegarvalorRecebidoNoMes();
    this.percentualrecebidoNoMes();
    this.pegarvalorAtrasadoNoMes();
    this.pegarvalorAReceberNoAno();
    this.receitaTotalPorAno();

    this.graficoLancamentosPorDiaReceitasDespesas();
    this.graficoReceitasDespesasPorMesEAno();
    this.graficoReceitasDespesasPorAno();

  }


  getNomeMes(): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const mesIndex = this.dataSelecionada.getMonth(); // Retorna o índice do mês (0-11)
    return meses[mesIndex]; // Retorna o nome do mês correspondente
  }


//******************************************************************************************* */
  pegarvalorApagarNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorApagarNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null) {
        this.valorApagarNoMes = response;
      } else {
        this.valorApagarNoMes = 0;
      }
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pegarvalorPagoNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorPagoNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null) {
        this.valorPagoNoMes = response;
      } else {
        this.valorPagoNoMes = 0;
      }
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pegarvalorVencidoNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorVencidoNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        this.valorVencidoNoMes = response;
      } else {
        this.valorVencidoNoMes = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pegarvalorDevedorPorAno() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorDevedorPorAno(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        this.valorDevedorPorAno = response;
      } else {
        this.valorDevedorPorAno = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pegarvalorPagoPorAno() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorpagoPorAno(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        this.valorPagoPorAno = response;
      } else {
        this.valorPagoPorAno = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  percentualPagoNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.percentualPagoNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        const valor = new Number(response);
        this.value = valor.toFixed(2);
        this.graficoSituacaoMes();
      } else {
        this.value = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  //******************************************************************************************************** */

  pegarvalorAReceberNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorAReceberNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null) {
        this.valorAReceberNoMes = response;
      } else {
        this.valorAReceberNoMes = 0;
      }
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pegarvalorRecebidoNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorRecebidoNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null) {
        this.valorRecebidoNoMes = response;
      } else {
        this.valorRecebidoNoMes = 0;
      }
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  pegarvalorAtrasadoNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorAtrasadoNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        this.valorAtrasadoNoMes = response;
      } else {
        this.valorAtrasadoNoMes = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  pegarvalorAReceberNoAno() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorAReceberNoAno(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        this.valorAReceberNoAno = response;
      } else {
        this.valorAReceberNoAno = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  receitaTotalPorAno() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.receitaTotalPorAno(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        this.receitaTotalPorAnovalue = response;
      } else {
        this.receitaTotalPorAnovalue = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  percentualrecebidoNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.percentualRecebidoNoMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      if(response != null){
        const valor = new Number(response);
        this.valueRecebidoNoMes = valor.toFixed(2);
        //this.graficoSituacaoMes();
      } else {
        this.valueRecebidoNoMes = 0;
      }

    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  //********************************************************************************************************* */

  configurarGraficoPizzaCategoriaMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.lancamentosPorCategoria(dataReferencia, this.codigoUsuarioLogado)
    .then(dados => {

      this.graficoCategoriaMes = {
        labels: dados.map(dado => dado.categoria),
        datasets: [
            {
                data: dados.map(dado => dado.totais),
                backgroundColor: ["#DD4477","#2c58a3","#d9b541","#208f1e", "#DC3912", "#4a10a1", "#34999e", "#8c0b0b",
              "#3b212b"],
                hoverBackgroundColor: ["#db6b91","#397ced","#FFCE56","#1dc41a", "#e37054", "#7747bf", "#81c4c7", "#bd4444",
              "#704254"]
            }]
        };

    });
  }


  configurarGraficoPizzaMetodoCobranca() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.lancamentosPorMetodoCobrancaMes(dataReferencia, this.codigoUsuarioLogado)
    .then(dados => {

      this.graficoMetodoCobrancaMes = {
        labels: dados.map(dado => dado.nomeMetodoCobranca),
        datasets: [
            {
                data: dados.map(dado => dado.totais),
                backgroundColor: ["#DD4477","#2c58a3","#d9b541","#208f1e", "#DC3912", "#4a10a1", "#34999e", "#8c0b0b",
              "#3b212b"],
                hoverBackgroundColor: ["#db6b91","#397ced","#FFCE56","#1dc41a", "#e37054", "#7747bf", "#81c4c7", "#bd4444",
              "#704254"]
            }]
        };

    });
  }

  graficoLancamentosPorDia() { //****************  DESATIVADO ********************* */

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.lancamentosPordia(dataReferencia)
    .then(dados => {

      this.lancamentosPorDia = {
        labels: dados.map(dado => dado.dia),
        datasets: [
            {
                label: 'Lancamentos por dia',
                data: dados.map(dado => dado.totais),
                fill: true,
                backgroundColor: 'rgba(247, 176, 240,0.2)',
                borderColor: '#731469'
            }
        ]
    }

    });
  }

  graficoLancamentosPorDiaReceitasDespesas() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.lancamentosPordiaReceitasDespesas(dataReferencia, this.codigoUsuarioLogado)
    .then(dados => {

      this.lancamentosPorDia = {
        labels: dados.map(dado => dado.dia),
        datasets: [
            {
                label: 'Despesa',
                data: dados.map(dado => dado.lancDespesa),
                fill: true,
                backgroundColor: 'rgba(247, 176, 240,0.2)',
                borderColor: '#892d91',
                borderWidth: 1.5,
                tension: 0.4,
            },
            {
              label: 'Receita',
              data: dados.map(dado => dado.lancReceita),
              fill: true,
              backgroundColor: 'rgba(98, 181, 245,0.2)',
              borderColor: '#2c6b9c',
              borderWidth: 1.5,
              tension: 0.4,
          }
        ]
    }

    });
  }

  graficoSituacaoMes() {

    let backgroundColorGraficoSituacaoMes = ['#4e92c788', '#40ad5a88', '#a3313188'];
    let borderColorGraficoSituacaoMes = ['#2c6b9c', '#2c8241', '#a33131'];

    this.basicData = {
      labels: ['Pagar no mês', 'Total pago', 'Total vencido'],
      datasets: [
          {
              label: 'Situação no mês',
              backgroundColor: backgroundColorGraficoSituacaoMes,
              borderColor: borderColorGraficoSituacaoMes,
              borderWidth: 1,
              data: [this.valorApagarNoMes, this.valorPagoNoMes, this.valorVencidoNoMes,0]
          }
      ]
  };
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
      }
  };
  }


  carregaGradeTotaisPorAno_OLD() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.gradeTotaisPorAno(dataReferencia)
    .then(response => {
      this.totaisPorAno = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregaGradeTotaisPorAno() {
    const dataReferencia = this.dataSelecionada;

    this.dashboardService.gradeTotaisDespesaMesPorAno(dataReferencia, this.codigoUsuarioLogado)
        .then(response => {
          const totalDespesas = response.reduce((sum, item) => sum + (item.totalDespesas || 0), 0);
          const mediaDespesas = totalDespesas > 0 ? totalDespesas / 12 : 0;


            // Transformando a resposta para o formato necessário pela tabela
            const totaisPorAno = {
                jan: response.find(item => item.mes === 1)?.totalDespesas || 0,
                fev: response.find(item => item.mes === 2)?.totalDespesas || 0,
                mar: response.find(item => item.mes === 3)?.totalDespesas || 0,
                abr: response.find(item => item.mes === 4)?.totalDespesas || 0,
                mai: response.find(item => item.mes === 5)?.totalDespesas || 0,
                jun: response.find(item => item.mes === 6)?.totalDespesas || 0,
                jul: response.find(item => item.mes === 7)?.totalDespesas || 0,
                ago: response.find(item => item.mes === 8)?.totalDespesas || 0,
                set: response.find(item => item.mes === 9)?.totalDespesas || 0,
                out: response.find(item => item.mes === 10)?.totalDespesas || 0,
                nov: response.find(item => item.mes === 11)?.totalDespesas || 0,
                dez: response.find(item => item.mes === 12)?.totalDespesas || 0,
                total: totalDespesas,
                media: parseFloat(mediaDespesas.toFixed(2)),
            };

            // Definindo o valor transformado no array esperado pela tabela
            this.totaisPorAno = [totaisPorAno];
        })
        .catch(erro => this.errorHandler.handle(erro));
}


graficoReceitasDespesasPorMesEAno() {

  const dataReferencia = this.dataSelecionada;

  this.dashboardService.graficoReceitasDespesasPorMesEAno(dataReferencia, this.codigoUsuarioLogado)
  .then(dados => {

    this.graficoReceitaDespesaPorMesAno = {
      labels: dados.map(dado => dado.mesName),
      datasets: [
          {
              label: 'Despesa',
              data: dados.map(dado => dado.totalDespesas),
              fill: true,
              backgroundColor: 'rgba(247, 176, 240,0.2)',
              borderColor: '#892d91',
              borderWidth: 1.5,
              tension: 0.3,
          },
          {
            label: 'Receita',
            data: dados.map(dado => dado.totalReceitas),
            fill: true,
            backgroundColor: 'rgba(98, 181, 245,0.2)',
            borderColor: '#2c6b9c',
            borderWidth: 1.5,
            tension: 0.3,
        }
      ]
  }

  });
}

graficoReceitasDespesasPorAno() {

  const dataReferencia = this.dataSelecionada;

  this.dashboardService.graficoReceitasDespesasPorAno(dataReferencia, this.codigoUsuarioLogado)
  .then(dados => {

    this.graficoReceitaDespesaPorAno = {
      labels: dados.map(dado => dado.ano),
      datasets: [
          {
              label: 'Despesa',
              data: dados.map(dado => dado.despesa),
              fill: true,
              backgroundColor: 'rgba(247, 176, 240,0.2)',
              borderColor: '#892d91',
              borderWidth: 1.5,
              tension: 0.3,
          },
          {
            label: 'Receita',
            data: dados.map(dado => dado.receita),
            fill: true,
            backgroundColor: 'rgba(98, 181, 245,0.2)',
            borderColor: '#2c6b9c',
            borderWidth: 1.5,
            tension: 0.3,
        }
      ]
  }

  });
}




  carregaGradeTotalMetodoCobrancaMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.gradeTotalMetodoCobrancaPorMes(dataReferencia, this.codigoUsuarioLogado)
    .then(response => {
      console.log(response);
      this.totalMetodoCobrancaMes = response;
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregaGradeLancMetodoCobrancaMesExpansivo() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.gradeExpansivaLancamentosPorMetodoCobranca(dataReferencia)
    .then(response => {
      this.products = response;//mudar aqui **********************************************************************************
    })
    .catch(erro => this.errorHandler.handle(erro));

  }


  testeDatas() {

    const mesReferencia = this.dataSelecionada;
    const startOfMonth = moment(mesReferencia).startOf('month').format('YYYY-MM-DD');
    const endOfMonth   = moment(mesReferencia).endOf('month').format('YYYY-MM-DD');
    const year   = moment(mesReferencia).year();

    const teste = {'dataIni' : startOfMonth, 'dataFim' : endOfMonth, 'ano' : year};


  }



}
