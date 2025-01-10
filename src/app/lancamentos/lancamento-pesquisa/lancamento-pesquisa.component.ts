import { JwtHelperService } from '@auth0/angular-jwt';
import { MetodoCobrancaService } from './../../metodo-cobrancas/metodo-cobranca.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-pesquisa',
  templateUrl: './lancamento-pesquisa.component.html',
  styleUrls: ['./lancamento-pesquisa.component.css']
})
export class LancamentoPesquisaComponent implements OnInit{

  lancamentos = [];
  descricao: string;
  dataVencimentoInicio: Date | undefined;
  dataVencimentoFim: Date | undefined;
  situacao: string | undefined;
  metodoDeCobrancaId: string | undefined;
  chavePesquisa: string;
  chavePesquisaPesquisada = '';
  jwtPayloadId: any;
  tipoLancCombobox: string | undefined;


  mensagemDeFiltro = '';


  codigoUsuarioLogado: string;

  @ViewChild('tabela', {static: true}) grid: Table;

  status = [
    {label: 'PENDENTE', value: 'PENDENTE'},
    {label: 'PAGO', value: 'PAGO'},
    {label: 'VENCIDO', value: 'VENCIDO'},
    {label: 'RECEBIDO', value: 'RECEBIDO'}
  ];

  statusTipoLanc = [
    {label: 'DESPESA', value: 'DESPESA'},
    {label: 'RECEITA', value: 'RECEITA'}
  ];

  iconeFiltro: string = "pi pi-filter";
  iconePanel: string = "pi pi-filter"; // Ícone inicial

  metodoCobranca = [];
  valorAPagarNoMes: number;

