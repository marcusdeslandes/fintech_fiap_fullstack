import { useCallback, useEffect, useState } from 'react'

// Executa uma função assíncrona (chamada à API) e controla os estados de carregamento e erro.
// "deps" funciona como no useEffect: quando mudar, a busca é refeita.
export function useFetch(buscar, deps = []) {
  const [estado, setEstado] = useState({ dados: null, carregando: true, erro: null })
  const [versao, setVersao] = useState(0)

  useEffect(() => {
    let ativo = true
    setEstado((atual) => ({ ...atual, carregando: true, erro: null }))

    buscar()
      .then((dados) => ativo && setEstado({ dados, carregando: false, erro: null }))
      .catch((e) => ativo && setEstado({ dados: null, carregando: false, erro: e.message }))

    return () => {
      ativo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, versao])

  const recarregar = useCallback(() => setVersao((v) => v + 1), [])

  return { ...estado, recarregar }
}
