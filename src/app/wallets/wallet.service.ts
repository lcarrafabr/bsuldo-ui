import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Wallets } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  walletURL: string;

  constructor(private http: HttpClient) {

    this.walletURL = `${environment.apiUrl}/v1/wallets`;
  }


  listarTodos(tokenId: string): Promise<any> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.walletURL}`, { params })
      .toPromise()
      .then(response => response);
  }


  adicionar(origem: Wallets, tokenId: string): Promise<Wallets> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }


    return this.http.post<Wallets>(`${this.walletURL}`, origem, { params })
      .toPromise();
  }


  atualizarWallet(wallet: Wallets, tokenId: string): Promise<Wallets> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.put(`${this.walletURL}/${wallet.codigoWallet}`, wallet, { params })
      .toPromise()
      .then(response => {
        const walletResponse = response as Wallets;

        return walletResponse;
      });
  }

  buscarPorCodigo(codigo: string, tokenId: string): Promise<Wallets> {

    let params = new HttpParams();

    if (tokenId != null) {
      params = params.set('tokenId', tokenId);
    }

    return this.http.get(`${this.walletURL}/${codigo}`, { params })
      .toPromise()
      .then(response => {
        const walletResponse = response as Wallets;

        return walletResponse;
      });
  }


  removerWallet(codigo: string): Promise<void> {

    return this.http.delete(`${this.walletURL}/${codigo}`)
      .toPromise()
      .then(() => { });
  }

  mudarStatusAtivo(codigo: string, ativo: boolean) {

      const headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.put(`${this.walletURL}/${codigo}/ativo`, ativo, { headers })
        .toPromise()
        .then(() => null);
    }


    listarWalletsAtivos(tokenId: string): Promise<any> {

      let params = new HttpParams();

      if (tokenId != null) {
        params = params.set('tokenId', tokenId);
      }

      return this.http.get(`${this.walletURL}/lista-wallets-ativos`, { params })
        .toPromise()
        .then(response => response);
    }
}
