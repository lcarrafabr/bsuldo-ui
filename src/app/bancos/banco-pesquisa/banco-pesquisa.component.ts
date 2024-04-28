import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { BancoFiltro, BancoService } from './../banco.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Title } from '@angular/platform-browser';
import { CategoriaFiltro } from 'src/app/categorias/categoria.service';

@Component({
  selector: 'app-banco-pesquisa',
  templateUrl: './banco-pesquisa.component.html',
  styleUrls: ['./banco-pesquisa.component.css']
})
export class BancoPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;
  bancosResponse = [];
  nomeBanco:string;

  constructor(
    private bancoService: BancoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Bancos');

    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    this.pesquisar();
  }

  pesquisar() {

    const filtro: BancoFiltro = {
      nomeBanco: this.nomeBanco
    }

    this.bancoService.listarTodosFiltro(this.codigoUsuarioLogado, filtro)
    .then(response => {
      this.bancosResponse = response;

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  confirmaExclusao(bancos: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o banco: ' + bancos.nomeBanco + '?',
        accept: () => {
          this.removeBanco(bancos);
        }
      });
  }

  removeBanco(bancos: any) {

    this.bancoService.removeBanco(bancos.bancoId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Banco removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  alterarStatusAtivo(bancos: any): void {

    const novoStatus = !bancos.status;

    this.bancoService.mudarStatusAtivo(bancos.bancoId, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      bancos.status = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
