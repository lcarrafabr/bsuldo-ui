import { Component, OnInit } from '@angular/core';
import { ProdutoRendaVariavelServiceService } from '../produto-renda-variavel-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl, NgForm } from '@angular/forms';
import { ProdutoRendaVariavel } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-produto-renda-variavel-cadastro',
  templateUrl: './produto-renda-variavel-cadastro.component.html',
  styleUrls: ['./produto-renda-variavel-cadastro.component.css']
})
export class ProdutoRendaVariavelCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;

  emissores = [];
  segmentos = [];
  setores = [];
  tickerValor: string = '';
  geraDividendos: boolean = true;
  btnSalvarRapido: boolean = false;

  produtoRendaVariavel = new ProdutoRendaVariavel;
  selectedValues: string[] = ['sim'];

  constructor(
    private produtoRendaVariavelService: ProdutoRendaVariavelServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Cadastro produto rv');
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';
    const codigoProdutoRV = this.route.snapshot.params['codigo'];

    if(codigoProdutoRV) {
      this.btnSalvarRapido = true;
      this.carregarProdutoRVPorId(codigoProdutoRV);
    }

    this.carregarEmissores();
    this.carregarSegmentos();
    this.carregarSetores();
  }

  get editando() {

    return Boolean (this.produtoRendaVariavel.codigoProdutoRV);
  }

  cadastrarRapido() {

    //alert(this.tickerValor);
    this.adicionarProdutoRVAutomatico();
  }


  carregarEmissores() {

    this.produtoRendaVariavelService.listarEmissoresAtivos(this.codigoUsuarioLogado)
    .then(emissoresResponse => {
      this.emissores = emissoresResponse.map(p => {
        return {label: p.nomeEmissor, value: p.emissorId}
      });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarSegmentos() {

    this.produtoRendaVariavelService.listarSegmentosAtivos(this.codigoUsuarioLogado)
    .then(segmentosResponse => {
      this.segmentos = segmentosResponse.map(p => {
        return {label: p.nomeSegmento, value: p.codigoSegmento}
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

  carregarSetores() {

    this.produtoRendaVariavelService.listarSetoresAtivos(this.codigoUsuarioLogado)
    .then(setoresResponse => {
      this.setores = setoresResponse.map(p => {
        return {label: p.nomeSetor, value: p.codigoSetor}
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

  //********************************************************************************** */

  adicionarProdutoRVAutomatico() {

    if(this.tickerValor != '') {

      this.produtoRendaVariavelService.adicionarAutomatico(this.tickerValor, this.codigoUsuarioLogado)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Produto Renda variável cadastrado com sucesso!', closable: false});

      this.produtoRendaVariavel = new ProdutoRendaVariavel();
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

  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarProdutoRV(form);

    } else {

      this.adicionarProdutoRVManual(form);
    }
  }

  adicionarProdutoRVManual(form: FormControl) {

    this.produtoRendaVariavel.ticker = this.tickerValor;
    const geraDividendoValue = this.produtoRendaVariavel.geraDividendos;

    const cnpj = this.produtoRendaVariavel.cnpj;

    if(cnpj != null) {
      this.produtoRendaVariavel.cnpj = this.formatarCNPJ(cnpj);
    }

    if(geraDividendoValue == null) {
      this.produtoRendaVariavel.geraDividendos = false;
    }

    this.produtoRendaVariavelService.adicionarManual(this.produtoRendaVariavel, this.codigoUsuarioLogado)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Produto Renda variável cadastrado com sucesso!', closable: false});
      form.reset();
      this.produtoRendaVariavel = new ProdutoRendaVariavel();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  formatarCNPJ(cnpj: string): string {
    // Remove os pontos e a barra do CNPJ
    let cnpjFormatado = cnpj.replace(/[^\d]+/g, '');

    return cnpjFormatado;
  }

  carregarProdutoRVPorId(codigo: string) {

    this.produtoRendaVariavelService.buscarPorCodigo(codigo, this.codigoUsuarioLogado)
    .then(produtoRV => {
      this.produtoRendaVariavel = produtoRV;
      this.tickerValor = produtoRV.ticker;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarProdutoRV(form: FormControl) {

    this.produtoRendaVariavel.ticker = this.tickerValor;
    const cnpj = this.produtoRendaVariavel.cnpj;

    if(cnpj != null) {
      this.produtoRendaVariavel.cnpj = this.formatarCNPJ(cnpj);
    }

    const geraDividendoValue = this.produtoRendaVariavel.geraDividendos;

    if(geraDividendoValue == null) {
      this.produtoRendaVariavel.geraDividendos = false;
    }

    this.produtoRendaVariavelService.editarProdutoRendaVariavel(this.produtoRendaVariavel, this.codigoUsuarioLogado)
    .then(response => {
      this.produtoRendaVariavel = response;
      this.messageService.add({ severity: 'success', detail: 'Produto atualizado com sucesso!', closable: false });
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

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.produtoRendaVariavel = new ProdutoRendaVariavel();
    }.bind(this), 1);

    this.router.navigate(['/produto-renda-variavel/novo']);
  }


}
