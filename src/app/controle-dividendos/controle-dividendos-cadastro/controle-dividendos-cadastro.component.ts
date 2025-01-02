import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ControleDividendosService } from '../controle-dividendos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { ControleDividendos } from '../../core/model';


interface ProdutoListItem {
  label: string;
  value: string | number; // Use o tipo correto de `produtoId`
}

@Component({
  selector: 'app-controle-dividendos-cadastro',
  templateUrl: './controle-dividendos-cadastro.component.html',
  styleUrls: ['./controle-dividendos-cadastro.component.css']
})
export class ControleDividendosCadastroComponent implements OnInit {

  produtos = [];
  //tipoprodutoList = [];
  tipoprodutoList: ProdutoListItem[] = [];
  controleDividendos = new ControleDividendos;
  tipoAtivo: string;

  codigoUsuarioLogado: string;

  tipoRecebimento = [
    {label: 'A RECEBER', value: 'A_RECEBER'},
    {label: 'RECEBIDO', value: 'RECEBIDO'}
  ]

  tipoDividendo = [
    {label: 'DIVIDENDO', value: 'DIVIDENDO'},
    {label: 'JCP', value: 'JCP'},
    {label: 'REND. TRIBUTADO', value: 'REND_TRIBUTADO'},
    {label: 'FRAÇÕES', value: 'FRACOES'}
  ]

  constructor(
    private controleDividendosService: ControleDividendosService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    const codigoControleDividendo = this.route.snapshot.params['codigo'];

    if(codigoControleDividendo) {
      this.carregarPorId(codigoControleDividendo);
    }


    this.carregarProdutosCombobox();
  }

  get editando() {

    return Boolean (this.controleDividendos.controleDividendoId);
  }


  carregarProdutosCombobox() {

    this.controleDividendosService.listarProdutosCombobox(this.codigoUsuarioLogado)
    .then(response => {

      this.tipoprodutoList = response.map(p => {
        return {label: p.tipoProdutoEnum, value: p.produtoId}
      });

      this.produtos = response.map(p => {
        return {label: p.ticker, value: p.produtoId}
      });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  onTickerChange(selectedProdutoId: any) {


    const selectedTicker = this.tipoprodutoList.find(t => t.value === selectedProdutoId)?.label;
    if (selectedTicker) {
      this.tipoAtivo = selectedTicker;
    }
  }


  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarControleDividendos(form);

    } else {

      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {

    const divUtilizado = this.controleDividendos.divUtilizado;
    if(divUtilizado == null) {
      this.controleDividendos.divUtilizado = false;
    }

    this.controleDividendos.tipoAtivoEnum = this.tipoAtivo;
    //this.controleDividendos.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.controleDividendosService.adicionar(this.controleDividendos, this.codigoUsuarioLogado)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Dividendo cadastrado com sucesso!', closable: false});
      form.reset();
      this.controleDividendos = new ControleDividendos();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarPorId(codigo: number) {

    this.controleDividendosService.buscarPorCodigo(codigo)
    .then(response => {
      this.controleDividendos = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarControleDividendos(form: FormControl) {

    const divUtilizado = this.controleDividendos.divUtilizado;
    if(divUtilizado == null) {
      this.controleDividendos.divUtilizado = false;
    }

    if(this.tipoAtivo == null) {
      this.onTickerChange(this.controleDividendos.produtosRendaVariavel.produtoId);
    }

    this.controleDividendos.tipoAtivoEnum = this.tipoAtivo;
    //this.controleDividendos.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.controleDividendosService.atualizarControleDividendos(this.controleDividendos, this.codigoUsuarioLogado)
    .then(response => {
      this.controleDividendos = response;
      this.messageService.add({ severity: 'success', detail: 'Controle dividendo atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
