import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrigemService } from '../../origens/origem.service';
import { WalletService } from '../wallet.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Wallets } from '../../core/model';

@Component({
  selector: 'app-walet-cadastro',
  templateUrl: './walet-cadastro.component.html',
  styleUrls: ['./walet-cadastro.component.css']
})
export class WaletCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;

  wallet = new Wallets;

  origensOption = [];
  tipoCarteiraOption = [
    { label: 'QUENTE', value: 'QUENTE' },
    { label: 'FRIA', value: 'FRIA' }
  ]

  constructor(
    private walletService: WalletService,
    private origenService: OrigemService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Wallets cadastro');
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    const codigoWallet = this.route.snapshot.params['codigo'];

    if (codigoWallet) {
      this.carregarPorId(codigoWallet);
    }

    this.carregarComboOrigens();
  }

  get editando() {

    return Boolean(this.wallet.codigoWallet);
  }

  salvar(form: FormControl) {

    if (this.editando) {

      this.atualizarWallet(form);

    } else {

      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {

    const origemId = this.wallet.origem.codigoOrigem;

    if (origemId === undefined) {

      this.messageService.add({ severity: 'error', detail: "O campo origem é obrigatório." });
      return;
    }



    this.walletService.adicionar(this.wallet, this.codigoUsuarioLogado)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Banco cadastrado com sucesso!', closable: false });
        form.reset();
        this.wallet = new Wallets();
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

  atualizarWallet(form: FormControl) {

    this.walletService.atualizarWallet(this.wallet, this.codigoUsuarioLogado)
      .then(response => {
        this.wallet = response;
        this.messageService.add({ severity: 'success', detail: 'Wallet atualizado com sucesso!', closable: false });
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

  carregarPorId(codigo: string) {

    this.walletService.buscarPorCodigo(codigo, this.codigoUsuarioLogado)
      .then(response => {
        this.wallet = response;

      })
      .catch(erro => this.errorHandler.handle(erro.error.mensagemUsuario));
  }

  carregarComboOrigens() {

    return this.origenService.listaOrigensAtivas(this.codigoUsuarioLogado)
      .then(origemResponse => {
        this.origensOption = origemResponse.map(o => {
          return { label: o.nomeOrigem, value: o.codigoOrigem }
        });
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
