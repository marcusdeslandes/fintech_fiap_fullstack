// Janela modal de confirmação (usada antes de excluir). Controlada por props.
export default function ConfirmDialog({ aberto, titulo, mensagem, confirmarLabel = 'Excluir', carregando, onConfirmar, onCancelar }) {
  if (!aberto) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" role="dialog" aria-modal="true" aria-labelledby="dialogo-titulo">
      <div className="card w-full max-w-md p-6">
        <h2 id="dialogo-titulo" className="text-xl font-bold">
          {titulo}
        </h2>
        <p className="mt-3 text-muted">{mensagem}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="btn-ghost" onClick={onCancelar} disabled={carregando}>
            Cancelar
          </button>
          <button type="button" className="btn-danger" onClick={onConfirmar} disabled={carregando}>
            {carregando ? 'Excluindo...' : confirmarLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
