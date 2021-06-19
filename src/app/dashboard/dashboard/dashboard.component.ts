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

  percentualPagoNoMes() {

    const dataReferencia = this.dataSelecionada;

    this.dashboardService.percentualPagoNoMes(dataReferencia)
    .then(response => {
      if(response != null){
        const valor = new Number(response);
        this.value = valor.toFixed(2);
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


    this.lancamentosPorDia = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: '#42A5F5'
          }
      ]
  }


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
