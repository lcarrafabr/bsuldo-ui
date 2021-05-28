import { Table } from 'primeng/table/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MetodoCobrancaService, MetodoCobrancaFiltro } from './../metodo-cobranca.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-metodo-cobranca-pesquisa',
  templateUrl: './metodo-cobranca-pesquisa.component.html',
  styleUrls: ['./metodo-cobranca-pesquisa.component.css']
})
export class MetodoCobrancaPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  metodoCobrancas = [];
  nomeMetodoCobranca: string;

  constructor(
    private metodoCobrancaService: MetodoCobrancaService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }


  pesquisar() {

    const filtro: MetodoCobrancaFiltro = {
      nomeMetodoConranca: this.nomeMetodoCobranca
    }

    this.metodoCobrancaService.listarTodosPorFiltro(filtro)
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

    this.metodoCobrancaService.removerMetodoCobranca(metodoCobranca.metodoCobrancaId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Método de cobrança removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  alterarStatusAtivo(metodoCobranca: any): void {

    const novoStatus = !metodoCobranca.status;

    this.metodoCobrancaService.mudarStatusAtivo(metodoCobranca.metodoCobrancaId, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      metodoCobranca.status = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
