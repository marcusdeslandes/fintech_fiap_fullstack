const formatoMoeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatarMoeda = (valor) => formatoMoeda.format(Number(valor) || 0)

// Converte "2026-04-23" em "23/04/2026" sem passar por Date (evita problemas de fuso horário)
export function formatarData(iso) {
  if (!iso) return '-'
  const [ano, mes, dia] = String(iso).slice(0, 10).split('-')
  return `${dia}/${mes}/${ano}`
}

export const formatarPercentual = (valor) =>
  `${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%`

export const apenasDigitos = (texto) => String(texto ?? '').replace(/\D/g, '')

// Máscaras de exibição para os campos de formulário (o valor guardado são só os dígitos)
export function aplicarMascara(tipo, valor) {
  const d = apenasDigitos(valor)

  if (tipo === 'cpf') {
    return d
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  if (tipo === 'telefone') {
    const t = d.slice(0, 11)
    if (t.length <= 2) return t
    if (t.length <= 6) return `(${t.slice(0, 2)}) ${t.slice(2)}`
    if (t.length <= 10) return `(${t.slice(0, 2)}) ${t.slice(2, 6)}-${t.slice(6)}`
    return `(${t.slice(0, 2)}) ${t.slice(2, 7)}-${t.slice(7)}`
  }

  return valor
}

// Situação de pagamento: o formulário grava "S" (pago) ou "N" (pendente)
export const ehPago = (situacao) => ['S', 'SIM', 'PAGO', '1', 'TRUE'].includes(String(situacao ?? '').trim().toUpperCase())

export const primeiroNome = (nome) => String(nome ?? '').trim().split(' ')[0]

export const hojeISO = () => {
  const d = new Date()
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  const dia = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}
