import { Table } from 'primeng/table/table';
import { CategoriaFiltro } from './../categoria.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  categorias = [];
  nomeCategoria: string;

  constructor(
    private categoriaService: CategoriaService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.pesquisar()
  }

  pesquisar() {

    const filtro: CategoriaFiltro = {
      nomeCategoria: this.nomeCategoria
    }

    this.categoriaService.listarTodosFiltro(filtro)
    .then(response => {
      this.categorias = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
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

    this.categoriaService.removerCategoria(categorias.categoriaId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Categoria removida com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  alterarStatusAtivo(categorias: any): void {

    const novoStatus = !categorias.status;

    this.categoriaService.mudarStatusAtivo(categorias.categoriaId, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      categorias.status = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
