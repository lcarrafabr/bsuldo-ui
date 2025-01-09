import { ErrorHandlerService } from './../../core/error-handler.service';

import { BancoFiltro, BancoService } from './../banco.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-banco-pesquisa',
  templateUrl: './banco-pesquisa.component.html',
  styleUrls: ['./banco-pesquisa.component.css']
})
export class BancoPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;
  bancosResponse = [];
  nomeBanco:string;

  constructor(
    private bancoService: BancoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Bancos');

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    this.pesquisar();
  }

  pesquisar() {

    const filtro: BancoFiltro = {
      nomeBanco: this.nomeBanco
    }

    this.bancoService.listarTodosFiltro(this.codigoUsuarioLogado, filtro)
    .then(response => {
      this.bancosResponse = response;

    })
    .catch(erro => {
      if (erro.error.objects) {
        erro.error.objects.forEach((obj: any) => {
          this.messageService.add({ severity: 'error', detail: obj.userMessage });
        });
      } else {
        this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
      }
    });
  }

  confirmaExclusao(bancos: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o banco: ' + bancos.nomeBanco + '?',
        accept: () => {
          this.removeBanco(bancos);
        }
      });
  }

  removeBanco(bancos: any) {

    this.bancoService.removeBanco(bancos.codigoBanco)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Banco removido com sucesso!', closable: false });
    })
    .catch(erro => {
      if (erro.error.objects) {
        erro.error.objects.forEach((obj: any) => {
          this.messageService.add({ severity: 'error', detail: obj.userMessage });
        });
      } else {
        this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
      }
    });
  }

  alterarStatusAtivo(bancos: any): void {

    const novoStatus = !bancos.status;

    this.bancoService.mudarStatusAtivo(bancos.codigoBanco, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      bancos.status = novoStatus;
    })
    .catch(erro => {
      if (erro.error.objects) {
        erro.error.objects.forEach((obj: any) => {
          this.messageService.add({ severity: 'error', detail: obj.userMessage });
        });
      } else {
        this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
      }
    });
  }

}
