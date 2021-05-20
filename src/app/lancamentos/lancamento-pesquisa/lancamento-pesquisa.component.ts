import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent {

  lancamentos = [
    {descricao: 'CARREFOUR', valor: 'RS285,90', dataVencimento: '14/05/2021', dataPagamento: null, parcela: '1/1'},
    {descricao: 'Viagem monte verde', valor: 'RS3800,00', dataVencimento: '10/04/2021', dataPagamento: '10/04/2021', parcela: '5/6'},
    {descricao: 'Gasolina QQ', valor: 'RS120,00', dataVencimento: '10/05/2021', dataPagamento: null, parcela: '1/1'},
    {descricao: 'Compras Cuplover', valor: 'RS7895,56', dataVencimento: '29/05/2021', dataPagamento: null, parcela: '1/1'},
    {descricao: 'Shooping aricanduva', valor: 'RS462,95', dataVencimento: '25/05/2021', dataPagamento: null, parcela: '2/2'},
    {descricao: 'Ingles Wise Up', valor: 'RS595,56', dataVencimento: '29/05/2021', dataPagamento: '15/05/2021', parcela: '1/1'}
  ];

}
