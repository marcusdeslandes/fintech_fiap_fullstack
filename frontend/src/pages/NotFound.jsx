import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Página de erro personalizada (rota inexistente)
export default function NotFound() {
  const { usuario } = useAuth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-primary md:text-9xl">404</p>
      <h1 className="mt-4 text-2xl font-bold md:text-3xl">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-muted">O endereço que você tentou acessar não existe ou foi movido.</p>
      <Link to={usuario ? '/' : '/login'} className="btn-primary mt-8">
        {usuario ? 'Voltar ao início' : 'Ir para o login'}
      </Link>
    </div>
  )
}
