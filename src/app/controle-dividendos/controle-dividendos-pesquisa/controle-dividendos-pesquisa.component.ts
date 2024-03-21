import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ControleDividendosService } from './../controle-dividendos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-controle-dividendos-pesquisa',
  templateUrl: './controle-dividendos-pesquisa.component.html',
  styleUrls: ['./controle-dividendos-pesquisa.component.css']
})
export class ControleDividendosPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  controleDividendos = [];
  totalDivRecebido: any = 0;
  totalDivDisponivel: number = 0;

  constructor(
    private controleDividendosService: ControleDividendosService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {

    this.controleDividendosService.listarTodos()
    .then(response => {
      this.controleDividendos = response;
      this.totalDividendoRecebido();
      this.totalDividendoDisponivel();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  confirmaExclusao(controleDiv: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o controle: ' + controleDiv.produtosRendaVariavel.ticker + '?',
        accept: () => {
          this.removerControleDividendo(controleDiv);
        }
      });
  }

  removerControleDividendo(controleDiv: any) {

    this.controleDividendosService.removerControleDividendo(controleDiv.controleDividendoId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Controle de dividendos removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  totalDividendoRecebido() {

    this.controleDividendosService.totalDividendoRecebido()
    .then(response => {
      this.totalDivRecebido = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  totalDividendoDisponivel() {

    this.controleDividendosService.totalDividendoDisponivel()
    .then(response => {
      this.totalDivDisponivel = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  alterarStatusAtivo(controlDivs: any): void {

    const novoStatus = !controlDivs.divUtilizado;

    this.controleDividendosService.mudarStatusAtivo(controlDivs.controleDividendoId, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      controlDivs.divUtilizado = novoStatus;
      this.totalDividendoDisponivel();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
