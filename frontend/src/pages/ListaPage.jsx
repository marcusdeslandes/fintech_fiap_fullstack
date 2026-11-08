import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFetch } from '../hooks/useFetch'
import { ehPago, formatarData, formatarMoeda } from '../utils/format'
import PageHeader from '../components/PageHeader'
import Alerta from '../components/Alerta'
import Carregando from '../components/Carregando'
import ConfirmDialog from '../components/ConfirmDialog'
import { IconEditar, IconLixeira, IconPlus } from '../components/Icons'

function Selo({ situacao }) {
  const pago = ehPago(situacao)
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${pago ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
      {pago ? 'Pago' : 'Pendente'}
    </span>
  )
}

// Formata o conteúdo de uma célula conforme o tipo da coluna definido em config/entidades.js
function Celula({ item, coluna }) {
  const valor = item[coluna.campo]
  if (coluna.tipo === 'moeda') return formatarMoeda(valor)
  if (coluna.tipo === 'data') return formatarData(valor)
  if (coluna.tipo === 'situacao') return <Selo situacao={valor} />
  return valor
}

// Página de CONSULTA + EXCLUSÃO, reutilizada por despesas, receitas e investimentos.
// Recebe a configuração da entidade por props.
export default function ListaPage({ entidade }) {
  const { usuario } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const [busca, setBusca] = useState('')
  const [alvo, setAlvo] = useState(null) // item que o usuário pediu para excluir
  const [excluindo, setExcluindo] = useState(false)
  const [sucesso, setSucesso] = useState(location.state?.sucesso ?? null)
  const [erroAcao, setErroAcao] = useState(null)

  const { dados, carregando, erro, recarregar } = useFetch(() => entidade.api.listar(), [entidade.rota])

  // Limpa a mensagem vinda da tela de formulário para não reaparecer ao recarregar a página
  useEffect(() => {
    if (location.state?.sucesso) navigate(location.pathname, { replace: true, state: null })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const termo = busca.trim().toLowerCase()
  const itens = (dados ?? [])
    .filter((item) => Number(item.idUsuario) === Number(usuario.id))
    .filter((item) => String(item[entidade.campoDescricao] ?? '').toLowerCase().includes(termo))
    .sort((a, b) => String(b[entidade.campoData]).localeCompare(String(a[entidade.campoData])) || b.id - a.id)

  const total = itens.reduce((soma, item) => soma + Number(item[entidade.campoValor] || 0), 0)

  async function confirmarExclusao() {
    setExcluindo(true)
    setErroAcao(null)
    try {
      await entidade.api.excluir(alvo.id)
      setAlvo(null)
      setSucesso(entidade.mensagens.excluido)
      recarregar()
    } catch (e) {
      setAlvo(null)
      setErroAcao(e.message)
    } finally {
      setExcluindo(false)
    }
  }

  const acoes = (item) => (
    <div className="flex items-center justify-end gap-2">
      <Link to={`/${entidade.rota}/${item.id}/editar`} className="btn-ghost px-3 py-2" aria-label={`Editar ${item[entidade.campoDescricao]}`}>
        <IconEditar /> Editar
      </Link>
      <button
        type="button"
        className="btn-ghost border-red-500/30 px-3 py-2 text-red-300 hover:bg-red-500/10"
        onClick={() => setAlvo(item)}
        aria-label={`Excluir ${item[entidade.campoDescricao]}`}
      >
        <IconLixeira /> Excluir
      </button>
    </div>
  )

  return (
    <>
      <PageHeader
        titulo={entidade.titulo}
        subtitulo={entidade.subtitulo}
        acao={
          <Link to={`/${entidade.rota}/nova`} className="btn-primary">
            <IconPlus /> {entidade.novoLabel}
          </Link>
        }
      />

      <Alerta tipo="sucesso" onFechar={() => setSucesso(null)}>
        {sucesso}
      </Alerta>
      <Alerta onFechar={() => setErroAcao(null)}>{erroAcao}</Alerta>
      <Alerta>{erro}</Alerta>

      {carregando && <Carregando />}

      {!carregando && !erro && (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="card p-6">
              <p className="mb-2 text-sm text-muted">Total</p>
              <p className="text-2xl font-bold md:text-3xl">{formatarMoeda(total)}</p>
            </div>
            <div className="card p-6">
              <p className="mb-2 text-sm text-muted">Registros</p>
              <p className="text-2xl font-bold md:text-3xl">{itens.length}</p>
            </div>
            <div className="card p-6">
              <label htmlFor="busca" className="mb-2 block text-sm text-muted">
                Buscar por descrição
              </label>
              <input id="busca" type="search" className="input" placeholder="Digite para filtrar..." value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
          </div>

          {itens.length === 0 ? (
            <div className="card p-10 text-center text-muted">{termo ? 'Nenhum registro encontrado para a busca.' : entidade.vazio}</div>
          ) : (
            <>
              {/* Tabela (telas médias e grandes) */}
              <div className="card hidden overflow-hidden md:block">
                <table className="w-full text-left">
                  <thead className="border-b border-white/5 text-sm text-muted">
                    <tr>
                      {entidade.colunas.map((c) => (
                        <th key={c.campo} className="px-6 py-4 font-medium">
                          {c.rotulo}
                        </th>
                      ))}
                      <th className="px-6 py-4" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {itens.map((item) => (
                      <tr key={item.id} className="hover:bg-white/2">
                        {entidade.colunas.map((c) => (
                          <td key={c.campo} className="px-6 py-4">
                            <Celula item={item} coluna={c} />
                          </td>
                        ))}
                        <td className="px-6 py-4">{acoes(item)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cartões (celular) */}
              <ul className="space-y-4 md:hidden">
                {itens.map((item) => (
                  <li key={item.id} className="card p-5">
                    <dl className="space-y-2">
                      {entidade.colunas.map((c) => (
                        <div key={c.campo} className="flex items-center justify-between gap-4">
                          <dt className="text-sm text-muted">{c.rotulo}</dt>
                          <dd className="text-right font-medium">
                            <Celula item={item} coluna={c} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-4">{acoes(item)}</div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}

      <ConfirmDialog
        aberto={Boolean(alvo)}
        titulo="Confirmar exclusão"
        mensagem={alvo ? `Deseja realmente excluir "${alvo[entidade.campoDescricao]}"? Esta ação não pode ser desfeita.` : ''}
        carregando={excluindo}
        onConfirmar={confirmarExclusao}
        onCancelar={() => setAlvo(null)}
      />
    </>
  )
}
