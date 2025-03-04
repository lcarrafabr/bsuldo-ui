export class Pessoa {
  pessoaID: number;
  nomePessoa: string;
  dataCadastro: Date;
  email: string;
}

export class Lancamento {

  codigoLancamento: string;
  valor: number;
  dataVencimento: Date;
  dataPagamento: Date;
  descricao: string;
  situacao: string = 'PENDENTE';
  parcelado: boolean;
  quantidadeParcelas: number;
  numeroParcela: number;
  chavePesquisa: string;
  //pessoa = new Pessoa();
  categoria = new Categoria();
  metodoDeCobranca = new MetodoDeCobranca();
  lancRecorrente: boolean;
  banco = new Bancos();
  tipoLancamento: string
}

export class Categoria {

  codigo: string;
  nomeCategoria: string;
  status: string;
  descricao: string;
}

export class MetodoDeCobranca {

  codigoMetodoCobranca: string;
  nomeMetodoCob: string;
  status: string;
  descricao: string;
}

export class Usuario {

  usuarioId: number;
  nomeUsuario: string;
  senha: string;
  status: boolean;
  pessoa = new Pessoa();
  permissoes: any[];
}

export class Permissoes {

  permissaoId: number;
  descricao: string;
}

export class Emissores {

  emissorId: number;
  nomeEmissor: string;
  status: boolean;
  dataCadastro: Date;
}
export class ProdutoRendaFixa {
  produtoRendaFixaId: number;
  nomeProduto: string;
  sigla: string;
  dataVencimento: Date;
  temImposto: boolean;
  valorImposto: number;
  grauDeRiscoEnum: string;
  liquidezEnum: string;
  impostoDeRendaEnum: string;
  valorMinimo: number;
  rentabilidade: string;
  status: boolean;
  emissores = new Emissores();
}

export class OrdemRendaFixa {
  ordemRendaFixaId: number;
  tipoOrdemRendaFixaEnum: string;
  dataTransacao: Date;
  dataVencimento: Date;
  valorTransacao: number;
  pessoa = new Pessoa();
  produtoRendaFixa = new ProdutoRendaFixa();
}

export class Setores {
  setorId: number;
  nomeSetor: string;
  status: boolean;
}

export class Segmentos {
  codigoSegmento: string;
  nomeSegmento: string;
  status: boolean;
}

export class ProdutoRendaVariavel {
  produtoId: number;
  longName: string;
  shortName: string;
  ticker: string;
  currency: string;
  cnpj: string;
  geraDividendos: boolean;
  status: boolean;
  cotasEmitidas: number;
  logoUrl: string;
  descricao: string;
  emissor = new Emissores();
  segmento = new Segmentos();
  setor = new Setores();
}

export class OrdemDeCompra {
  ordemDeCompraId: number;
  tipoAtivoEnum: string;
  tipoOrdemRendaVariavelEnum: string;
  dataTransacao: Date;
  dataExecucao: Date;
  quantidadeCotas: number;
  precoUnitarioCota: number;
  valorInvestido: number;
  desdobroAgrupado: string;
  dataDesdobroAgrupamento: Date;
  produtoRendaVariavel = new ProdutoRendaVariavel();
}

export class ControleDividendos {
  controleDividendoId: number;
  tipoAtivoEnum: string;
  tipoDivRecebimentoEnum: string;
  dataReferencia: Date;
  tipoDividendoEnum: string;
  dataCom: Date;
  dataPagamento: Date;
  valorPorCota: number;
  valorRecebido: number;
  divUtilizado: boolean;
  pessoa = new Pessoa();
  produtosRendaVariavel = new ProdutoRendaVariavel();
}
export class HistoricoRendimentoRF {
  histRentabilidadeRFId: number;
  dataRentabilidade: Date;
  valorResgateApp: number;
  pessoa = new Pessoa();
}

export class Bancos {
  codigoBanco: string;
  nomeBanco: string;
  status: boolean;
}

export class AcompanhamentoEstrategico {
  acompEstrategicoId: number;
  ticker: string;
  dataCadastro: Date;
  valorCota: number;
  valorDividendo: number;
  statusAcompanhamentoEnum: string;
  acompanharVariacao: boolean;
  descricao: string;
  pessoa = new Pessoa();
  segmento = new Segmentos();
  setor = new Setores();
}

export class AvisosAutomaticos {
  avisoAutomaticoId: number;
  titulo: string;
  mensagem: string;
  dataCadastro: Date;
  visualizado: boolean;
  pessoa = new Pessoa();
}

export class Origens {
  codigoOrigem: string;
  nomeOrigem: string;
  status: boolean;
}

export class Wallets {
  codigoWallet: string
  nomeCarteira: string;
  tipoCarteira: string;
  origem = new Origens;
}

export class WalletsUpdate {
  nomeCarteira: string;
  tipoCarteira: string;
  origem = new Origens;
}
