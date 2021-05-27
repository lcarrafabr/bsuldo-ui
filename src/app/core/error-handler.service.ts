import { NotAuthenticatedError } from './../seguranca/money-http-interceptor';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private message: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {

    let msg: string;

    if(typeof errorResponse === 'string') {

      msg = errorResponse;

    } if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if(errorResponse instanceof NotAuthenticatedError ) {

      msg = 'Sua sessão expirou, faça o login novamente!'
      this.message.add({ severity: 'info', detail: msg, closable: false});
      this.router.navigate(['/login']);
      return;

    } else if (errorResponse instanceof Response
        && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse['error'];

        msg = errors[0].mensagemUsuario;
        console.log(msg);
      } catch (e) { }

      console.error('Ocorreu um erro', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro', errorResponse);
    }

    this.message.add({ severity: 'error', detail: msg, closable: false});
  }
}
