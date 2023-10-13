import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoRendaFixaServiceService } from './../produto-renda-fixa-service.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ProdutoRendaFixa } from 'src/app/core/model';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-produto-renda-fixa-cadastro',
  templateUrl: './produto-renda-fixa-cadastro.component.html',
  styleUrls: ['./produto-renda-fixa-cadastro.component.css']
})
export class ProdutoRendaFixaCadastroComponent implements OnInit {

  temImposto: boolean = false;
  emissores = [];
  produtoRendaFixa = new ProdutoRendaFixa;
  verificaStatus: boolean = true;

  grauDeRisco = [
    {label: 'MUITO BAIXO', value: 'MUITO_BAIXO'},
    {label: 'BAIXO', value: 'BAIXO'},
    {label: 'MÉDIO', value: 'MEDIO'},
    {label: 'ALTO', value: 'ALTO'},
    {label: 'MUITO ALTO', value: 'MUITO_ALTO'}
  ]

  liquidez = [
    {label: 'IMEDIATO', value: 'IMEDIATO'},
    {label: 'NO VENCIMENTO', value: 'NO_VENCIMENTO'}
  ]

  tipoImposto = [
    {label: 'ISENTO', value: 'ISENTO'},
    {label: 'REGRESSIVO', value: 'REGRESSIVO'}
  ]

  constructor(
    private produtoRendaFixaService: ProdutoRendaFixaServiceService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,

    private primengConfig: PrimeNGConfig
  ) { }

  isDarkTheme = true;
  ngOnInit(): void {

    const codigoprodutoRF = this.route.snapshot.params['codigo'];

    if(codigoprodutoRF) {
      this.carregarProdutoRFPorId(codigoprodutoRF);
    }

    this.carregarEmissores();

  }

  get editandoStatus() {

    if(this.produtoRendaFixa.produtoRendaFixaId == null) {
      return true;
    } else {
      return Boolean (this.produtoRendaFixa.status);
    }
  }

  get editando2() {

    return Boolean (this.produtoRendaFixa.produtoRendaFixaId);
  }




  carregarEmissores() {

    this.produtoRendaFixaService.listarEmissoresAtivos()
    .then(emissoresResponse => {
      this.emissores = emissoresResponse.map(p => {
        return {label: p.nomeEmissor, value: p.emissorId}
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {

    return Boolean (this.produtoRendaFixa.produtoRendaFixaId)
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarProdutoRF(form);

    } else {
      this.adicionarProdutoRF(form);

    }
  }

  adicionarProdutoRF(form: FormControl) {

    this.produtoRendaFixa.status = true;
    this.produtoRendaFixa.temImposto = this.temImposto;

    if(this.temImposto == false) {
      this.produtoRendaFixa.valorImposto = 0;
      this.produtoRendaFixa.impostoDeRendaEnum = "ISENTO";
    }


    this.produtoRendaFixaService.adicionar(this.produtoRendaFixa)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Produto Renda Fixa cadastrado com sucesso!', closable: false});
      form.reset();
      this.produtoRendaFixa = new ProdutoRendaFixa();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarProdutoRFPorId(codigo: number) {

    this.produtoRendaFixaService.buscarPorCodigo(codigo)
    .then(produtoRF => {
      this.produtoRendaFixa = produtoRF;
      this.temImposto = produtoRF.temImposto;
      this.editandoStatus;

    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProdutoRF(form: FormControl) {
    this.produtoRendaFixaService.editarProdutoRendaFixa(this.produtoRendaFixa)
    .then(response => {
      this.produtoRendaFixa = response;
      this.messageService.add({ severity: 'success', detail: 'Produto atualizado com sucesso!', closable: false });
    })
  }




}
