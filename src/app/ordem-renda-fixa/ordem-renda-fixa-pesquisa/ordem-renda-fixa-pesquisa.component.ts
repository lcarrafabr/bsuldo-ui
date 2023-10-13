import { JwtHelperService } from '@auth0/angular-jwt';
import { OrdemRendaFixaServiceService } from './../ordem-renda-fixa-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MetodoCobrancaService } from 'src/app/metodo-cobrancas/metodo-cobranca.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ordem-renda-fixa-pesquisa',
  templateUrl: './ordem-renda-fixa-pesquisa.component.html',
  styleUrls: ['./ordem-renda-fixa-pesquisa.component.css']
})
export class OrdemRendaFixaPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  ordemRendaFixa = [];
  valorTotalAplicado: number = 0;
  valorTotalResgatado: number = 0;
  valorAplicadoDisponivel: number = 0;
  codigoUsuarioLogado: string;

  displayModal: boolean;
  msgCadastro: string = '';

  constructor(
    private ordemRendaFixaService: OrdemRendaFixaServiceService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private metodoCobrancaService: MetodoCobrancaService,
    private jwtHelper: JwtHelperService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('ID');
    const codigoUsuario = this.route.snapshot.params['codigo']

    this.pesquisar();
    this.pesquisarTotalInvestido();
    this.pesquisarTotalResgatado();
    this.pesquisarTotalDisponivel();
  }

  pesquisar() {

    this.ordemRendaFixaService.listarTodos()
    .then(response => {
      this.ordemRendaFixa = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarTotalInvestido() {

    this.ordemRendaFixaService.listarTotalInvestido()
    .then(response => {
      this.valorTotalAplicado = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarTotalResgatado() {

    this.ordemRendaFixaService.listarTotalResgatado()
    .then(response => {
      this.valorTotalResgatado = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pesquisarTotalDisponivel() {

    this.ordemRendaFixaService.listarTotalDisponivel()
    .then(response => {
      this.valorAplicadoDisponivel = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  confirmaExclusao(ordemRF: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir a ordem: ' + ordemRF.ordemRendaFixaId + '?',
        accept: () => {
          this.removerOrdemRendaFixa(ordemRF);
        }
      });
  }

  removerOrdemRendaFixa(ordemRF: any) {

    this.ordemRendaFixaService.removerOrdemRendaFixa(ordemRF.ordemRendaFixaId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Ordem renda fixa estornada com sucesso!', closable: false });
      this.ngOnInit();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  showModalDialog() {
    this.msgCadastro = 'Cadastro';
    this.displayModal = true;
}

showModalDialog2(id: number) {

  this.msgCadastro = 'Edição';
  this.displayModal = true;
}

}
