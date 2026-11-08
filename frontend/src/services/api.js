// Camada de acesso à API REST do backend (Spring Boot).
// Por padrão usa caminho relativo (/api/...) e o proxy do Vite repassa para http://localhost:8080.
// Para apontar para outro servidor, defina VITE_API_URL (ex.: http://localhost:8080) em um arquivo .env.local.
// Atenção: com VITE_API_URL definido o navegador faz chamada cross-origin e o backend precisaria de CORS.
const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export class ApiError extends Error {
  constructor(mensagem, status) {
    super(mensagem)
    this.name = 'ApiError'
    this.status = status
  }
}

function mensagemPorStatus(status) {
  if (status === 400) return 'Os dados enviados são inválidos.'
  if (status === 404) return 'Registro não encontrado.'
  if (status >= 500) return 'O servidor não conseguiu concluir a operação (registro inexistente, dados inválidos ou erro no banco).'
  return `Erro inesperado (código ${status}).`
}

async function request(caminho, opcoes = {}) {
  let resposta
  try {
    resposta = await fetch(`${BASE_URL}/api${caminho}`, {
      headers: { 'Content-Type': 'application/json' },
      ...opcoes,
    })
  } catch {
    throw new ApiError('Não foi possível conectar ao servidor. Verifique se o backend está em execução.', 0)
  }

  if (!resposta.ok) {
    throw new ApiError(mensagemPorStatus(resposta.status), resposta.status)
  }

  // DELETE devolve 204 (sem corpo)
  if (resposta.status === 204) return null
  return resposta.json()
}

// Cria as 5 operações do CRUD para um recurso (ex.: "despesas")
function criarCrud(recurso) {
  return {
    listar: () => request(`/${recurso}`), // GET    /api/recurso
    buscar: (id) => request(`/${recurso}/${id}`), // GET    /api/recurso/{id}
    criar: (dados) => request(`/${recurso}`, { method: 'POST', body: JSON.stringify(dados) }), // POST   -> 201
    atualizar: (id, dados) => request(`/${recurso}/${id}`, { method: 'PUT', body: JSON.stringify(dados) }), // PUT    -> 200
    excluir: (id) => request(`/${recurso}/${id}`, { method: 'DELETE' }), // DELETE -> 204
  }
}

export const usuariosApi = criarCrud('usuarios')
export const despesasApi = criarCrud('despesas')
export const receitasApi = criarCrud('receitas')
export const investimentosApi = criarCrud('investimentos')
