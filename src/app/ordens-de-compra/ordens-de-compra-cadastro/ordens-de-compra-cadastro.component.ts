import { OrdensDeCompraService } from './../ordens-de-compra.service';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormControl } from '@angular/forms';
import { OrdemDeCompra } from 'src/app/core/model';

@Component({
  selector: 'app-ordens-de-compra-cadastro',
  templateUrl: './ordens-de-compra-cadastro.component.html',
  styleUrls: ['./ordens-de-compra-cadastro.component.css']
})
export class OrdensDeCompraCadastroComponent implements OnInit {

  ordemDeCompra = new OrdemDeCompra;

  options: SelectItem[];
  value1: string = "COMPRA";
  valorInvestidoValue: number = 0;
  quantidadeCotas: number = 1;
  valorUnitario: number;
  codigoUsuarioLogado: string;
  tipoProdutoValue: string;

 // tipoProduto = [];
  ticker = [];
  tickerFiltro: string;

  tipoProduto = [
    {label: 'AÇÕES', value: 'ACOES'},
    {label: 'FUNDO DE INVESTIMENTOS', value: 'FUNDO_DE_INVESTIMENTOS'},
    {label: 'FIIS', value: 'FIIS'},
    {label: 'BDRS', value: 'BRDS'},
    {label: 'CRIPTOMOEDAS', value: 'CRIPTOMOEDAS'},
    {label: 'ETFS', value: 'ETFS'},
    {label: 'ETFs INTERNACIONAIS', value: 'ETFS_INTERNACIONAIS'},
    {label: 'OUTROS', value: 'OUTROS'}
  ]

  constructor(
    private title: Title,
    private ordemDeCompraService: OrdensDeCompraService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.options = [
      { label: 'Compra', value: 'COMPRA' },
      { label: 'Venda', value: 'VENDA' }
    ];
  }

  ngOnInit(): void {

    this.title.setTitle('Ordem de compra e venda RV');

    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    this.carregarProdutosCombobox();

    const codigoOrdemDeCompra = this.route.snapshot.params['codigo'];

    if(codigoOrdemDeCompra) {
      this.carregarPorId(codigoOrdemDeCompra);
    }
  }

  get editando() {

    return Boolean (this.ordemDeCompra.ordemDeCompraId);
  }


  carregarProdutosCombobox() {

    this.ordemDeCompraService.listarTodosProdutosRendaVariavel(this.codigoUsuarioLogado)
    .then(produtoResponse => {
      this.ticker = produtoResponse.map(p => {
        return {label: p.ticker, value: p.produtoId}
      });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  calcularValorInvestido() {
    // Certifique-se de que quantidadeCotas e valorUnitario são números antes de calcular
    if (!isNaN(this.quantidadeCotas) && !isNaN(this.valorUnitario)) {
      this.valorInvestidoValue = this.quantidadeCotas * this.valorUnitario;
    } else {
      // Lide com caso em que a quantidade de cotas ou o valor unitário não é um número válido
      this.valorInvestidoValue = 0;
    }
  }

  //Consulta valor da cota na API
  consultarValorAtualCota(filtro: string) {

    this.ordemDeCompraService.consultaValorAtualCota(filtro)
    .then(response => {
      this.tickerFiltro = response;

      if(response.ticker != null) {
        this.valorUnitario = response.valorAtualCota;
        this.calcularValorInvestido();
      }
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  //pega o valor do label do combobox
  onTickerChange(selectedProdutoId: any) {
    const selectedTicker = this.ticker.find(t => t.value === selectedProdutoId)?.label;

    if (selectedTicker) {
      this.consultarValorAtualCota(selectedTicker);
    }
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarOrdemDeCompra(form);

    } else {

      this.adicionar(form);
    }
  }


  adicionar(form: FormControl) {

    this.ordemDeCompra.quantidadeCotas = this.quantidadeCotas;
    this.ordemDeCompra.precoUnitarioCota = this.valorUnitario;
    this.ordemDeCompra.valorInvestido = this.valorInvestidoValue;
    this.ordemDeCompra.tipoAtivoEnum = this.tipoProdutoValue;
    this.ordemDeCompra.tipoOrdemRendaVariavelEnum = this.value1;

    this.ordemDeCompraService.adicionar(this.ordemDeCompra, this.codigoUsuarioLogado)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Ordem de Compra/Venda cadastrado com sucesso!', closable: false});
      form.reset();
      this.ordemDeCompra = new OrdemDeCompra();
      this.value1 = "COMPRA";
      this.valorInvestidoValue = 0;
      this.quantidadeCotas = 1;
      this.valorUnitario = 0;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarPorId(codigo: number) {

    this.ordemDeCompraService.buscarPorCodigo(codigo, this.codigoUsuarioLogado)
    .then(response => {
      this.ordemDeCompra = response;

      this.quantidadeCotas = response.quantidadeCotas;
      this.valorUnitario = response.precoUnitarioCota;
      this.valorInvestidoValue = response.valorInvestido;
      this.tipoProdutoValue = response.tipoAtivoEnum;
      this.value1 = response.tipoOrdemRendaVariavelEnum;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarOrdemDeCompra(form: FormControl) {

    this.ordemDeCompra.quantidadeCotas = this.quantidadeCotas;
    this.ordemDeCompra.precoUnitarioCota = this.valorUnitario;
    this.ordemDeCompra.valorInvestido = this.valorInvestidoValue;
    this.ordemDeCompra.tipoAtivoEnum = this.tipoProdutoValue;
    this.ordemDeCompra.tipoOrdemRendaVariavelEnum = this.value1;

    this.ordemDeCompraService.atualizarOrdemDeCompra(this.ordemDeCompra, this.codigoUsuarioLogado)
    .then(response => {
      this.ordemDeCompra = response;
      this.messageService.add({ severity: 'success', detail: 'Ordem de Compra/Venda atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
