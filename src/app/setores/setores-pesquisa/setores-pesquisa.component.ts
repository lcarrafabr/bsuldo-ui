import { SetoresServiceService, SetorFiltro } from './../setores-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-setores-pesquisa',
  templateUrl: './setores-pesquisa.component.html',
  styleUrls: ['./setores-pesquisa.component.css']
})
export class SetoresPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;

  setores = [];
  nomeSetor: string;
  iconePanel: string = "pi pi-filter"
  nomeSetorFiltro: string;

  constructor(
    private setoresService: SetoresServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';
    this.pesquisar();
  }

  pesquisar() {

    const filtro: SetorFiltro = {
      nomeSetor: this.nomeSetorFiltro
    }

    this.title.setTitle('Setores');
    this.setoresService.listarTodos(this.codigoUsuarioLogado, filtro)
    .then(response => {
      this.setores = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmaExclusao(setor: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o setor: ' + setor.nomeSetor + '?',
        accept: () => {
          this.removerSetor(setor);
        }
      });
  }

  removerSetor(setor: any) {

    this.setoresService.removerSetor(setor.codigoSetor)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Setor removido com sucesso!', closable: false });
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

  atualizaStatusAtivo(setor: any): void {

    const novoStatus = !setor.status;

    this.setoresService.mudarStatusAtivo(setor.codigoSetor, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      setor.status = novoStatus;
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
