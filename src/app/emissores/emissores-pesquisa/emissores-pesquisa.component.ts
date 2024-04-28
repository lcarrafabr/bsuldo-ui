import { ConfirmationService, MessageService } from 'primeng/api';
import { EmissorFiltro, EmissoresService } from './../emissores.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-emissores-pesquisa',
  templateUrl: './emissores-pesquisa.component.html',
  styleUrls: ['./emissores-pesquisa.component.css']
})
export class EmissoresPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;

  emissores = []
  nomeEmissor: string;

  constructor(
    private emissoresService: EmissoresService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    this.pesquisar();
  }

  pesquisar() {

    const filtro: EmissorFiltro = {
      nomeEmissor: this.nomeEmissor
    }

    this.emissoresService.listarTodos(filtro, this.codigoUsuarioLogado)
    .then(response => {
      this.emissores = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmaExclusao(emissor: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o emissor: ' + emissor.nomeEmissor + '?',
        accept: () => {
          this.removerCategoria(emissor);
        }
      });
  }

  removerCategoria(emissor: any) {

    this.emissoresService.removerEmissor(emissor.emissorId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Emissor removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  alterarStatusAtivo(emissor: any): void {

    const novoStatus = !emissor.status;

    this.emissoresService.mudarStatusAtivo(emissor.emissorId, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      emissor.status = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
