import { LancamentoService } from './../../lancamentos/lancamento.service';
import { Pessoa } from './../../core/model';
import { Table } from 'primeng/table/table';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  pessoas = [];
  nomePessoa: string

  constructor(
    private pessoaService: PessoaService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {

    const filtro: PessoaFiltro = {
      nomePessoa: this.nomePessoa
    }

    this.pessoaService.pesquisarPessoa(filtro)
    .then(pessoa => {
      this.pessoas = pessoa;
    })
  }

  confirmarExclusao(pessoa: any) {

    this.confirmation.confirm({
    message: 'Deseja excluir a pessoa: ' + pessoa.nomePessoa + '?',
      accept: () => {
        this.removerPessoa(pessoa);
      }
    });
  }

  removerPessoa(pessoa: any) {

    this.pessoaService.removerPessoa(pessoa.pessoaID)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Pessoa removida com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  buscaPorCodigo(codigo: number) {

    return this.pessoaService.buscaPorCodigo(codigo)
    .then()
  }

}
