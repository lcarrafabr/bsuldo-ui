import { CategoriaFiltro } from './../categoria.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-pesquisa',
  templateUrl: './categoria-pesquisa.component.html',
  styleUrls: ['./categoria-pesquisa.component.css']
})
export class CategoriaPesquisaComponent implements OnInit {

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
    .catch(erro => this.errorHandler.handle(erro));
  }

}
