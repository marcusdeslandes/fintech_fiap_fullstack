// Cabeçalho padrão das páginas internas: título, subtítulo e um botão de ação opcional (props)
export default function PageHeader({ titulo, subtitulo, acao }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold">{titulo}</h1>
        {subtitulo && <p className="mt-2 text-muted">{subtitulo}</p>}
      </div>
      {acao}
    </div>
  )
}
