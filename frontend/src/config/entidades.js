// Configuração de cada entidade do backend.
// As páginas genéricas de listagem (ListaPage) e de formulário (FormPage) são montadas a partir daqui,
// e os nomes dos campos (name) são exatamente os atributos JSON dos models Java.
import { despesasApi, investimentosApi, receitasApi } from '../services/api'

export const SITUACAO_PAGAMENTO = [
  { valor: 'N', rotulo: 'Pendente' },
  { valor: 'S', rotulo: 'Pago' },
]

export const GENEROS = [
  { valor: 'M', rotulo: 'Masculino' },
  { valor: 'F', rotulo: 'Feminino' },
  { valor: 'O', rotulo: 'Outro' },
]

// Monta o estado inicial de um formulário a partir da lista de campos
export const valoresIniciais = (campos) => Object.fromEntries(campos.map((c) => [c.name, c.padrao ?? '']))

// Campos do model Usuario (usados no cadastro e na página de perfil)
export const CAMPOS_USUARIO = [
  { name: 'nome', label: 'Nome completo', tipo: 'text', obrigatorio: true, minimo: 3, autoComplete: 'name' },
  { name: 'cpf', label: 'CPF', tipo: 'text', mask: 'cpf', obrigatorio: true, placeholder: '000.000.000-00' },
  { name: 'dataNascimento', label: 'Data de nascimento', tipo: 'date', obrigatorio: true, naoFuturo: true },
  { name: 'genero', label: 'Gênero', tipo: 'select', opcoes: GENEROS, obrigatorio: true },
  { name: 'numeroTelefone', label: 'Telefone', tipo: 'text', mask: 'telefone', placeholder: '(11) 91234-5678' },
  { name: 'email', label: 'E-mail', tipo: 'email', obrigatorio: true, autoComplete: 'email' },
  { name: 'senha', label: 'Senha', tipo: 'password', obrigatorio: true, minimo: 6, autoComplete: 'new-password' },
]

export const ENTIDADES = {
  despesas: {
    rota: 'despesas',
    api: despesasApi,
    titulo: 'Despesas',
    subtitulo: 'Controle os gastos e vencimentos da sua conta.',
    novoLabel: 'Nova despesa',
    campoDescricao: 'descricaoDespesa',
    campoValor: 'valorDespesa',
    campoData: 'dtVencimento',
    mensagens: {
      criado: 'Despesa cadastrada com sucesso!',
      atualizado: 'Despesa atualizada com sucesso!',
      excluido: 'Despesa excluída com sucesso!',
    },
    vazio: 'Você ainda não cadastrou nenhuma despesa.',
    campos: [
      { name: 'descricaoDespesa', label: 'Descrição', tipo: 'text', obrigatorio: true, placeholder: 'Ex.: Conta de luz' },
      { name: 'valorDespesa', label: 'Valor (R$)', tipo: 'number', obrigatorio: true, placeholder: '0,00' },
      { name: 'dtVencimento', label: 'Data de vencimento', tipo: 'date', obrigatorio: true },
      { name: 'situacaoPago', label: 'Situação', tipo: 'select', opcoes: SITUACAO_PAGAMENTO, obrigatorio: true, padrao: 'N' },
    ],
    colunas: [
      { campo: 'descricaoDespesa', rotulo: 'Descrição', tipo: 'texto' },
      { campo: 'valorDespesa', rotulo: 'Valor', tipo: 'moeda' },
      { campo: 'dtVencimento', rotulo: 'Vencimento', tipo: 'data' },
      { campo: 'situacaoPago', rotulo: 'Situação', tipo: 'situacao' },
    ],
  },

  receitas: {
    rota: 'receitas',
    api: receitasApi,
    titulo: 'Receitas',
    subtitulo: 'Acompanhe tudo o que entra na sua conta.',
    novoLabel: 'Nova receita',
    campoDescricao: 'descricaoReceita',
    campoValor: 'valorReceita',
    campoData: 'dtRecebimento',
    mensagens: {
      criado: 'Receita cadastrada com sucesso!',
      atualizado: 'Receita atualizada com sucesso!',
      excluido: 'Receita excluída com sucesso!',
    },
    vazio: 'Você ainda não cadastrou nenhuma receita.',
    campos: [
      { name: 'descricaoReceita', label: 'Descrição', tipo: 'text', obrigatorio: true, placeholder: 'Ex.: Salário' },
      { name: 'valorReceita', label: 'Valor (R$)', tipo: 'number', obrigatorio: true, placeholder: '0,00' },
      { name: 'dtRecebimento', label: 'Data de recebimento', tipo: 'date', obrigatorio: true },
    ],
    colunas: [
      { campo: 'descricaoReceita', rotulo: 'Descrição', tipo: 'texto' },
      { campo: 'valorReceita', rotulo: 'Valor', tipo: 'moeda' },
      { campo: 'dtRecebimento', rotulo: 'Recebimento', tipo: 'data' },
    ],
  },

  investimentos: {
    rota: 'investimentos',
    api: investimentosApi,
    titulo: 'Investimentos',
    subtitulo: 'Veja onde o seu dinheiro está rendendo.',
    novoLabel: 'Novo investimento',
    campoDescricao: 'descricaoInvestimento',
    campoValor: 'valorInvestimento',
    campoData: 'dtInvestimento',
    mensagens: {
      criado: 'Investimento cadastrado com sucesso!',
      atualizado: 'Investimento atualizado com sucesso!',
      excluido: 'Investimento excluído com sucesso!',
    },
    vazio: 'Você ainda não cadastrou nenhum investimento.',
    campos: [
      { name: 'descricaoInvestimento', label: 'Descrição', tipo: 'text', obrigatorio: true, placeholder: 'Ex.: Tesouro Selic' },
      { name: 'valorInvestimento', label: 'Valor (R$)', tipo: 'number', obrigatorio: true, placeholder: '0,00' },
      { name: 'dtInvestimento', label: 'Data da aplicação', tipo: 'date', obrigatorio: true },
    ],
    colunas: [
      { campo: 'descricaoInvestimento', rotulo: 'Descrição', tipo: 'texto' },
      { campo: 'valorInvestimento', rotulo: 'Valor', tipo: 'moeda' },
      { campo: 'dtInvestimento', rotulo: 'Aplicação', tipo: 'data' },
    ],
  },
}
