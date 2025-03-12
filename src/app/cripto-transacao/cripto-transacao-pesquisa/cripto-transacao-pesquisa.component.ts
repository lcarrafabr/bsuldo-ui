import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CriptoTransacaoService } from '../cripto-transacao.service';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cripto-transacao-pesquisa',
  templateUrl: './cripto-transacao-pesquisa.component.html',
  styleUrls: ['./cripto-transacao-pesquisa.component.css']
})
export class CriptoTransacaoPesquisaComponent implements OnInit {

  @ViewChild('tabela', { static: true }) grid: Table;

  codigoUsuarioLogado: string;
  criptoTransacaoResponse = [];

  constructor(
    private criptoTransacaoService: CriptoTransacaoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Cripto transação');
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    this.pesquisar();
  }


  isEntrada(tipo: string): boolean {
    const tiposEntrada = [
      "COMPRA",
      "TRANSFERENCIA_ENTRADA",
      "AIRDROP",
      "HARD_FORK",
      "REDENOMINACAO",
      "STAKING_RECOMPENSA",
      "MINERACAO"
    ];
    return tiposEntrada.includes(tipo);
  }



  pesquisar() {

    this.criptoTransacaoService.listarTodos(this.codigoUsuarioLogado)
      .then(response => {
        this.criptoTransacaoResponse = response;

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
