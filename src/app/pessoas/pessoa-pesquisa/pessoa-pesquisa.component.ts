import { PessoaFiltro, PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoa-pesquisa',
  templateUrl: './pessoa-pesquisa.component.html',
  styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

  pessoas = [];
  nomePessoa: string

  constructor(
    private pessoaService: PessoaService
  ) { }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisar() {

    const filtro: PessoaFiltro = {
      nomePessoa: this.nomePessoa
    }

    this.pessoaService.pesquisarPessoa(filtro)
    .then(pessoa => {
      this.pessoas = pessoa;
    })
  }

}
