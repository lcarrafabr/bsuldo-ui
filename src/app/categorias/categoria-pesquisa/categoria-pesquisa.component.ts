import { Table } from 'primeng/table/table';
import { CategoriaFiltro } from './../categoria.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  categorias = [];
  nomeCategoria: string;
  codigoUsuarioLogado: string;

  constructor(
    private categoriaService: CategoriaService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('idToken')  ?? '';
    this.title.setTitle('Categorias');

    this.pesquisar()
  }

  pesquisar() {

    const filtro: CategoriaFiltro = {
      nomeCategoria: this.nomeCategoria
    }

    this.categoriaService.listarTodosFiltro(filtro, this.codigoUsuarioLogado)
    .then(response => {
      this.categorias = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error.mensagemUsuarioo));
  }

  confirmaExclusao(categorias: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir a categoria: ' + categorias.nomeCategoria + '?',
        accept: () => {
          this.removerCategoria(categorias);
        }
      });
  }

  removerCategoria(categorias: any) {

    this.categoriaService.removerCategoria(categorias.codigo)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Categoria removida com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error.mensagemUsuario));
  }

  alterarStatusAtivo(categorias: any): void {

    const novoStatus = !categorias.status;

    this.categoriaService.mudarStatusAtivo(categorias.codigo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      categorias.status = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro.error.mensagemUsuario));
  }

}
