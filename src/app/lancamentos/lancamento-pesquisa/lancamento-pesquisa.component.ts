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

  @ViewChild('tabela', {static: true}) grid: Table;

  status = [
    {label: 'PENDENTE', value: 'PENDENTE'},
    {label: 'PAGO', value: 'PAGO'},
    {label: 'VENCIDO', value: 'VENCIDO'}
  ]

  metodoCobranca = [
    {label: 'Cartão Santander', value: 1},
    {label: 'Cartão Marisa', value: 2},
    {label: 'Cartão Bradesco', value: 3},
    {label: 'PIX Inter', value: 4},
    {label: 'Cartão Inter', value: 1}
  ]

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
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
    .then(lancamentos => this.lancamentos = lancamentos);
  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.lancamentoId)
    .then(()=> {
      console.log('Excluido com sucesso');
      this.grid.reset();
      this.pesquisar();
    })
  }

}
