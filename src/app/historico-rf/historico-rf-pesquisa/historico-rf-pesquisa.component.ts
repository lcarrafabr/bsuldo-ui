import { ActivatedRoute, Router } from '@angular/router';
import { HistoricoRfService } from './../historico-rf.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-historico-rf-pesquisa',
  templateUrl: './historico-rf-pesquisa.component.html',
  styleUrls: ['./historico-rf-pesquisa.component.css']
})
export class HistoricoRfPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  historicoRF = [];

  constructor(
    private historicoRFService: HistoricoRfService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private jwtHelper: JwtHelperService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.pesquisar();
  }

  pesquisar() {

    this.historicoRFService.listarTodos()
    .then(response => {
      console.log(response);
      this.historicoRF = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  confirmaExclusao(histRF: any) {
    const dataFormatada = this.formatarData(histRF.dataRentabilidade);
    this.confirmation.confirm({
      message: 'Deseja excluir o histórico do dia: ' + dataFormatada + '?\n Essa opção caso exista outros registros não será reajustado com a data anterior',
        accept: () => {
          this.removerOrdemRendaFixa(histRF);
        }
      });
  }

  formatarData(data: string): string {
    // Dividir a string de data em ano, mês e dia
    const partesData = data.split('-');
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];

    // Formatar a data no formato desejado
    const dataFormatada = `${dia}/${mes}/${ano}`;

    return dataFormatada;
  }

  removerOrdemRendaFixa(histRF: any) {

    this.historicoRFService.removerHistoricoRF(histRF.histRentabilidadeRFId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Histórico removido com sucesso!', closable: false });
      this.ngOnInit();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
