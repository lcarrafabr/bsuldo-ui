import { FormControl } from '@angular/forms';
import { AcompanhamentoEstrategicoService } from './../acompanhamento-estrategico.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AcompanhamentoEstrategico } from 'src/app/core/model';

@Component({
  selector: 'app-acompanhamento-estrategico-cadastro',
  templateUrl: './acompanhamento-estrategico-cadastro.component.html',
  styleUrls: ['./acompanhamento-estrategico-cadastro.component.css']
})
export class AcompanhamentoEstrategicoCadastroComponent implements OnInit {

  segmentos = [];
  setores = [];
  acompanhamentoEstrategico = new AcompanhamentoEstrategico;

  codigoUsuarioLogado: string;


  statusAcompanhamento = [
    {label: 'EM ANÁLISE', value: 'EM_ANALISE'},
    {label: 'APROVADO COMPRA', value: 'APROVADO_COMPRA'},
    {label: 'COMPRADO', value: 'COMPRADO'},
    {label: 'POSSÍVEL COMPRA', value: 'POSSIVEL_COMPRA'},
    {label: 'CONGELADO PARA ANÁLISE', value: 'CONGELADO_PARA_ANALISE'},
    {label: 'REJEITADO', value: 'REJEITADO'}
  ]

  constructor(
    private title: Title,
    private acompanhamentoEstrategicoService: AcompanhamentoEstrategicoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.codigoUsuarioLogado = localStorage.getItem('IDS');

    this.title.setTitle('Cadastro Acomp. estratégico');

    const codigoAcompEstrategico = this.route.snapshot.params['codigo'];
    if(codigoAcompEstrategico) {
      this.carregarPorId(codigoAcompEstrategico);
    }

    this.carregarSegmentos();
    this.carregarSetores();
  }

  get editando() {

    return Boolean (this.acompanhamentoEstrategico.acompEstrategicoId);
  }


  carregarSegmentos() {

    this.acompanhamentoEstrategicoService.listarSegmentosAtivos()
    .then(segmentosResponse => {
      this.segmentos = segmentosResponse.map(p => {
        return {label: p.nomeSegmento, value: p.segmentoId}
      });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarSetores() {

    this.acompanhamentoEstrategicoService.listarSetoresAtivos()
    .then(setoresResponse => {
      this.setores = setoresResponse.map(p => {
        return {label: p.nomeSetor, value: p.setorId}
      });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }


  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarAcompEstrategico(form);

    } else {

      this.adicionar(form);
    }
  }


  adicionar(form: FormControl) {

    const ticker = this.acompanhamentoEstrategico.ticker;

    this.acompanhamentoEstrategico.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);
    this.acompanhamentoEstrategico.acompanharVariacao = false;

    this.acompanhamentoEstrategicoService.adicionar(this.acompanhamentoEstrategico)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Acompamento do ' + ticker + ' cadastrado com sucesso!', closable: false});
      form.reset();
      this.acompanhamentoEstrategico = new AcompanhamentoEstrategico();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }


  carregarPorId(codigo: number) {

    this.acompanhamentoEstrategicoService.buscarPorCodigo(codigo)
    .then(response => {
      this.acompanhamentoEstrategico = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarAcompEstrategico(form: FormControl) {

    this.acompanhamentoEstrategico.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);
    this.acompanhamentoEstrategico.acompanharVariacao = false;

    this.acompanhamentoEstrategicoService.editarAcompEstrategico(this.acompanhamentoEstrategico)
    .then(response => {
      this.acompanhamentoEstrategico = response;
      this.messageService.add({ severity: 'success', detail: 'Acompanhamento estratégico atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