  constructor(private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private metodoCobrancaService: MetodoCobrancaService,
    private jwtHelper: JwtHelperService,
    private title: Title,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit() {

    this.title.setTitle('Lançamentos');

    this.jwtPayloadId = this.jwtHelper.decodeToken(localStorage.getItem('token') ?? '');
    localStorage.setItem('ID', this.jwtPayloadId.id);

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    this.verificaSeExisteFiltroNaSessao();


    this.pesquisar();
    this.carregarMetodoCobranca();
   // this.carregaValorNoMes();
  }

  pesquisar() {

    const filtro : LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim,
      metodoDeCobrancaId:  this.metodoDeCobrancaId !== undefined ? this.metodoDeCobrancaId.toString() : undefined,
      situacao: this.situacao,
      tipoLancamentoFiltro: this.tipoLancCombobox,
      chavePesquisa: this.chavePesquisa
    };

    this.lancamentoService.pesquisar(filtro, this.codigoUsuarioLogado)
    .then(lancamentos => {
      this.lancamentos = lancamentos
      this.carregaValorNoMes();
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

    if((this.descricao == null || this.descricao == '') &&
      (this.dataVencimentoInicio == null || this.dataVencimentoInicio == undefined) &&
      (this.dataVencimentoFim == null || this.dataVencimentoFim == undefined) &&
      (this.metodoDeCobrancaId == null || this.metodoDeCobrancaId == undefined) &&
      (this.situacao == null || this.situacao == undefined) &&
      (this.chavePesquisa == null || this.chavePesquisa == '') &&
      (this.tipoLancCombobox == null || this.tipoLancCombobox == '')) {
      this.messageService.add({ severity: 'warn', detail: 'Preencha ao menos 01 (um) campo', closable: false});
    } else {

      this.iconeFiltro = "pi pi-filter-fill";
      this.iconePanel = "pi pi-filter-fill";
      this.cdr.detectChanges(); // Detecta as alterações
      this.mensagemDeFiltro = '(Há campos com filtro)';

    this.pesquisar();
    this.salvarFiltrosSessao()
    }
  }

  confirmarExclusao(lancamento: any) {

    this.confirmation.confirm({
      message: 'Deseja excluir o lançamento ' + lancamento.descricao + ' no valor de: ' + lancamento.valor + '?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir(lancamento: any) {

    this.lancamentoService.excluir(lancamento.codigoLancamento)
    .then(()=> {
      this.grid.clear();
      this.pesquisar();
      this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso!', closable: false});
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

  carregarMetodoCobranca() {

    return this.metodoCobrancaService.listarTodos(this.codigoUsuarioLogado)
    .then(metodoCobrancas => {
      this.metodoCobranca = metodoCobrancas.map(m => {
        return { label: m.nomeMetodoCob, value: m.metodoCobrancaId }
      });
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

  carregaValorNoMes() {

    return this.lancamentoService.buscaValorNoMes(this.codigoUsuarioLogado)
    .then(valor => {
      this.valorAPagarNoMes = valor;
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

  buscarPorCodigo(codigo: number) {

    return this.lancamentoService.buscarPorCodigo(codigo)
    .then(lanc => {
      this.chavePesquisa = lanc.chavePesquisa;
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

  resetarCamposFiltro() {

    this.descricao = '';
    this.dataVencimentoInicio = undefined
    this.dataVencimentoFim = undefined;
    this.metodoDeCobrancaId = undefined;
    this.situacao = undefined;
    this.chavePesquisa = '';
    this.tipoLancCombobox = undefined;

    this.iconeFiltro = "pi pi-filter";
    this.iconePanel = "pi pi-filter";
    this.cdr.detectChanges(); // Detecta as alterações
    this.mensagemDeFiltro = '';

    sessionStorage.removeItem('descricao');
    sessionStorage.removeItem('dataVencimentoInicio');
    sessionStorage.removeItem('dataVencimentoFim');
    sessionStorage.removeItem('metodoDeCobrancaId');
    sessionStorage.removeItem('situacao');
    sessionStorage.removeItem('chavePesquisa');
    sessionStorage.removeItem('tipoLancamento');

    this.pesquisar();
  }

  salvarFiltrosSessao() {

    if(this.descricao) {
      sessionStorage.setItem('descricao', this.descricao);
    } else {
      sessionStorage.removeItem('descricao');
    }

    if(this.dataVencimentoInicio){
      sessionStorage.setItem('dataVencimentoInicio', this.dataVencimentoInicio.toISOString());
    } else {
      sessionStorage.removeItem('dataVencimentoInicio');
    }

    if(this.dataVencimentoFim) {
      sessionStorage.setItem('dataVencimentoFim', this.dataVencimentoFim.toISOString());
    } else {
      sessionStorage.removeItem('dataVencimentoFim');
    }

    if(this.metodoDeCobrancaId) {
      sessionStorage.setItem('metodoDeCobrancaId', this.metodoDeCobrancaId);
    } else {
      sessionStorage.removeItem('metodoDeCobrancaId');
    }

    if(this.situacao) {
      sessionStorage.setItem('situacao', this.situacao);
    } else {
      sessionStorage.removeItem('situacao');
    }

    if(this.tipoLancCombobox) {
      sessionStorage.setItem('tipoLancamento', this.tipoLancCombobox);
    } else {
      sessionStorage.removeItem('situacao');
    }

    if(this.chavePesquisa) {
      sessionStorage.setItem('chavePesquisa', this.chavePesquisa);
    } else {
      sessionStorage.removeItem('chavePesquisa');
    }



  }

  carregarFiltros() {
    this.descricao = sessionStorage.getItem('descricao') || '';
    let dataInicio = sessionStorage.getItem('dataVencimentoInicio');
    if(dataInicio !== undefined) {
      this.dataVencimentoInicio = sessionStorage.getItem('dataVencimentoInicio') ? new Date(sessionStorage.getItem('dataVencimentoInicio') ?? '') : undefined;
    }

    if(sessionStorage.getItem('dataVencimentoFim') !== undefined) {
      this.dataVencimentoFim = sessionStorage.getItem('dataVencimentoFim') ? new Date(sessionStorage.getItem('dataVencimentoFim') ?? '') : undefined;
    }

    this.metodoDeCobrancaId = sessionStorage.getItem('metodoDeCobrancaId') || '';
    this.situacao = sessionStorage.getItem('situacao') || '';
    this.tipoLancCombobox = sessionStorage.getItem('tipoLancamento') || '';
    this.chavePesquisa = sessionStorage.getItem('chavePesquisa') || '';
  }

  verificaSeExisteFiltroNaSessao() {

    this.carregarFiltros();

    if((this.descricao) ||
      (this.dataVencimentoInicio) ||
      (this.dataVencimentoFim) ||
      (this.metodoDeCobrancaId) ||
      (this.situacao) ||
      (this.tipoLancCombobox) ||
      (this.chavePesquisa)) {
      //this.messageService.add({ severity: 'success', detail: 'Existe Sessão', closable: false});
      this.iconeFiltro = "pi pi-filter-fill";
      this.iconePanel = "pi pi-filter-fill";
      this.mensagemDeFiltro = '(Há campos com filtro)';
    } else {
      this.iconeFiltro = "pi pi-filter";
      this.iconePanel = "pi pi-filter";
      this.mensagemDeFiltro = '';
    }

  }

}
