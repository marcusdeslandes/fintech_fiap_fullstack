import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { LogoCompacta } from './Logo'
import { IconDespesas, IconHome, IconInvestimentos, IconReceitas, IconSair, IconUser } from './Icons'

const LINKS = [
  { to: '/', rotulo: 'Início', icone: IconHome, end: true },
  { to: '/perfil', rotulo: 'Perfil', icone: IconUser },
  { to: '/despesas', rotulo: 'Despesas', icone: IconDespesas },
  { to: '/receitas', rotulo: 'Receitas', icone: IconReceitas },
  { to: '/investimentos', rotulo: 'Investimentos', icone: IconInvestimentos },
]

export default function Navbar() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function sair() {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-white/5 bg-[#080d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <LogoCompacta />

          <nav className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-slate-300">
            {LINKS.map(({ to, rotulo, icone: Icone, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-xl py-2 ${
                    isActive ? 'bg-primarySoft px-4 text-white shadow-sm' : 'px-3 hover:bg-white/5'
                  }`
                }
              >
                <Icone />
                {rotulo}
              </NavLink>
            ))}

            <button
              type="button"
              onClick={sair}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 hover:bg-white/5"
            >
              <IconSair />
              Sair
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
