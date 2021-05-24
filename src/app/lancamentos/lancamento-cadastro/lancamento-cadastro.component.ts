import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { MessageService } from 'primeng/api';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MetodoCobrancaService } from './../../metodo-cobrancas/metodo-cobranca.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor(
    private metodoCobrancaService: MetodoCobrancaService,
    private errorHandler: ErrorHandlerService,
    private categoriaService: CategoriaService,
    private messageService: MessageService,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit(): void {
    this.carregarMetodoCobranca();
    this.carregarCategorias();
  }

  salvar(form: FormControl) {

    this.lancamento.parcelado = this.parcelado
    this.lancamento.pessoa.pessoaID = 1;
    this.lancamento.numeroParcela = 1;
    this.lancamento.descricao = 'TESTE';
    console.log('Categorias: ' + this.lancamento.categoria)
    console.log('Categorias ID: ' + this.lancamento.categoria.categoriaId)

    console.log(this.lancamento);

    this.lancamentoService.adicionar(this.lancamento)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Lançamento cadastrado com sucesso!', closable: false});
      form.reset();
      this.lancamento = new Lancamento();
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

}
