import { Setores } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { SetoresServiceService } from '../setores-service.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-setores-cadastro',
  templateUrl: './setores-cadastro.component.html',
  styleUrls: ['./setores-cadastro.component.css']
})
export class SetoresCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;

  setores = new Setores;
  status: boolean = true;

  constructor(
    private setorService: SetoresServiceService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const codigoSetor = this.route.snapshot.params['codigo'];
    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    if(codigoSetor) {
      this.carregarSetorPorId(codigoSetor);
    }
  }

  get editando() {

    return Boolean (this.setores.setorId);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarSetor(form);

    } else {

      this.cadastrarSetor(form);
    }
  }

  cadastrarSetor(form: FormControl) {

    this.setorService.cadastrarSetor(this.setores, this.codigoUsuarioLogado)
    .then(() => {

      this.messageService.add({ severity: 'success', detail: 'Setor cadastrado com sucesso!', closable: false });
      form.reset();
      this.setores = new Setores();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarSetorPorId(codigo: number) {

    this.setorService.buscaSetoresPorID(codigo, this.codigoUsuarioLogado)
    .then(setor => {
      this.setores = setor;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarSetor(form: FormControl) {
    this.setorService.editarSetor(this.setores, this.codigoUsuarioLogado)
    .then(response => {
      this.setores = response;
      this.messageService.add({ severity: 'success', detail: 'Setor atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Setores();
    }.bind(this), 1);

    this.router.navigate(['/setores/novo']);
  }


}
