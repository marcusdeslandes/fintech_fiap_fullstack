import { LogoCompleta } from './Logo'

// Moldura das telas de login e cadastro (sem barra de navegação)
export default function AuthLayout({ titulo, subtitulo, larguraMax = 'max-w-md', children }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className={`w-full ${larguraMax}`}>
        <LogoCompleta className="h-36" />
        <div className="card mt-6 p-6 md:p-8">
          <h1 className="text-2xl font-bold md:text-3xl">{titulo}</h1>
          {subtitulo && <p className="mt-2 text-muted">{subtitulo}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
