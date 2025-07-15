import { OrdemCompraVendaTicker, OrdensDeCompraService } from './../ordens-de-compra.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-ordens-de-compra-pesquisa',
  templateUrl: './ordens-de-compra-pesquisa.component.html',
  styleUrls: ['./ordens-de-compra-pesquisa.component.css']
})
export class OrdensDeCompraPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;

  ordensDeCompra = [];
  ticker: string;

  tipoOrdemAmarelo(tipo: string): boolean {
  return ['BONIFICACAO', 'AGRUPAMENTO', 'DESDOBRAMENTO', 'AMORTIZACAO'].includes(tipo);
}

  constructor(
    private ordemDeCompraService: OrdensDeCompraService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    this.pesquisar();
  }

  pesquisar() {

    const filtro: OrdemCompraVendaTicker = {
      ticker: this.ticker
    }

    this.ordemDeCompraService.listarTodosFiltro(filtro, this.codigoUsuarioLogado)
    .then(response => {
      this.ordensDeCompra = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  confirmaExclusao(ordemDeCompra: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir os: ' + ordemDeCompra.quantidadeCotas+ ' papeis de ' + ordemDeCompra.produtoRendaVariavel.ticker + '?',
        accept: () => {
        this.removerOrdem(ordemDeCompra);
        }
      });
  }

  removerOrdem(ordemCompra: any) {

    this.ordemDeCompraService.removerOrdemDeCompra(ordemCompra.codigoOrdemDeComppra)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Ordem de compra/venda removido com sucesso!', closable: false });
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
