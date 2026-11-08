const ESTILOS = {
  erro: 'border-red-500/30 bg-red-500/10 text-red-200',
  sucesso: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
}

// Mensagem de feedback (erro ou sucesso). Não renderiza nada se não houver mensagem.
export default function Alerta({ tipo = 'erro', children, onFechar }) {
  if (!children) return null

  return (
    <div
      role={tipo === 'erro' ? 'alert' : 'status'}
      className={`mb-6 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${ESTILOS[tipo]}`}
    >
      <span>{children}</span>
      {onFechar && (
        <button type="button" onClick={onFechar} aria-label="Fechar" className="cursor-pointer opacity-70 hover:opacity-100">
          ✕
        </button>
      )}
    </div>
  )
}
