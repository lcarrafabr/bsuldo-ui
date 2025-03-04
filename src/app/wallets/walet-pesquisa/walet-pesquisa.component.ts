import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-walet-pesquisa',
  templateUrl: './walet-pesquisa.component.html',
  styleUrls: ['./walet-pesquisa.component.css']
})
export class WaletPesquisaComponent implements OnInit {

  @ViewChild('tabela', { static: true }) grid: Table;

  codigoUsuarioLogado: string;
  walletResponse = [];

  constructor(
    private walletService: WalletService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Wallets');
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    this.pesquisar();
  }


  pesquisar() {

    this.walletService.listarTodos(this.codigoUsuarioLogado)
      .then(response => {
        console.log(response);
        this.walletResponse = response;

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


  confirmaExclusao(wallet: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o wallet: ' + wallet.nomeCarteira + '?',
      accept: () => {
        this.removeWallet(wallet);
      }
    });
  }

  removeWallet(wallet: any) {

    this.walletService.removerWallet(wallet.codigoWallet)
      .then(() => {
        this.grid.clear();
        this.pesquisar();
        this.messageService.add({ severity: 'success', detail: 'Wallet removido com sucesso!', closable: false });
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


  alterarStatusAtivo(wallet: any): void {

    const novoStatus = !wallet.status;

    this.walletService.mudarStatusAtivo(wallet.codigoWallet, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ATIVO' : 'INATIVO';

        wallet.status = novoStatus;
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
