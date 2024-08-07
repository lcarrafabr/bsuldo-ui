import { Table } from 'primeng/table';
import { ConfiguracoesService } from './../../configuracoes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cores-config-pesquisa',
  templateUrl: './cores-config-pesquisa.component.html',
  styleUrls: ['./cores-config-pesquisa.component.css']
})
export class CoresConfigPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;
  coresConfig = [];
  configuracaoPadrao: boolean = true;

  constructor(
    private configuracoesService: ConfiguracoesService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Configuração de cores');

    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    this.pesquisar();


  }


  pesquisar() {

    this.configuracoesService.listarTodos(this.codigoUsuarioLogado)
    .then(response => {
      this.coresConfig = response;

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  verificaConfiguracaoPadrao() {

    if(this.coresConfig.length === 0) {

    }

  }

}
