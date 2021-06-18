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



  data = {
    labels: ['A','B','C'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
    };

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


  testeDatas() {

    console.log(this.dataSelecionada);

    const mesReferencia = this.dataSelecionada;
    const startOfMonth = moment(mesReferencia).startOf('month').format('YYYY-MM-DD');
    const endOfMonth   = moment(mesReferencia).endOf('month').format('YYYY-MM-DD');
    const year   = moment(mesReferencia).year();

    const teste = {'dataIni' : startOfMonth, 'dataFim' : endOfMonth, 'ano' : year};

    console.log(teste.ano);
    //console.log("Ultimo dia: " + endOfMonth);
  }



}
