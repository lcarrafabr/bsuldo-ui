import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  checked: boolean = true;

  categoria = [
    {label: 'Alimentação', value: 1},
    {label: 'Estudos', value: 2},
    {label: 'Automóvel', value: 3}
  ]

  metodoCobranca = [
    {label: 'Cartão Santander', value: 1},
    {label: 'Cartão Marisa', value: 2},
    {label: 'Cartão Bradesco', value: 3},
    {label: 'PIX Inter', value: 4},
    {label: 'Cartão Inter', value: 1}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
