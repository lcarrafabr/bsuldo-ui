import { FormControl, NgForm } from '@angular/forms';
import { Categoria } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-cadastro',
  templateUrl: './categoria-cadastro.component.html',
  styleUrls: ['./categoria-cadastro.component.css']
})
export class CategoriaCadastroComponent implements OnInit {

  status = [
    {label: 'ATIVO', value: 'true'},
    {label: 'INATIVO', value: 'false'}
  ]

  statusEdicao: string;

  categorias = new Categoria;

  constructor(
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const codigoCategoria = this.route.snapshot.params['codigo'];

    if(codigoCategoria) {
      this.carregarCategoriaPorId(codigoCategoria);
    }
  }


  get editando() {

    return Boolean (this.categorias.categoriaId);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarCategoria(form);
    } else {
      this.cadastrarCategoria(form);
    }
  }


  cadastrarCategoria(form: FormControl) {

    this.categoriaService.cadastrarCategoria(this.categorias)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Categoria cadastrada com sucesso!', closable: false });
      form.reset();
      this.categorias = new Categoria();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategoriaPorId(codigo: number) {

    this.categoriaService.buscaCategoriaPorID(codigo)
    .then(categoria => {
      this.categorias = categoria;
      this.statusEdicao = categoria.status;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarCategoria(form: FormControl) {

    this.categoriaService.atualizarCategoria(this.categorias)
    .then(response => {
      this.categorias = response;
      this.messageService.add({ severity: 'success', detail: 'Categoria atualizada com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Categoria();
    }.bind(this), 1);

    this.router.navigate(['/categorias/novo']);
  }

}
