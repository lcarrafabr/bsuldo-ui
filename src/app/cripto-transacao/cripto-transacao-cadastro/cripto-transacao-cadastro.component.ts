import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WalletService } from '../../wallets/wallet.service';
import { CriptoTransacaoService } from '../cripto-transacao.service';
import { FormControl } from '@angular/forms';
import { CriptoTransacao } from '../../core/model';

@Component({
  selector: 'app-cripto-transacao-cadastro',
  templateUrl: './cripto-transacao-cadastro.component.html',
  styleUrls: ['./cripto-transacao-cadastro.component.css']
})
export class CriptoTransacaoCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;

  criptoTransacao = new CriptoTransacao;

  precoBrl: number = 0.0;
  quantidade: number = 1;
  valorInvestido: number = 0;
  valorInvestidoValue: number = 0;
  siglaMoeda: string = '';

  moedaValue: string;
  tipoLancamentoValue: string;

  tipoOrdemCriptoOptions = [
    { label: 'COMPRA', value: 'COMPRA' },
    { label: 'VENDA', value: 'VENDA' },
    { label: 'TRANSFERÊNCIA ENTRADA', value: 'TRANSFERENCIA_ENTRADA' },
    { label: 'TRANSFERÊNCIA SAÍDA', value: 'TRANSFERENCIA_SAIDA' },
    { label: 'AIRDROP', value: 'AIRDROP' },
    { label: 'HARD FORK', value: 'HARD_FORK' },
    { label: 'REDENOMINAÇÃO', value: 'REDENOMINACAO' },
    { label: 'STAKING RECOMPENSA', value: 'STAKING_RECOMPENSA' },
    { label: 'MINERAÇÃO', value: 'MINERACAO' },
    { label: 'QUEIMA', value: 'QUEIMA' }
  ];

  moedaOption = [];
  moeda: Array<{ value: string; label: string }> = [];
  moedaCotacaoResponse = [];

  carteira = [];

  constructor(
    private criptoTransacaoService: CriptoTransacaoService,
    private walletService: WalletService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Transação cripto');
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    const codigoCriptoTransacao = this.route.snapshot.params['codigo'];

    if(codigoCriptoTransacao) {
      this.carregarPorId(codigoCriptoTransacao);
    }

    this.carregarComboWallets();
    this.carregarComboMoedas();


  }


  get editando() {

    return Boolean(this.criptoTransacao.codigoCriptoTransacao);
  }


  carregarComboWallets() {

    return this.walletService.listarWalletsAtivos(this.codigoUsuarioLogado)
      .then(walletResponse => {
        this.carteira = walletResponse.map(w => {
          return { label: w.nomeWallet, value: w.codigoWallet }
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


  carregarComboMoedas() {

    return this.criptoTransacaoService.listarComboMoedas()
      .then(moedaResponse => {
        this.moedaOption = moedaResponse.map(moeda => {
          return { label: moeda, value: moeda }
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


  //Consulta valor da cota na API
  consultarValorAtualCota(filtro: string) {

    this.criptoTransacaoService.consultaValorAtualCota(filtro)
      .then(response => {
        this.moedaCotacaoResponse = response;

        if (response.symbol != null) {
          this.precoBrl = response.price.toFixed(10);
          this.siglaMoeda = filtro;
          //this.calcularValorInvestido();
        }
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

  //pega o valor do label do combobox
  onTickerChange(event: any) {
    const selectedMoeda = event.value; // Pega o valor correto do evento
    this.moeda.find(t => t.value === selectedMoeda)?.label;

    if (selectedMoeda) {
      this.consultarValorAtualCota(selectedMoeda);
    }
  }

  onTickerBlur(event: any) {
    const typedValue = event.target.value; // Captura o valor digitado manualmente pelo usuário

    if (typedValue) {
      this.consultarValorAtualCota(typedValue);
    }
  }

  calcularValorInvestido() {
    // Converte para número antes de calcular
    const quantidadeNum = Number(this.quantidade.toString().replace(",", "."));
    const valorInvestidoNum = Number(this.valorInvestido.toString().replace(",", "."));

    console.log('quantidadeNum: ' + quantidadeNum);
    console.log('valorInvestidoNum: ' + valorInvestidoNum);

    if (!isNaN(quantidadeNum) && !isNaN(valorInvestidoNum) && quantidadeNum !== 0) {
      this.valorInvestidoValue = Number((valorInvestidoNum / quantidadeNum).toFixed(2));
    } else {
      this.valorInvestidoValue = 0;
    }
  }


  salvar(form: FormControl) {

    if (this.editando) {

      this.atualizarOrdemDeCompra(form);

    } else {

      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {

    this.criptoTransacao.moeda = this.moedaValue;
    this.criptoTransacao.quantidade = Number(String(this.quantidade).replace(",", "."));
    this.criptoTransacao.precoNegociacao = Number(String(this.valorInvestidoValue).replace(",", "."));
    this.criptoTransacao.valorInvestido = Number(String(this.valorInvestido).replace(",", "."));
    this.criptoTransacao.tipoOrdemCripto = this.tipoLancamentoValue;

    this.criptoTransacaoService.adicionar(this.criptoTransacao, this.codigoUsuarioLogado)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Ordem de Compra/Venda cadastrado com sucesso!', closable: false });
        form.reset();
        this.criptoTransacao = new CriptoTransacao();
        this.moedaValue = "";
        this.valorInvestidoValue = 0;
        this.quantidade = 1;
        this.precoBrl = 0;
        this.valorInvestido = 0;
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

    this.criptoTransacaoService.buscarPorCodigo(codigo, this.codigoUsuarioLogado)
      .then(response => {
        this.criptoTransacao = response;

        this.quantidade = response.quantidade;
        this.valorInvestido = response.valorInvestido;
        this.tipoLancamentoValue = response.tipoOrdemCripto;
        this.moedaValue = response.moeda;
        this.valorInvestidoValue = response.precoNegociacao;
        //this.tipoOrdemRendaVariavelvalue = response.tipoOrdemRendaVariavelEnum;
      })
      .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }



  atualizarOrdemDeCompra(form: FormControl) {

    this.criptoTransacao.moeda = this.moedaValue;
    this.criptoTransacao.quantidade = Number(String(this.quantidade).replace(",", "."));
    this.criptoTransacao.precoNegociacao = Number(String(this.valorInvestidoValue).replace(",", "."));
    this.criptoTransacao.valorInvestido = Number(String(this.valorInvestido).replace(",", "."));
    this.criptoTransacao.tipoOrdemCripto = this.tipoLancamentoValue;

    this.criptoTransacaoService.atualizarCriptoTransacao(this.criptoTransacao, this.codigoUsuarioLogado)
      .then(response => {
        this.criptoTransacao = response;
        this.messageService.add({ severity: 'success', detail: 'Ordem de Compra/Venda atualizado com sucesso!', closable: false });
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
