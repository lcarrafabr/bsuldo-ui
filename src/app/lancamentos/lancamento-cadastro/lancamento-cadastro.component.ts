import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { MessageService } from 'primeng/api';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MetodoCobrancaService } from './../../metodo-cobrancas/metodo-cobranca.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  parcelado: boolean = false;

  categoria = []
  metodoCobranca = []
  lancamento = new Lancamento
  codigoUsuarioLogado: string;

  constructor(
    private metodoCobrancaService: MetodoCobrancaService,
    private errorHandler: ErrorHandlerService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const codigoLancamento = this.route.snapshot.params['codigo'];
    this.codigoUsuarioLogado = localStorage.getItem('ID');

    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarMetodoCobranca();
    this.carregarCategorias();
  }

  get editando() {

    return Boolean (this.lancamento.lancamentoId)
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {

    this.lancamento.parcelado = this.parcelado
    this.lancamento.numeroParcela = 1;
    this.lancamento.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    if(this.parcelado == false) {
      this.lancamento.quantidadeParcelas = 1;
      this.lancamento.numeroParcela = 1;
    }

    if(this.lancamento.dataPagamento != null) {
      this.lancamento.situacao = 'PAGO';
    }

    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento cadastrado com sucesso!', closable: false});
      form.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {

    console.log(this.lancamento.situacao);
    console.log(this.lancamento.dataPagamento);

    if(this.lancamento.dataPagamento == null && this.lancamento.situacao == 'VENCIDO') {
      this.lancamento.situacao = 'VENCIDO';
    }

    if(this.lancamento.dataPagamento != null) {
      this.lancamento.situacao = 'PAGO';
    }

    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.messageService.add({severity: 'success', detail: 'Lancamento atualizado com sucesso!', closable: false});
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarMetodoCobranca() {

    return this.metodoCobrancaService.listarTodos()
    .then(metodoCobrancas => {
      this.metodoCobranca = metodoCobrancas.map(m => {
        return { label: m.nomeMetodoCob, value: m.metodoCobrancaId }
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {

    return this.categoriaService.listarTodos()
    .then(categorias => {
      this.categoria = categorias.map(c => {
        return { label: c.nomeCategoria, value: c.categoriaId }
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  carregarLancamento(codigo: number) {

    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.parcelado = lancamento.parcelado;
      this.lancamento = lancamento;
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

}
