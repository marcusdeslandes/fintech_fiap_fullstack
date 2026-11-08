import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFetch } from '../hooks/useFetch'
import { despesasApi, investimentosApi, receitasApi } from '../services/api'
import { formatarData, formatarMoeda, formatarPercentual, primeiroNome } from '../utils/format'
import Alerta from '../components/Alerta'
import Carregando from '../components/Carregando'
import { IconCardDespesa, IconCardInvestimento, IconCardReceita, IconCardSaldo } from '../components/Icons'

const soma = (lista, campo) => lista.reduce((total, item) => total + Number(item[campo] || 0), 0)

// Card de totalizador (Receita, Despesas, Investimentos). Recebe tudo por props.
function CardTotal({ titulo, valor, icone: Icone, to }) {
  return (
    <Link to={to} className="card relative block min-h-35 overflow-hidden p-6 transition hover:border-primary/40">
      <p className="mb-3 text-sm text-muted">{titulo}</p>
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">{formatarMoeda(valor)}</h2>
        <div className="opacity-70">
          <Icone />
        </div>
      </div>
    </Link>
  )
}

export default function Home() {
  const { usuario } = useAuth()

  // Busca as três listas ao mesmo tempo e filtra somente os registros do usuário logado
  const { dados, carregando, erro } = useFetch(async () => {
    const [receitas, despesas, investimentos] = await Promise.all([receitasApi.listar(), despesasApi.listar(), investimentosApi.listar()])
    const doUsuario = (lista) => lista.filter((item) => Number(item.idUsuario) === Number(usuario.id))
    return { receitas: doUsuario(receitas), despesas: doUsuario(despesas), investimentos: doUsuario(investimentos) }
  }, [usuario.id])

  let conteudo
  if (carregando) {
    conteudo = <Carregando />
  } else if (erro) {
    conteudo = <Alerta>{erro}</Alerta>
  } else {
    const totalReceitas = soma(dados.receitas, 'valorReceita')
    const totalDespesas = soma(dados.despesas, 'valorDespesa')
    const totalInvestimentos = soma(dados.investimentos, 'valorInvestimento')

    // Mesmo cálculo da prévia: saldo = receitas - despesas; o donut mostra quanto da receita ainda sobra
    const saldo = totalReceitas - totalDespesas
    const percentual = totalReceitas > 0 ? Math.min(100, Math.max(0, (saldo / totalReceitas) * 100)) : 0

    // Último gasto = despesa com a data de vencimento mais recente
    const ultimaDespesa = [...dados.despesas].sort(
      (a, b) => String(b.dtVencimento).localeCompare(String(a.dtVencimento)) || b.id - a.id,
    )[0]

    conteudo = (
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CardTotal titulo="Receita" valor={totalReceitas} icone={IconCardReceita} to="/receitas" />
            <CardTotal titulo="Despesas" valor={totalDespesas} icone={IconCardDespesa} to="/despesas" />
            <CardTotal titulo="Investimentos" valor={totalInvestimentos} icone={IconCardInvestimento} to="/investimentos" />

            <div className="card flex min-h-35 flex-col justify-center p-6">
              <p className="mb-4 text-sm text-muted">Sua despesa com vencimento mais próximo é:</p>
              {ultimaDespesa ? (
                <p className="text-lg font-semibold leading-relaxed md:text-xl">
                  <span className="font-bold">{formatarMoeda(ultimaDespesa.valorDespesa)}</span>, com{' '}
                  <span className="font-bold">{ultimaDespesa.descricaoDespesa}</span>
                  <br />
                  no dia <span className="font-bold">{formatarData(ultimaDespesa.dtVencimento)}</span>
                </p>
              ) : (
                <p className="text-lg text-muted">Nenhuma despesa cadastrada ainda.</p>
              )}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="card flex h-full min-h-85 flex-col p-6 md:min-h-105 md:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 text-sm text-muted">Saldo</p>
                <h2 className={`text-2xl font-bold tracking-tight md:text-4xl ${saldo < 0 ? 'text-red-400' : ''}`}>{formatarMoeda(saldo)}</h2>
              </div>
              <div className="opacity-70">
                <IconCardSaldo />
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center">
              <div className="donut flex h-52 w-52 items-center justify-center rounded-full md:h-60 md:w-60" style={{ '--pct': `${percentual}%` }}>
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-page md:h-40 md:w-40">
                  <span className="text-xl font-bold text-white md:text-3xl">{formatarPercentual(percentual)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mb-10">
        <p className="text-2xl font-light tracking-wide md:text-4xl">Bem vindo, {primeiroNome(usuario.nome)}</p>
      </div>

      <section>
        <h1 className="mb-8 text-3xl font-bold md:text-4xl">Dashboard</h1>
        {conteudo}
      </section>
    </>
  )
}
