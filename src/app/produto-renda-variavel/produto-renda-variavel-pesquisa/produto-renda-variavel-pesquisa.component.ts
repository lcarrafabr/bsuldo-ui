import { ProdutoRVFiltro, ProdutoRendaVariavelServiceService } from './../produto-renda-variavel-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-produto-renda-variavel-pesquisa',
  templateUrl: './produto-renda-variavel-pesquisa.component.html',
  styleUrls: ['./produto-renda-variavel-pesquisa.component.css']
})
export class ProdutoRendaVariavelPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;

  produtosRendaVariavel = [];
  ticker: string;


  constructor(
    private produtoRendaVariavelService: ProdutoRendaVariavelServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Produtos RV');
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';
    this.pesquisar();
  }

  pesquisar() {

    const filtro: ProdutoRVFiltro = {
      ticker: this.ticker
    }

    this.produtoRendaVariavelService.listarTodosFiltro(filtro, this.codigoUsuarioLogado)
    .then(response => {
      this.produtosRendaVariavel = response;
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

  confirmaExclusao(produtoRV: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o produto: ' + produtoRV.shortName + '?',
        accept: () => {
          this.removerProduto(produtoRV);
        }
      });
  }

  removerProduto(produtoRV: any) {

    this.produtoRendaVariavelService.removerProduto(produtoRV.codigoProdutoRV)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Produto Renda variável removido com sucesso!', closable: false });
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
