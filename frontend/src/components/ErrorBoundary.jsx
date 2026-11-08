import { Component } from 'react'

// Captura erros inesperados de renderização e mostra uma página de erro personalizada
// (em vez de uma tela em branco).
export default class ErrorBoundary extends Component {
  state = { erro: null }

  static getDerivedStateFromError(erro) {
    return { erro }
  }

  componentDidCatch(erro, info) {
    console.error('Erro na aplicação:', erro, info)
  }

  render() {
    if (!this.state.erro) return this.props.children

    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl font-bold text-primary">Ops!</p>
        <h1 className="mt-4 text-2xl font-bold md:text-3xl">Algo deu errado</h1>
        <p className="mt-3 max-w-md text-muted">Ocorreu um erro inesperado ao exibir esta página. Tente recarregar ou volte ao início.</p>
        <a href="/" className="btn-primary mt-8">
          Voltar ao início
        </a>
      </div>
    )
  }
}
