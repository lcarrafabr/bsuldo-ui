import { Pessoa } from './../../core/model';
import { FormControl, NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa;
  selectedCity = [];

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const codigoPessoa = this.route.snapshot.params['codigo'];

    if(codigoPessoa) {
      this.carregarPessoaPorID(codigoPessoa);
    }
  }

  get editando() {

    return Boolean (this.pessoa.pessoaID);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarPessoa(form);

    } else {

      this.cadastrarPessoa(form);
    }
  }

  atualizarPessoa(form: FormControl) {

    this.pessoaService.atualizarPessoa(this.pessoa)
    .then(pessoas => {
      this.pessoa = pessoas;
      this.messageService.add({ severity: 'success', detail: 'Pessoa atualizada com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  cadastrarPessoa(form: FormControl) {

    this.pessoaService.adicionar(this.pessoa)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Pessoa cadastrada com sucesso!', closable: false });
      form.reset();
      this.pessoa = new Pessoa();

    })
    .catch(erro => this.errorHandler.handle(erro['error']));
  }

  carregarPessoaPorID(codigo: number) {

    this.pessoaService.buscaPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/novo']);
  }

}
