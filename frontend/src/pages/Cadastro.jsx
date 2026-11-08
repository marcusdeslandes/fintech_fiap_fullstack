import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { usuariosApi } from '../services/api'
import { CAMPOS_USUARIO, valoresIniciais } from '../config/entidades'
import { validar } from '../utils/validacao'
import AuthLayout from '../components/AuthLayout'
import Alerta from '../components/Alerta'
import FormField from '../components/FormField'

export default function Cadastro() {
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const [valores, setValores] = useState(() => valoresIniciais(CAMPOS_USUARIO))
  const [erros, setErros] = useState({})
  const [erroApi, setErroApi] = useState(null)
  const [enviando, setEnviando] = useState(false)

  if (usuario) return <Navigate to="/" replace />

  function alterar(nome, valor) {
    setValores((atual) => ({ ...atual, [nome]: valor }))
  }

  async function enviar(e) {
    e.preventDefault()
    setErroApi(null)

    const errosEncontrados = validar(CAMPOS_USUARIO, valores)
    setErros(errosEncontrados)
    if (Object.keys(errosEncontrados).length > 0) return

    setEnviando(true)
    try {
  // E-mail e CPF não podem se repetir entre contas
  const existentes = await usuariosApi.listar()
  const cpfDigitado = valores.cpf.replace(/\D/g, '')
  const novosErros = {}

  if (existentes.some((u) => u.email?.trim().toLowerCase() === valores.email.trim().toLowerCase())) {
    novosErros.email = 'Já existe uma conta com este e-mail.'
  }
  if (existentes.some((u) => String(u.cpf ?? '').replace(/\D/g, '') === cpfDigitado)) {
    novosErros.cpf = 'Já existe uma conta com este CPF.'
  }

  if (Object.keys(novosErros).length > 0) {
    setErros(novosErros)
    return
  }

      await usuariosApi.criar({ ...valores, nome: valores.nome.trim(), email: valores.email.trim() })
      navigate('/login', { state: { sucesso: 'Conta criada com sucesso! Faça login para continuar.' } })
    } catch (e) {
      setErroApi(e.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <AuthLayout titulo="Criar conta" subtitulo="Preencha seus dados para começar a usar a Fintech." larguraMax="max-w-2xl">
      <Alerta>{erroApi}</Alerta>

      <form onSubmit={enviar} className="grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
        {CAMPOS_USUARIO.map((campo) => (
          <div key={campo.name} className={campo.name === 'nome' || campo.name === 'email' ? 'sm:col-span-2' : ''}>
            <FormField campo={campo} valor={valores[campo.name]} erro={erros[campo.name]} onChange={alterar} />
          </div>
        ))}

        <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
          <Link to="/login" className="btn-ghost">
            Voltar ao login
          </Link>
          <button type="submit" className="btn-primary" disabled={enviando}>
            {enviando ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}
