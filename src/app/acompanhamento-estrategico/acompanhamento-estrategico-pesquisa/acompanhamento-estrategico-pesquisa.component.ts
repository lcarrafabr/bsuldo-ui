import { Title } from '@angular/platform-browser';
import { AcompanhamentoEstrategicoService, AcompanhamentoEstrategicoFiltro } from './../acompanhamento-estrategico.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-acompanhamento-estrategico-pesquisa',
  templateUrl: './acompanhamento-estrategico-pesquisa.component.html',
  styleUrls: ['./acompanhamento-estrategico-pesquisa.component.css']
})
export class AcompanhamentoEstrategicoPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  codigoUsuarioLogado: string;
  acompanhamnetoEstrategicoResponse = [];

  tickerFiltro: string;
  setorIdFiltro: string;
  segmentoIdFiltro: string;
  statusAcompanhamentoFiltro: string;

  iconeFiltro: string = "pi pi-filter";
  iconePanel: string = "pi pi-filter"; // Ícone inicial

  segmentos = [];
  setores = [];
  statusAcompanhamento = [
    {label: 'EM ANÁLISE', value: 'EM_ANALISE'},
    {label: 'APROVADO COMPRA', value: 'APROVADO_COMPRA'},
    {label: 'COMPRADO', value: 'COMPRADO'},
    {label: 'POSSÍVEL COMPRA', value: 'POSSIVEL_COMPRA'},
    {label: 'CONGELADO PARA ANÁLISE', value: 'CONGELADO_PARA_ANALISE'},
    {label: 'REJEITADO', value: 'REJEITADO'}
  ]



  constructor(
    private acompanhamentoEstrategicoService: AcompanhamentoEstrategicoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private title: Title,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Acompanhamento estratégico');

    this.codigoUsuarioLogado = localStorage.getItem('IDS');

    this.pesquisar();
    this.carregarSegmentos();
    this.carregarSetores();
  }


  pesquisar() {

    this.acompanhamentoEstrategicoService.listarTodos(this.codigoUsuarioLogado)
    .then(response => {
      this.acompanhamnetoEstrategicoResponse = response;
      this.iconeFiltro = "pi pi-filter";
      this.iconePanel = "pi pi-filter";
      this.cdr.detectChanges(); // Detecta as alterações
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  pesquisarByFiltro() {

    const filtro: AcompanhamentoEstrategicoFiltro = {
      ticker: this.tickerFiltro,
      setorId: this.setorIdFiltro !== undefined ? this.setorIdFiltro.toString() : undefined,
      segmentoId: this.segmentoIdFiltro !== undefined ? this.segmentoIdFiltro.toString() : undefined,
      statusAcompanhamento: this.statusAcompanhamentoFiltro
  };

    this.acompanhamentoEstrategicoService.listarTodosComFiltro(this.codigoUsuarioLogado, filtro)
    .then(response => {
      this.acompanhamnetoEstrategicoResponse = response;
      this.iconeFiltro = "pi pi-filter-fill";
      this.iconePanel = "pi pi-filter-fill";
      this.cdr.detectChanges(); // Detecta as alterações
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  resetarCamposFiltro() {
    this.tickerFiltro = '';
    this.setorIdFiltro = undefined;
    this.segmentoIdFiltro = undefined;
    this.statusAcompanhamentoFiltro = undefined;

    this.pesquisar();
}

  confirmaExclusao(acompEstrategico: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o controle: ' + acompEstrategico.ticker + '?',
        accept: () => {
          this.removerControleDividendo(acompEstrategico);
        }
      });
  }

  removerControleDividendo(acompEstrategico: any) {

    this.acompanhamentoEstrategicoService.removerAcompestrategico(acompEstrategico.acompEstrategicoId)
    .then(() => {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Acompanhamento estratégico removido com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  //--------------------------------------------- FILTRO ------------------------------------------------------------------------

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

}
