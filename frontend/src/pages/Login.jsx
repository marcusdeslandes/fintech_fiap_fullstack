import { useState } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import Alerta from '../components/Alerta'

export default function Login() {
  const { usuario, login } = useAuth()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)
  const [enviando, setEnviando] = useState(false)

  // Já autenticado: vai direto para a página que o usuário tentou acessar (ou para o início)
  if (usuario) return <Navigate to={location.state?.de ?? '/'} replace />

  async function enviar(e) {
    e.preventDefault()
    setErro(null)

    if (!email.trim() || !senha) {
      setErro('Informe o e-mail e a senha.')
      return
    }

    setEnviando(true)
    try {
      await login(email, senha) // ao autenticar, o contexto atualiza e o <Navigate> acima redireciona
    } catch (e) {
      setErro(e.message)
      setEnviando(false)
    }
  }

  return (
    <AuthLayout titulo="Entrar" subtitulo="Acesse sua conta para controlar suas finanças.">
      <Alerta tipo="sucesso">{location.state?.sucesso}</Alerta>
      <Alerta>{erro}</Alerta>

      <form onSubmit={enviar} className="space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            E-mail
          </label>
          <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" placeholder="voce@email.com" />
        </div>

        <div>
          <label htmlFor="senha" className="mb-2 block text-sm text-muted">
            Senha
          </label>
          <input id="senha" type="password" className="input" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" placeholder="Sua senha" />
        </div>

        <button type="submit" className="btn-primary w-full" disabled={enviando}>
          {enviando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Ainda não tem conta?{' '}
        <Link to="/cadastro" className="font-medium text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </AuthLayout>
  )
}
