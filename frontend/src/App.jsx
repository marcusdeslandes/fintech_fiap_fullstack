import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ENTIDADES } from './config/entidades'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Perfil from './pages/Perfil'
import ListaPage from './pages/ListaPage'
import FormPage from './pages/FormPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />

          {/* Rotas protegidas (exigem login). O "key" faz o React remontar a página ao trocar de entidade, evitando reaproveitar o estado */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />

            <Route path="/despesas" element={<ListaPage key="despesas-lista" entidade={ENTIDADES.despesas} />} />
            <Route path="/despesas/nova" element={<FormPage key="despesas-nova" entidade={ENTIDADES.despesas} />} />
            <Route path="/despesas/:id/editar" element={<FormPage key="despesas-editar" entidade={ENTIDADES.despesas} />} />

            <Route path="/receitas" element={<ListaPage key="receitas-lista" entidade={ENTIDADES.receitas} />} />
            <Route path="/receitas/nova" element={<FormPage key="receitas-nova" entidade={ENTIDADES.receitas} />} />
            <Route path="/receitas/:id/editar" element={<FormPage key="receitas-editar" entidade={ENTIDADES.receitas} />} />

            <Route path="/investimentos" element={<ListaPage key="investimentos-lista" entidade={ENTIDADES.investimentos} />} />
            <Route path="/investimentos/nova" element={<FormPage key="investimentos-nova" entidade={ENTIDADES.investimentos} />} />
            <Route path="/investimentos/:id/editar" element={<FormPage key="investimentos-editar" entidade={ENTIDADES.investimentos} />} />
          </Route>

          {/* Página de erro personalizada */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
