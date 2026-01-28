export interface EmpresaAcessoEntity {
  id: number;
  name: string;
}

export interface AtividadePrincipal {
  codigo: string;
  descricao: string;
}

export interface AtividadeSecundaria {
  codigo: string;
  descricao: string;
}

export interface NaturezaJuridica {
  codigo: string;
  descricao: string;
}

export interface Endereco {
  logradouro: string;
  numero: string;
  complemento?: string;
  cep: string;
  bairro: string;
  municipio: string;
  uf: string;
  enderecoEletronico?: string;
}

export interface EmpresaEntity {
  id: number;
  cnpj: string;
  dataAbertura: string;
  nomeEmpresarial: string;
  nomeFantasia?: string;
  porte?: string;
  atividadePrincipal: AtividadePrincipal;
  atividadesSecundarias?: AtividadeSecundaria[];
  naturezaJuridica: NaturezaJuridica;
  endereco?: Endereco;
  telefone?: string;
  situacaoCadastral: boolean;
  dataSituacaoCadastral: string;
  createdAt?: Date;
  updatedAt?: Date;
}
