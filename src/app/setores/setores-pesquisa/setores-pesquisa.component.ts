import { SetoresServiceService } from './../setores-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

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

  constructor(
    private setoresService: SetoresServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.codigoUsuarioLogado = localStorage.getItem('idToken');
    this.pesquisar();
  }

  pesquisar() {

    this.setoresService.listarTodos(this.codigoUsuarioLogado)
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

    this.setoresService.removerSetor(setor.setorId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Setor removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizaStatusAtivo(setor: any): void {

    const novoStatus = !setor.status;

    this.setoresService.mudarStatusAtivo(setor.setorId, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      setor.status = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
