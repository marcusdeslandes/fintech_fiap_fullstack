import { createContext, useContext, useState } from 'react'
import { usuariosApi } from '../services/api'

const CHAVE_SESSAO = 'fintech:usuario'
const AuthContext = createContext(null)

function lerSessao() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_SESSAO))
  } catch {
    return null
  }
}

function gravarSessao(usuario) {
  try {
    if (usuario) localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario))
    else localStorage.removeItem(CHAVE_SESSAO)
  } catch {
    // armazenamento indisponível: a sessão vale apenas até recarregar a página
  }
}

// Guarda na sessão somente os dados necessários (a senha nunca é mantida no navegador)
function semSenha({ senha, ...resto }) {
  return resto
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(lerSessao)

  // O backend não possui endpoint de login: buscamos os usuários e conferimos e-mail e senha.
  async function login(email, senha) {
    const usuarios = await usuariosApi.listar()
    const encontrado = usuarios.find(
      (u) => u.email?.trim().toLowerCase() === email.trim().toLowerCase() && u.senha === senha,
    )
    if (!encontrado) throw new Error('E-mail ou senha inválidos.')

    const sessao = semSenha(encontrado)
    gravarSessao(sessao)
    setUsuario(sessao)
  }

  function logout() {
    gravarSessao(null)
    setUsuario(null)
  }

  // Atualiza os dados do usuário logado (ex.: depois de editar o perfil)
  function atualizarSessao(dados) {
    const sessao = semSenha(dados)
    gravarSessao(sessao)
    setUsuario(sessao)
  }

  return <AuthContext.Provider value={{ usuario, login, logout, atualizarSessao }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const contexto = useContext(AuthContext)
  if (!contexto) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return contexto
}
