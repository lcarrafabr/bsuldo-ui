import { JwtHelperService } from '@auth0/angular-jwt';
import { MetodoCobrancaService } from './../../metodo-cobrancas/metodo-cobranca.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit{

  lancamentos = [];
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  situacao: string;
  chavePesquisa: string;
  chavePesquisaPesquisada = '';
  jwtPayloadId: any;

  @ViewChild('tabela', {static: true}) grid: Table;

  status = [
    {label: 'PENDENTE', value: 'PENDENTE'},
    {label: 'PAGO', value: 'PAGO'},
    {label: 'VENCIDO', value: 'VENCIDO'}
  ]

  metodoCobranca = []
  valorAPagarNoMes: number;

  constructor(private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private metodoCobrancaService: MetodoCobrancaService,
    private jwtHelper: JwtHelperService,
    ) { }

  ngOnInit() {
    this.pesquisar();
    this.carregarMetodoCobranca();
    this.carregaValorNoMes();


    this.jwtPayloadId = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    localStorage.setItem('ID', this.jwtPayloadId.id);

  }

  pesquisar() {

    const filtro : LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim,
      situacao: this.situacao,
      chavePesquisa: this.chavePesquisa
    };

    this.lancamentoService.pesquisar(filtro)
    .then(lancamentos => {
      this.lancamentos = lancamentos
      this.carregaValorNoMes();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(lancamento: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o lançamento ' + lancamento.descricao + ' no valor de: ' + lancamento.valor + '?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.lancamentoId)
    .then(()=> {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!', closable: false});
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

  carregaValorNoMes() {

    return this.lancamentoService.buscaValorNoMes()
    .then(valor => {
      this.valorAPagarNoMes = valor;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  buscarPorCodigo(codigo: number) {

    return this.lancamentoService.buscarPorCodigo(codigo)
    .then(lanc => {
      this.chavePesquisa = lanc.chavePesquisa;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
