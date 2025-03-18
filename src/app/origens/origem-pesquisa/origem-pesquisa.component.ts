import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { OrigemFiltro, OrigemService } from '../origem.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-origem-pesquisa',
  templateUrl: './origem-pesquisa.component.html',
  styleUrls: ['./origem-pesquisa.component.css']
})
export class OrigemPesquisaComponent implements OnInit {

  @ViewChild('tabela', { static: true }) grid: Table;

  codigoUsuarioLogado: string;
  origemResponse = [];

  nomeOrigem: string;

  constructor(
    private origemService: OrigemService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Origem');
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    this.pesquisar();
  }


  pesquisar() {

    const filtro: OrigemFiltro = {
      nomeOrigem: this.nomeOrigem
    }

    this.origemService.listarTodosFiltro(this.codigoUsuarioLogado, filtro)
      .then(response => {
        this.origemResponse = response;

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


  alterarStatusAtivo(origem: any): void {

    const novoStatus = !origem.status;

    this.origemService.mudarStatusAtivo(origem.codigoOrigem, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ATIVO' : 'INATIVO';

        origem.status = novoStatus;
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


  confirmaExclusao(origem: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir essa origem: ' + origem.nomeOrigem + '?',
      accept: () => {
        this.removeOrigem(origem);
      }
    });
  }

  removeOrigem(origem: any) {

    this.origemService.removeOrigem(origem.codigoOrigem)
      .then(() => {
        this.grid.clear();
        this.pesquisar();
        this.messageService.add({ severity: 'success', detail: 'Origem removida com sucesso!', closable: false });
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
