import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ProdutoRVFiltro, ProdutoRendaVariavelServiceService } from './../produto-renda-variavel-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-produto-renda-variavel-pesquisa',
  templateUrl: './produto-renda-variavel-pesquisa.component.html',
  styleUrls: ['./produto-renda-variavel-pesquisa.component.css']
})
export class ProdutoRendaVariavelPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  produtosRendaVariavel = [];
  ticker: string;

  constructor(
    private produtoRendaVariavelService: ProdutoRendaVariavelServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.pesquisar();
  }

  pesquisar() {

    const filtro: ProdutoRVFiltro = {
      ticker: this.ticker
    }

    this.produtoRendaVariavelService.listarTodosFiltro(filtro)
    .then(response => {
      this.produtosRendaVariavel = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  confirmaExclusao(produtoRV: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o produto: ' + produtoRV.shortName + '?',
        accept: () => {
          this.removerProduto(produtoRV);
        }
      });
  }

  removerProduto(produtoRV: any) {

    this.produtoRendaVariavelService.removerProduto(produtoRV.produtoId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Produto Renda variável removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
