import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFetch } from '../hooks/useFetch'
import { usuariosApi } from '../services/api'
import { CAMPOS_USUARIO } from '../config/entidades'
import { validar } from '../utils/validacao'
import PageHeader from '../components/PageHeader'
import Alerta from '../components/Alerta'
import Carregando from '../components/Carregando'
import FormField from '../components/FormField'
import ConfirmDialog from '../components/ConfirmDialog'

export default function Perfil() {
  const { usuario, atualizarSessao, logout } = useAuth()
  const navigate = useNavigate()

  // Busca o registro completo (a sessão não guarda a senha)
  const { dados, carregando, erro } = useFetch(() => usuariosApi.buscar(usuario.id), [usuario.id])

  const [valores, setValores] = useState(null)
  const [erros, setErros] = useState({})
  const [erroApi, setErroApi] = useState(null)
  const [sucesso, setSucesso] = useState(null)
  const [salvando, setSalvando] = useState(false)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)
  const [excluindo, setExcluindo] = useState(false)

  useEffect(() => {
    if (dados) setValores(Object.fromEntries(CAMPOS_USUARIO.map((c) => [c.name, dados[c.name] ?? ''])))
  }, [dados])

  function alterar(nome, valor) {
    setValores((atual) => ({ ...atual, [nome]: valor }))
    setSucesso(null)
  }

  async function salvar(e) {
    e.preventDefault()
    setErroApi(null)
    setSucesso(null)

    const errosEncontrados = validar(CAMPOS_USUARIO, valores)
    setErros(errosEncontrados)
    if (Object.keys(errosEncontrados).length > 0) return

    setSalvando(true)
    try {
      const todos = await usuariosApi.listar()
      const emailEmUso = todos.some((u) => u.id !== usuario.id && u.email?.trim().toLowerCase() === valores.email.trim().toLowerCase())
      if (emailEmUso) {
        setErros({ email: 'Já existe uma conta com este e-mail.' })
        return
      }

      // O PUT substitui o registro inteiro: enviamos o id e os campos que a tela não edita (ex.: situacaoConta)
      const atualizado = await usuariosApi.atualizar(usuario.id, { ...dados, ...valores, id: usuario.id })
      atualizarSessao(atualizado)
      setSucesso('Perfil atualizado com sucesso!')
    } catch (e) {
      setErroApi(e.message)
    } finally {
      setSalvando(false)
    }
  }

  async function excluirConta() {
    setExcluindo(true)
    try {
      await usuariosApi.excluir(usuario.id)
      navigate('/login', { replace: true, state: { sucesso: 'Sua conta foi excluída.' } })
      logout()
    } catch (e) {
      setConfirmandoExclusao(false)
      setErroApi(`Não foi possível excluir a conta. ${e.message}`)
      setExcluindo(false)
    }
  }

  return (
    <>
      <PageHeader titulo="Perfil" subtitulo="Consulte e atualize seus dados cadastrais." />

      {carregando && <Carregando />}
      <Alerta>{erro}</Alerta>

      {valores && (
        <div className="card max-w-3xl p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">Dados da conta</h2>
          </div>

          <Alerta tipo="sucesso" onFechar={() => setSucesso(null)}>
            {sucesso}
          </Alerta>
          <Alerta onFechar={() => setErroApi(null)}>{erroApi}</Alerta>

          <form onSubmit={salvar} className="grid grid-cols-1 gap-5 sm:grid-cols-2" noValidate>
            {CAMPOS_USUARIO.map((campo) => (
              <div key={campo.name} className={campo.name === 'nome' || campo.name === 'email' ? 'sm:col-span-2' : ''}>
                <FormField campo={{ ...campo, autoComplete: 'off' }} valor={valores[campo.name]} erro={erros[campo.name]} onChange={alterar} />
              </div>
            ))}

            <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" className="btn-ghost border-red-500/30 text-red-300 hover:bg-red-500/10" onClick={() => setConfirmandoExclusao(true)}>
                Excluir minha conta
              </button>
              <button type="submit" className="btn-primary" disabled={salvando}>
                {salvando ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        aberto={confirmandoExclusao}
        titulo="Excluir conta?"
        mensagem="Esta ação não pode ser desfeita. Seus dados de cadastro serão removidos permanentemente."
        confirmarLabel="Excluir conta"
        carregando={excluindo}
        onConfirmar={excluirConta}
        onCancelar={() => setConfirmandoExclusao(false)}
      />
    </>
  )
}
