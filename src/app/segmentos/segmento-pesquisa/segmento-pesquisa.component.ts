import { ErrorHandlerService } from 'src/app/core/error-handler.service';
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

  segmentos = [];

  constructor(
    private segmentoService: SegmentoServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.pesquisar();
  }

  pesquisar() {

    this.segmentoService.listarTodos()
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

    this.segmentoService.removerSegmento(segmento.segmentoId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Segmento removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizaStatusAtivo(segmento: any): void {

    const novoStatus = !segmento.status;

    this.segmentoService.mudarStatusAtivo(segmento.segmentoId, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      segmento.status = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
