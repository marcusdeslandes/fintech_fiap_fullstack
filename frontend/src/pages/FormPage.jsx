import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFetch } from '../hooks/useFetch'
import { valoresIniciais } from '../config/entidades'
import { validar } from '../utils/validacao'
import PageHeader from '../components/PageHeader'
import Alerta from '../components/Alerta'
import Carregando from '../components/Carregando'
import FormField from '../components/FormField'

// Página de INSERÇÃO (/recurso/nova) e ATUALIZAÇÃO (/recurso/:id/editar), reutilizada pelas três entidades.
export default function FormPage({ entidade }) {
  const { id } = useParams()
  const editando = Boolean(id)
  const { usuario } = useAuth()
  const navigate = useNavigate()

  const [valores, setValores] = useState(() => valoresIniciais(entidade.campos))
  const [erros, setErros] = useState({})
  const [erroApi, setErroApi] = useState(null)
  const [salvando, setSalvando] = useState(false)

  // Na edição, carrega o registro existente. No cadastro, a "busca" resolve imediatamente com null.
  const { dados, carregando, erro } = useFetch(() => (editando ? entidade.api.buscar(id) : Promise.resolve(null)), [entidade.rota, id])

  // Só permite editar registros do próprio usuário
  const semPermissao = editando && dados && Number(dados.idUsuario) !== Number(usuario.id)

  useEffect(() => {
    if (dados && !semPermissao) {
      setValores(Object.fromEntries(entidade.campos.map((c) => [c.name, dados[c.name] ?? c.padrao ?? ''])))
    }
  }, [dados]) // eslint-disable-line react-hooks/exhaustive-deps

  function alterar(nome, valor) {
    setValores((atual) => ({ ...atual, [nome]: valor }))
  }

  async function enviar(e) {
    e.preventDefault()
    setErroApi(null)

    const errosEncontrados = validar(entidade.campos, valores)
    setErros(errosEncontrados)
    if (Object.keys(errosEncontrados).length > 0) return

    // Converte campos numéricos e monta o JSON exatamente como o model Java espera
    const payload = { ...(dados ?? {}), idUsuario: usuario.id }
    for (const campo of entidade.campos) {
      payload[campo.name] = campo.tipo === 'number' ? Number(valores[campo.name]) : valores[campo.name]
    }

    setSalvando(true)
    try {
      if (editando) {
        // Importante: o PUT precisa levar o "id" no corpo, senão o backend cria um registro novo
        await entidade.api.atualizar(id, { ...payload, id: Number(id) })
      } else {
        await entidade.api.criar(payload)
      }
      navigate(`/${entidade.rota}`, { state: { sucesso: editando ? entidade.mensagens.atualizado : entidade.mensagens.criado } })
    } catch (e) {
      setErroApi(e.message)
      setSalvando(false)
    }
  }

  const titulo = editando ? `Editar ${entidade.titulo.toLowerCase().replace(/s$/, '')}` : entidade.novoLabel

  return (
    <>
      <PageHeader titulo={titulo} subtitulo={entidade.subtitulo} />

      {editando && carregando && <Carregando />}
      <Alerta>{erro}</Alerta>
      <Alerta>{semPermissao ? 'Você não tem permissão para editar este registro.' : null}</Alerta>

      {!(editando && (carregando || erro || semPermissao)) && (
        <div className="card max-w-2xl p-6 md:p-8">
          <Alerta onFechar={() => setErroApi(null)}>{erroApi}</Alerta>

          <form onSubmit={enviar} className="space-y-5" noValidate>
            {entidade.campos.map((campo) => (
              <FormField key={campo.name} campo={campo} valor={valores[campo.name]} erro={erros[campo.name]} onChange={alterar} />
            ))}

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Link to={`/${entidade.rota}`} className="btn-ghost">
                Cancelar
              </Link>
              <button type="submit" className="btn-primary" disabled={salvando}>
                {salvando ? 'Salvando...' : editando ? 'Salvar alterações' : 'Cadastrar'}
              </button>
            </div>
          </form>
        </div>
      )}

      {(erro || semPermissao) && (
        <Link to={`/${entidade.rota}`} className="btn-ghost">
          Voltar para a lista
        </Link>
      )}
    </>
  )
}
