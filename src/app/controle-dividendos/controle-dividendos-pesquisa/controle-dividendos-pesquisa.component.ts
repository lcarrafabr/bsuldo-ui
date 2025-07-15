import { ErrorHandlerService } from './../../core/error-handler.service';
import { ControleDividendosFiltro, ControleDividendosService } from './../controle-dividendos.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-controle-dividendos-pesquisa',
  templateUrl: './controle-dividendos-pesquisa.component.html',
  styleUrls: ['./controle-dividendos-pesquisa.component.css']
})
export class ControleDividendosPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;

  controleDividendos = [];
  totalDivRecebido: any = 0;
  totalDivDisponivel: number = 0;

  iconeFiltro: string = "pi pi-filter";
  iconePanel: string = "pi pi-filter"; // Ícone inicial
  mensagemDeFiltro = '';

  tickerFiltro: string;
  tipoRecebimentoFiltro: string | undefined;
  dataReferencia: Date | undefined;
  dataPagamento: Date | undefined;

  tipoRecebimento = [
    {label: 'A RECEBER', value: 'A_RECEBER'},
    {label: 'RECEBIDO', value: 'RECEBIDO'}
  ]

  constructor(
    private controleDividendosService: ControleDividendosService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Controle Dividendos');

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? "";

    this.verificaSeExisteFiltroNaSessao();

    this.pesquisar();
  }

  pesquisar() {

    const filtro : ControleDividendosFiltro = {
      ticker: this.tickerFiltro,
      tipoRecebimento: this.tipoRecebimentoFiltro,
      dataReferencia: this.dataReferencia,
      dataPagamento: this.dataPagamento
    }

    this.controleDividendosService.listarTodos(this.codigoUsuarioLogado, filtro)
    .then(response => {
      console.log(response);
      this.controleDividendos = response;
      this.totalDividendoRecebido();
      this.totalDividendoDisponivel();
    })
    .catch(erro => {
      if (erro.error.objects) {
        erro.error.objects.forEach((obj: any) => {
          this.messageService.add({ severity: 'error', detail: obj.userMessage });
        });
      } else {
        this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
      }
    });
  }

  pesquisarByFiltro() {

    if((this.tickerFiltro == null || this.tickerFiltro == '')
    && (this.tipoRecebimento == null || this.tipoRecebimento == undefined)
    && (this.dataReferencia == null || this.dataReferencia == undefined)
    && (this.dataPagamento == null || this.dataPagamento == undefined)) {

      this.messageService.add({ severity: 'warn', detail: 'Preencha ao menos 01 (um) campo', closable: false});
    } else {

      this.pesquisar();
      this.salvarFiltrosSessao();
    }
  }

  confirmaExclusao(controleDiv: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o controle: ' + controleDiv.produtosRendaVariavel.ticker + '?',
        accept: () => {
          this.removerControleDividendo(controleDiv);
        }
      });
  }

  removerControleDividendo(controleDiv: any) {

    this.controleDividendosService.removerControleDividendo(controleDiv.codigoControleDividendo)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Controle de dividendos removido com sucesso!', closable: false });
    })
    .catch(erro => {
      if (erro.error.objects) {
        erro.error.objects.forEach((obj: any) => {
          this.messageService.add({ severity: 'error', detail: obj.userMessage });
        });
      } else {
        this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
      }
    });
  }

  totalDividendoRecebido() {

    this.controleDividendosService.totalDividendoRecebido(this.codigoUsuarioLogado)
    .then(response => {
      this.totalDivRecebido = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  totalDividendoDisponivel() {

    this.controleDividendosService.totalDividendoDisponivel(this.codigoUsuarioLogado)
    .then(response => {
      this.totalDivDisponivel = response;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  alterarStatusAtivo(controlDivs: any): void {

    const novoStatus = !controlDivs.divUtilizado;

    this.controleDividendosService.mudarStatusAtivo(controlDivs.codigoControleDividendo, novoStatus)
    .then(() => {
      const acao = novoStatus ? 'ATIVO' : 'INATIVO';

      controlDivs.divUtilizado = novoStatus;
      this.totalDividendoDisponivel();
    })
    .catch(erro => {
      if (erro.error.objects) {
        erro.error.objects.forEach((obj: any) => {
          this.messageService.add({ severity: 'error', detail: obj.userMessage });
        });
      } else {
        this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
      }
    });
  }

  //** ********************  FILTROS DE SESSÃO ******************************************************************************************** */

  salvarFiltrosSessao() {

    if(this.tickerFiltro) {
      sessionStorage.setItem('cd_ticker-filtro', this.tickerFiltro);
    } else {
      sessionStorage.removeItem('cd_ticker-filtro');
    }

    if(this.tipoRecebimentoFiltro) {
      sessionStorage.setItem('cd_tipo-recebimento-filtro', this.tipoRecebimentoFiltro);
    } else {
      sessionStorage.removeItem('cd_tipo-recebimento-filtro');
    }

    if(this.dataReferencia) {
      sessionStorage.setItem('cd_data-referencia', this.dataReferencia.toISOString());
    } else {
      sessionStorage.removeItem('cd_data-referencia');
    }

    if(this.dataPagamento) {
      sessionStorage.setItem('cd_data-pagamento', this.dataPagamento.toISOString());
    } else {
      sessionStorage.removeItem('cd_data-pagamento');
    }
  }

  carregarFiltros() {

    this.tickerFiltro = sessionStorage.getItem('cd_ticker-filtro') || '';
    this.tipoRecebimentoFiltro = sessionStorage.getItem('cd_tipo-recebimento-filtro') || '';

    let dataReferenciaFiltro = sessionStorage.getItem('cd_data-referencia');
    if(dataReferenciaFiltro !== undefined) {
      this.dataReferencia = sessionStorage.getItem('cd_data-referencia') ? new Date(sessionStorage.getItem('cd_data-referencia') ?? '') : undefined;
    }

    let dataPagamentoFiltro = sessionStorage.getItem('cd_data-pagamento');
    if(dataPagamentoFiltro !== undefined) {
      this.dataPagamento = sessionStorage.getItem('cd_data-pagamento') ? new Date(sessionStorage.getItem('cd_data-pagamento') ?? "") : undefined;
    }
  }

  verificaSeExisteFiltroNaSessao() {

    this.carregarFiltros();

    if((this.tickerFiltro)
    || (this.tipoRecebimentoFiltro)
    || (this.dataReferencia)
    || (this.dataPagamento)) {

      this.iconeFiltro = "pi pi-filter-fill";
      this.iconePanel = "pi pi-filter-fill";
      this.mensagemDeFiltro = '(Há campos com filtro)';

    } else {
      this.iconeFiltro = "pi pi-filter";
      this.iconePanel = "pi pi-filter";
      this.mensagemDeFiltro = '';
    }
  }

  resetarCamposFiltro() {
    this.tickerFiltro = '';
    this.tipoRecebimentoFiltro = undefined;
    this.dataReferencia = undefined;
    this.dataPagamento = undefined;

    this.iconeFiltro = "pi pi-filter";
    this.iconePanel = "pi pi-filter";
    this.cdr.detectChanges(); // Detecta as alterações
    this.mensagemDeFiltro = '';

    sessionStorage.removeItem('cd_ticker-filtro');
    sessionStorage.removeItem('cd_tipo-recebimento-filtro');
    sessionStorage.removeItem('cd_data-referencia');
    sessionStorage.removeItem('cd_data-pagamento');

    this.pesquisar();
  }

}
