import { ErrorHandlerService } from './../../core/error-handler.service';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  value: any = 100;
  dataSelecionada: Date;
  valorApagarNoMes: any = 0;
  valorPagoNoMes: any = 0;
  valorVencidoNoMes: any = 0;
  valorDevedorPorAno: any = 0;
  valorPagoPorAno: any = 0;
  basicData: any = 0;
  basicOptions: any;

  totaisPorAno = [];
  totalMetodoCobrancaMes = [];
  products = [];



  graficoMetodoCobrancaMes: any;
  graficoCategoriaMes: any;


  lancamentosPorDia: any;

  constructor(
    private dashboardService: DashboardService,
    private errorHandler: ErrorHandlerService
  ) {

  }

  ngOnInit(): void {

    this.dataSelecionada = new Date();
    this.atualizarDashboard();
  }


  atualizarDashboard() {

    this.pegarvalorApagarNoMes();
    this.pegarvalorPagoNoMes();
    this.pegarvalorVencidoNoMes();
    this.pegarvalorDevedorPorAno();
    this.percentualPagoNoMes();
    this.configurarGraficoPizzaCategoriaMes();
    this.configurarGraficoPizzaMetodoCobranca();
    this.graficoLancamentosPorDia();
    this.graficoSituacaoMes();
    this.basicOptionsConfig();
    this.carregaGradeTotaisPorAno();
    this.carregaGradeTotalMetodoCobrancaMes();
    this.carregaGradeLancMetodoCobrancaMesExpansivo();
    this.pegarvalorPagoPorAno();

  }



  pegarvalorApagarNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.valorApagarNoMes(dataReferencia)
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

    this.dashboardService.valorPagoNoMes(dataReferencia)
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

    this.dashboardService.valorVencidoNoMes(dataReferencia)
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

    this.dashboardService.valorDevedorPorAno(dataReferencia)
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

    this.dashboardService.valorpagoPorAno(dataReferencia)
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

    this.dashboardService.percentualPagoNoMes(dataReferencia)
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

  configurarGraficoPizzaCategoriaMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.lancamentosPorCategoria(dataReferencia)
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

    this.dashboardService.lancamentosPorMetodoCobrancaMes(dataReferencia)
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

  graficoLancamentosPorDia() {

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

  graficoSituacaoMes() {

    this.basicData = {
      labels: ['Pagar no mês', 'Total pago', 'Total vencido'],
      datasets: [
          {
              label: 'Situação no mês',
              backgroundColor: '#731469',
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


  carregaGradeTotaisPorAno() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.gradeTotaisPorAno(dataReferencia)
    .then(response => {
      this.totaisPorAno = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregaGradeTotalMetodoCobrancaMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.gradeTotalMetodoCobrancaPorMes(dataReferencia)
    .then(response => {
      this.totalMetodoCobrancaMes = response;
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  carregaGradeLancMetodoCobrancaMesExpansivo() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.gradeExpansivaLancamentosPorMetodoCobranca(dataReferencia)
    .then(response => {
      this.products = response;
    })
    .catch(erro => this.errorHandler.handle(erro));

  }


  testeDatas() {

    console.log(this.dataSelecionada);

    const mesReferencia = this.dataSelecionada;
    const startOfMonth = moment(mesReferencia).startOf('month').format('YYYY-MM-DD');
    const endOfMonth   = moment(mesReferencia).endOf('month').format('YYYY-MM-DD');
    const year   = moment(mesReferencia).year();

    const teste = {'dataIni' : startOfMonth, 'dataFim' : endOfMonth, 'ano' : year};

    console.log(teste.ano);
  }



}
