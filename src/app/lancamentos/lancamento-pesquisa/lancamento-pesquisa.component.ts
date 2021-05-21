import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent {

  lancamentos = [
    {descricao: 'CARREFOUR', valor: '285.90', dataVencimento: new Date(2021,5,14), dataPagamento: null, parcela: '1/1'},
    {descricao: 'Viagem monte verde', valor: '3800.00', dataVencimento: new Date(2021,4,10), dataPagamento: new Date(2021,4,10), parcela: '5/6'},
    {descricao: 'Gasolina QQ', valor: '120.00', dataVencimento: new Date(2021,5,19), dataPagamento: null, parcela: '1/1'},
    {descricao: 'Compras Cuplover', valor: '7895.56', dataVencimento: new Date(2021,5,29), dataPagamento: null, parcela: '1/1'},
    {descricao: 'Shooping aricanduva', valor: '462.95', dataVencimento: new Date(2021,5,15), dataPagamento: null, parcela: '2/2'},
    {descricao: 'Ingles Wise Up', valor: '595.56', dataVencimento: new Date(2021,5,27), dataPagamento: new Date(2021,5,15), parcela: '1/1'}
  ];

}
