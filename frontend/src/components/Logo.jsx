import logo from '../assets/logo.png'

// Versão compacta (somente o escudo + texto) para a barra de navegação.
// O PNG tem fundo transparente e cores escuras, por isso o filtro "brightness-400" (igual à prévia).
export function LogoCompacta() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-14 w-14 overflow-hidden">
        <img
          src={logo}
          alt="Logo da Fintech"
          className="max-w-none brightness-400"
          style={{ width: '204%', marginLeft: '-37%', marginTop: '-33%' }}
        />
      </div>
      <p className="text-xs tracking-[0.35em] text-slate-300">FINTECH</p>
    </div>
  )
}

// Versão completa para as telas de login e cadastro
export function LogoCompleta({ className = 'h-40' }) {
  return <img src={logo} alt="Logo da Fintech" className={`mx-auto w-auto brightness-400 ${className}`} />
}
