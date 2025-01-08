import { Table } from 'primeng/table/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MetodoCobrancaService, MetodoCobrancaFiltro } from './../metodo-cobranca.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-metodo-cobranca-pesquisa',
  templateUrl: './metodo-cobranca-pesquisa.component.html',
  styleUrls: ['./metodo-cobranca-pesquisa.component.css']
})
export class MetodoCobrancaPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  metodoCobrancas = [];
  nomeMetodoCobranca: string;
  codigoUsuarioLogado: string;

  constructor(
    private metodoCobrancaService: MetodoCobrancaService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Método de cobrança');

    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    this.pesquisar();
  }


  pesquisar() {

    const filtro: MetodoCobrancaFiltro = {
      nomeMetodoConranca: this.nomeMetodoCobranca
    }

    this.metodoCobrancaService.listarTodosPorFiltro(filtro, this.codigoUsuarioLogado)
    .then(response => {
      this.metodoCobrancas = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmaExclusao(metodoCobranca: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir a categoria: ' + metodoCobranca.nomeMetodoCob + '?',
        accept: () => {
          this.removerMetodoCobranca(metodoCobranca);
        }
      });
  }

  removerMetodoCobranca(metodoCobranca: any) {

    this.metodoCobrancaService.removerMetodoCobranca(metodoCobranca.codigoMetodoCobranca)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Método de cobrança removido com sucesso!', closable: false });
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

  alterarStatusAtivo(metodoCobranca: any): void {

    const novoStatus = !metodoCobranca.status;

    this.metodoCobrancaService.mudarStatusAtivo(metodoCobranca.codigoMetodoCobranca, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      metodoCobranca.status = novoStatus;
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
