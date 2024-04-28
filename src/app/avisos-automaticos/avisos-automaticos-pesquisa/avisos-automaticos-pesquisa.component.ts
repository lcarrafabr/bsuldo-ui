import { Title } from '@angular/platform-browser';
import { AvisoAutomaticoService } from './../aviso-automatico.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AvisosAutomaticos } from 'src/app/core/model';

@Component({
  selector: 'app-avisos-automaticos-pesquisa',
  templateUrl: './avisos-automaticos-pesquisa.component.html',
  styleUrls: ['./avisos-automaticos-pesquisa.component.css']
})
export class AvisosAutomaticosPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  avisosAutomaticos = [];
  avisosAutomaticosMensagemModel: string
  codigoUsuarioLogado: string;
  displayModal: boolean;

  constructor(
    private avisoAutoService: AvisoAutomaticoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Alertas');

    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    this.pesquisar();
  }


  pesquisar() {

    this.avisoAutoService.listarTodos(this.codigoUsuarioLogado)
    .then(response => {
      this.avisosAutomaticos = response;

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  showModalDialog(alerta: any) {
    this.carregarPorId(alerta.avisoAutomaticoId);
    this.displayModal = true;
    if(!alerta.visualizado){
      this.alterarStatusAtivo(alerta);
    }

  }

  carregarPorId(codigo: number) {

    this.avisoAutoService.buscarPorCodigo(codigo)
    .then(response => {
      console.log(response.mensagem);
      this.avisosAutomaticosMensagemModel = response.mensagem;

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  alterarStatusAtivo(alertas: any): void {

    const novoStatus = !alertas.visualizado;

    this.avisoAutoService.mudarStatusAtivo(alertas.avisoAutomaticoId, novoStatus)
    .then(() => {
      //const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      alertas.visualizado = novoStatus;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  confirmaExclusao(alertas: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o alerta ?',
        accept: () => {
          this.removeAlerta(alertas);
        }
      });
  }

  removeAlerta(alertas: any) {

    this.avisoAutoService.removeBanco(alertas.avisoAutomaticoId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Alerta removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}
