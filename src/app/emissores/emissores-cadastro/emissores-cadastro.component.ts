import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { EmissoresService } from '../emissores.service';
import { FormControl, NgForm } from '@angular/forms';
import { Emissores } from 'src/app/core/model';

@Component({
  selector: 'app-emissores-cadastro',
  templateUrl: './emissores-cadastro.component.html',
  styleUrls: ['./emissores-cadastro.component.css']
})
export class EmissoresCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;
  status: boolean = true;
  statusEdicao: string;
  dataCadastro: Date;

  emissores = new Emissores;

  constructor(
    private emissorService: EmissoresService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
   //this.dataCadastro = new Date();
    this.codigoUsuarioLogado = localStorage.getItem('idToken');
    const codigoEmissor = this.route.snapshot.params['codigo'];

    if(codigoEmissor) {
      this.carregarEmissorPorId(codigoEmissor);
    }
  }

  get editando() {

    return Boolean (this.emissores.emissorId);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarEmissor(form);

    } else {

      this.cadastrarEmissor(form);
    }
  }

  cadastrarEmissor(form: FormControl) {

    this.emissorService.cadastrarEmissores(this.emissores, this.codigoUsuarioLogado)
    .then(() => {

      this.messageService.add({ severity: 'success', detail: 'Emissor cadastrado com sucesso!', closable: false });
      form.reset();
      this.emissores = new Emissores();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarEmissorPorId(codigo: number) {

    this.emissorService.buscaEmissoresPorID(codigo, this.codigoUsuarioLogado)
    .then(emissor => {
      this.emissores = emissor;
      this.dataCadastro = emissor.dataCadastro;
      //this.statusEdicao = emissor.status;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarEmissor(form: FormControl) {
    this.emissorService.editarEmissor(this.emissores, this.codigoUsuarioLogado)
    .then(response => {
      this.emissores = response;
      this.messageService.add({ severity: 'success', detail: 'Emissor atualizado com sucesso!', closable: false });
    })
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Emissores();
    }.bind(this), 1);

    this.router.navigate(['/emissores/novo']);
  }

}
