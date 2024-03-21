import { OrdemRendaFixaServiceService } from './../ordem-renda-fixa-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { OrdemRendaFixa } from 'src/app/core/model';

@Component({
  selector: 'app-ordem-renda-fixa-cadastro',
  templateUrl: './ordem-renda-fixa-cadastro.component.html',
  styleUrls: ['./ordem-renda-fixa-cadastro.component.css']
})
export class OrdemRendaFixaCadastroComponent implements OnInit {

  tipos = [
    { label: 'Aplicação', value: 'APLICACAO' },
    { label: 'Resgate', value: 'RESGATE' }
  ];

  produtos =[];
  ordemRendaFixa = new OrdemRendaFixa;
  idProdutoEdicao: string;
  tipoOrdem: string;
  codigoUsuarioLogado: string;

  constructor(
    private title: Title,
    private ordemRendaFixaService: OrdemRendaFixaServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('IDS');

    this.tipoOrdem= 'APLICACAO';
    this.title.setTitle('Ordem de lançamentos RF');
    this.carregarComboProdutos();

    const codigoOrdemRF = this.route.snapshot.params['codigo'];

    if(codigoOrdemRF) {
      this.carregarOrdemRFPorId(codigoOrdemRF);
    }

  }


  get editando() {

    return Boolean (this.ordemRendaFixa.ordemRendaFixaId)
  }

  carregarComboProdutos() {

    this.ordemRendaFixaService.listarProdutosRendaFixa()
    .then(produtosResponse => {
      this.produtos = produtosResponse.map(p => {
        return {label: p.nomeProduto, value: p.produtoRendaFixaId}
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarOrdemRF(form);

    } else {
      this.adicionarOrdemRendaFixa(form);

    }
  }

  adicionarOrdemRendaFixa(form: FormControl) {

    this.ordemRendaFixa.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);
    this.ordemRendaFixa.tipoOrdemRendaFixaEnum = this.tipoOrdem;


    this.ordemRendaFixaService.adicionar(this.ordemRendaFixa)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Ordem Renda Fixa cadastrado com sucesso!', closable: false});
      form.reset();
      this.ordemRendaFixa = new OrdemRendaFixa();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarOrdemRFPorId(codigo: number) {

    this.ordemRendaFixaService.buscarPorCodigo(codigo)
    .then(ordemRF => {
      this.ordemRendaFixa = ordemRF;

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarOrdemRF(form: FormControl) {

    this.ordemRendaFixa.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);
    this.ordemRendaFixa.tipoOrdemRendaFixaEnum = this.tipoOrdem;

    this.ordemRendaFixaService.editarOrdemRendaFixa(this.ordemRendaFixa)
    .then(response => {
      this.ordemRendaFixa = response;
      this.messageService.add({ severity: 'success', detail: 'Ordem Renda Fixa atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.ordemRendaFixa = new OrdemRendaFixa();
    }.bind(this), 1);

    this.router.navigate(['/ordem-renda-fixa/novo']);
  }

}
