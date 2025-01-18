import { ErrorHandlerService } from './../../core/error-handler.service';

import { SegmentoServiceService } from './../segmento-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-segmento-pesquisa',
  templateUrl: './segmento-pesquisa.component.html',
  styleUrls: ['./segmento-pesquisa.component.css']
})
export class SegmentoPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;

  segmentos = [];

  constructor(
    private segmentoService: SegmentoServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';
    this.pesquisar();
  }

  pesquisar() {

    this.segmentoService.listarTodos(this.codigoUsuarioLogado)
    .then(response => {
      this.segmentos = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  confirmaExclusao(segmento: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o sesegmentotor: ' + segmento.nomeSegmento + '?',
        accept: () => {
          this.removerSegmento(segmento);
        }
      });
  }


  removerSegmento(segmento: any) {

    this.segmentoService.removerSegmento(segmento.codigoSegmento)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Segmento removido com sucesso!', closable: false });
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

  atualizaStatusAtivo(segmento: any): void {

    const novoStatus = !segmento.status;

    this.segmentoService.mudarStatusAtivo(segmento.codigoSegmento, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      segmento.status = novoStatus;
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
