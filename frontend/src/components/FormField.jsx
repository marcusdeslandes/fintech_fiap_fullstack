import { aplicarMascara } from '../utils/format'

// Campo de formulário genérico (input ou select) com rótulo e mensagem de erro.
// A configuração do campo vem pela prop "campo" (veja config/entidades.js).
export default function FormField({ campo, valor, erro, onChange }) {
  const id = `campo-${campo.name}`
  const exibido = campo.mask ? aplicarMascara(campo.mask, valor) : valor

  function tratarMudanca(e) {
    // Campos com máscara guardam somente os dígitos
    onChange(campo.name, campo.mask ? e.target.value.replace(/\D/g, '') : e.target.value)
  }

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {campo.label}
      </label>

      {campo.tipo === 'select' ? (
        <select id={id} className="input" value={valor} onChange={tratarMudanca}>
          <option value="">Selecione...</option>
          {campo.opcoes.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.rotulo}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="input"
          type={campo.tipo}
          value={exibido}
          onChange={tratarMudanca}
          placeholder={campo.placeholder}
          autoComplete={campo.autoComplete}
          step={campo.tipo === 'number' ? '0.01' : undefined}
          min={campo.tipo === 'number' ? '0' : undefined}
        />
      )}

      {erro && <p className="mt-1.5 text-sm text-red-400">{erro}</p>}
    </div>
  )
}
