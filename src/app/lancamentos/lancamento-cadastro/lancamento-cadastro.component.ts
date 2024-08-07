import { LancamentoService } from './../lancamento.service';
import { Bancos, Lancamento } from './../../core/model';
import { MessageService, SelectItem } from 'primeng/api';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MetodoCobrancaService } from './../../metodo-cobrancas/metodo-cobranca.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BancoService } from 'src/app/bancos/banco.service';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  parcelado: boolean = false;
  recorrente: boolean = false;
  lancRecorrente: number;

  categoria = [];
  metodoCobranca = [];
  bancosAtivos = [];
  lancamento = new Lancamento;
  codigoUsuarioLogado: string;

  tipoLancamentoValue: string = 'DESPESA';
  //tipoLancamento = [];

  tipoLancamento = [];


  constructor(
    private lancamentoService: LancamentoService,
    private metodoCobrancaService: MetodoCobrancaService,
    private categoriaService: CategoriaService,
    private bancoService: BancoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {
    this.tipoLancamento = [
      {label: 'DESPESA', value: 'DESPESA'},
      {label: 'RECEITA', value: 'RECEITA'}
    ];
   }

  ngOnInit(): void {

    const codigoLancamento = this.route.snapshot.params['codigo'];
    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    if(codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarMetodoCobranca();
    this.carregarCategorias();
    this.carregarBancosAtivos();
    this.tipoLancamentoValue = 'DESPESA';

  }

  get editando() {

    return Boolean (this.lancamento.lancamentoId)
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarLancamento(form);
    } else {
      if(this.recorrente == false) {
        this.adicionarLancamento(form);

      } else {

        this.adicionarLancamentoRecorrente(form);
      }

    }
  }

  adicionarLancamento(form: FormControl) {

    let travaCadastro = false;

    this.lancamento.parcelado = this.parcelado
    this.lancamento.numeroParcela = 1;
    this.lancamento.lancRecorrente = false;
    this.lancamento.tipoLancamento = this.tipoLancamentoValue;

    if(this.parcelado == false) {
      this.lancamento.quantidadeParcelas = 1;
      this.lancamento.numeroParcela = 1;
    }

    if(this.lancamento.dataPagamento != null && this.tipoLancamentoValue == 'DESPESA') {
      this.lancamento.situacao = 'PAGO';
    }

    if(this.lancamento.dataPagamento != null && this.tipoLancamentoValue == 'RECEITA' && this.lancamento.banco.bancoId != undefined) {
      this.lancamento.situacao = 'RECEBIDO';
    }

    travaCadastro = this.validarSituacaoRecebido();


    if(travaCadastro) {
      this.messageService.add({ severity: 'warn', detail: 'Informe um banco', closable: false});
    }



    if(!travaCadastro) {
        this.lancamentoService.adicionar(this.lancamento, this.codigoUsuarioLogado)
        .then(() => {
          this.messageService.add({ severity: 'success', detail: 'Lançamento cadastrado com sucesso!', closable: false});
          form.reset();
          this.lancamento = new Lancamento();
        })
        .catch(erro => this.errorHandler.handle(erro));
      }
  }


  validarSituacaoRecebido(): boolean {

    let travaCadastro = false;
    if(this.lancamento.dataPagamento != null && this.tipoLancamentoValue == 'RECEITA' && this.lancamento.banco.bancoId == undefined) {

      travaCadastro = true;
    }

    console.log("Antes de despesa");
    if(this.lancamento.dataPagamento != null && this.tipoLancamentoValue == 'DESPESA' && this.lancamento.banco.bancoId == undefined) {
      console.log("entrei no despesa");
      travaCadastro = true;
    }
    return travaCadastro;
  }


  adicionarLancamentoRecorrente(form: FormControl) {

    this.lancamento.parcelado = false
    this.lancamento.numeroParcela = 1;
    this.lancamento.lancRecorrente = true;
    this.lancamento.tipoLancamento = this.tipoLancamentoValue;

    if(this.parcelado == false) {
      this.lancamento.quantidadeParcelas = 1;
      this.lancamento.numeroParcela = 1;
    }

    if(this.lancamento.dataPagamento != null) {
      this.lancamento.situacao = 'PAGO';
    }

    this.lancamentoService.adicionarLancamentoRecorrente(this.lancamento, this.lancRecorrente.toString(), this.codigoUsuarioLogado)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento recorrente cadastrado com sucesso!', closable: false});
      form.reset();
      this.lancamento = new Lancamento();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  atualizarLancamento(form: FormControl) {

    let travaCadastro = false;

    this.lancamento.tipoLancamento = this.tipoLancamentoValue;

    if(this.lancamento.dataPagamento == null && this.lancamento.situacao == 'VENCIDO') {
      this.lancamento.situacao = 'VENCIDO';
    }

    if(this.lancamento.dataPagamento != null && this.tipoLancamentoValue == 'DESPESA') {
      this.lancamento.situacao = 'PAGO';
    }

    if(this.lancamento.dataPagamento != null && this.tipoLancamentoValue == 'RECEITA') {
      this.lancamento.situacao = 'RECEBIDO'
    }

    travaCadastro = this.validarSituacaoRecebido();


    if(travaCadastro) {
      this.messageService.add({ severity: 'warn', detail: 'Informe um banco', closable: false});
    }

    if(!travaCadastro) {

      this.lancamentoService.atualizar(this.lancamento, this.codigoUsuarioLogado)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.messageService.add({severity: 'success', detail: 'Lancamento atualizado com sucesso!', closable: false});
      })
      .catch(erro => this.errorHandler.handle(erro));
    }
  }

  carregarMetodoCobranca() {

    return this.metodoCobrancaService.listarTodos(this.codigoUsuarioLogado)
    .then(metodoCobrancas => {
      this.metodoCobranca = metodoCobrancas.map(m => {
        return { label: m.nomeMetodoCob, value: m.metodoCobrancaId }
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {

    return this.categoriaService.listarTodos(this.codigoUsuarioLogado)
    .then(categorias => {
      this.categoria = categorias.map(c => {
        return { label: c.nomeCategoria, value: c.categoriaId }
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarBancosAtivos() {

    return this.bancoService.listaBancosAtivos(this.codigoUsuarioLogado)
    .then(response => {
      this.bancosAtivos = response.map(m => {
        return { label: m.nomeBanco, value: m.bancoId }
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  carregarLancamento(codigo: number) {

    this.lancamentoService.buscarPorCodigo(codigo)
    .then(lancamento => {
      this.parcelado = lancamento.parcelado;
      this.recorrente = lancamento.lancRecorrente;
      this.lancamento = lancamento;
      this.tipoLancamentoValue = lancamento.tipoLancamento;

       // Inicializar banco se estiver nulo
       if (!this.lancamento.banco) {
        this.lancamento.banco = new Bancos();
      }

    })
    .catch(erro => this.errorHandler.handle(erro));

  }

}
