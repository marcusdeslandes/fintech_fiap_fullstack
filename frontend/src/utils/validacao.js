import { apenasDigitos, hojeISO } from './format'

// Valida os valores de um formulário de acordo com a lista de campos (config/entidades.js).
// Retorna um objeto { nomeDoCampo: 'mensagem' }; vazio = tudo certo.
export function validar(campos, valores) {
  const erros = {}

  for (const campo of campos) {
    const valor = String(valores[campo.name] ?? '').trim()

    if (campo.obrigatorio && !valor) {
      erros[campo.name] = 'Campo obrigatório.'
      continue
    }
    if (!valor) continue

    if (campo.tipo === 'number' && !(Number(valor) > 0)) {
      erros[campo.name] = 'Informe um valor maior que zero.'
    } else if (campo.mask === 'cpf' && apenasDigitos(valor).length !== 11) {
      erros[campo.name] = 'O CPF deve ter 11 dígitos.'
    } else if (campo.mask === 'telefone' && ![10, 11].includes(apenasDigitos(valor).length)) {
      erros[campo.name] = 'Informe o DDD e o número (10 ou 11 dígitos).'
    } else if (campo.tipo === 'email' && !/^\S+@\S+\.\S+$/.test(valor)) {
      erros[campo.name] = 'E-mail inválido.'
    } else if (campo.minimo && valor.length < campo.minimo) {
      erros[campo.name] = `Use pelo menos ${campo.minimo} caracteres.`
    } else if (campo.naoFuturo && valor > hojeISO()) {
      erros[campo.name] = 'A data não pode ser futura.'
    }
  }

  return erros
}
