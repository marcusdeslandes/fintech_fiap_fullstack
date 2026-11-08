import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from './Navbar'

// Protege as páginas internas: sem usuário logado redireciona para /login.
// Quando autenticado, renderiza a barra de navegação e a página filha (<Outlet />).
export default function PrivateRoute() {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ de: location.pathname }} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-14">
          <Outlet />
        </div>
      </main>
      <footer className="border-t border-white/10 py-4 text-center text-xs text-muted">Fintech · Projeto FIAP</footer>
    </div>
  )
}
