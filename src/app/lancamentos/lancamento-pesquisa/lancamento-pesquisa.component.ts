import { LancamentoService } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit{

  lancamentos = [];

  constructor(private lancamentoService: LancamentoService) { }

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {

    this.lancamentoService.pesquisar()
    .then(lancamentos => this.lancamentos = lancamentos);
  }

}
