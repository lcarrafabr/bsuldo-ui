import { ProdutoRendaFixaServiceService } from './../produto-renda-fixa-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-produto-renda-fixa-pesquisa',
  templateUrl: './produto-renda-fixa-pesquisa.component.html',
  styleUrls: ['./produto-renda-fixa-pesquisa.component.css']
})
export class ProdutoRendaFixaPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  produtosRendaFixa = [];

  constructor(
    private produtoRendaFixaService: ProdutoRendaFixaServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.pesquisar();
  }

  pesquisar() {


    this.produtoRendaFixaService.listarTodos()
    .then(response => {
      this.produtosRendaFixa = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmaExclusao(produtoRF: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o produto: ' + produtoRF.nomeProduto + '?',
        accept: () => {
          this.removerProduto(produtoRF);
        }
      });
  }

  removerProduto(produtoRF: any) {

    this.produtoRendaFixaService.removerProduto(produtoRF.produtoRendaFixaId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Produto Renda Fixa removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
