// Ícones SVG inline (os mesmos da prévia em HTML), em formato de componente React.
const base = { fill: 'none', viewBox: '0 0 24 24' }
const tracoFino = { stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IconHome = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M3 10.5L12 3L21 10.5" {...tracoFino} />
    <path d="M5.5 9.5V20H18.5V9.5" {...tracoFino} />
  </svg>
)

export const IconUser = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" {...tracoFino} />
    <path d="M4 20a8 8 0 0116 0" {...tracoFino} />
  </svg>
)

export const IconDespesas = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M4 7H20" {...tracoFino} />
    <path d="M7 7V5.5A1.5 1.5 0 018.5 4h7A1.5 1.5 0 0117 5.5V7" {...tracoFino} />
    <path d="M6 7L7 18a2 2 0 002 2h6a2 2 0 002-2l1-11" {...tracoFino} />
  </svg>
)

export const IconReceitas = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M12 3v18" {...tracoFino} />
    <path d="M16 7.5c0-1.933-1.79-3.5-4-3.5s-4 1.567-4 3.5S9.79 11 12 11s4 1.567 4 3.5S14.21 18 12 18s-4-1.567-4-3.5" {...tracoFino} />
  </svg>
)

export const IconInvestimentos = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M4 18l5-6 4 3 7-9" {...tracoFino} />
    <path d="M15 6h5v5" {...tracoFino} />
  </svg>
)

export const IconSair = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M9 7L4 12L9 17" {...tracoFino} />
    <path d="M4 12H14a6 6 0 010 12" {...tracoFino} />
  </svg>
)

export const IconPlus = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M12 5v14M5 12h14" {...tracoFino} />
  </svg>
)

export const IconEditar = ({ className = 'h-4 w-4' }) => (
  <svg className={className} {...base}>
    <path d="M4 20h4L19 9a2.8 2.8 0 00-4-4L4 16v4z" {...tracoFino} />
  </svg>
)

export const IconLixeira = ({ className = 'h-4 w-4' }) => <IconDespesas className={className} />

// Ícones grandes dos cards do dashboard
const grande = { fill: 'none', viewBox: '0 0 64 64' }
const traco = { stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IconCardReceita = ({ className = 'h-14 w-14 text-slate-300' }) => (
  <svg className={className} {...grande}>
    <path d="M10 40c4-7 9-10 15-10h8c2 0 4 2 4 4v8H24" {...traco} />
    <path d="M37 38l8-7c3-2 6-2 8 0 2 2 2 5 0 7l-10 9c-2 2-4 3-7 3H23l-7 4V40l7-2h10" {...traco} />
    <circle cx="49" cy="19" r="8" {...traco} />
    <path d="M49 15v8M46 18h6" {...traco} />
  </svg>
)

export const IconCardDespesa = ({ className = 'h-14 w-14 text-slate-300' }) => (
  <svg className={className} {...grande}>
    <path d="M10 42c4-6 8-9 14-9h9c2 0 4 2 4 4v7H24" {...traco} />
    <path d="M37 40l8-7c2-2 5-2 7 0 2 2 2 5 0 7l-10 8c-2 2-4 3-7 3H23l-7 4V42l7-2h10" {...traco} />
    <rect x="40" y="14" width="14" height="9" rx="2" {...traco} />
    <path d="M43 18h8" {...traco} />
  </svg>
)

export const IconCardInvestimento = ({ className = 'h-14 w-14 text-slate-300' }) => (
  <svg className={className} {...grande}>
    <path d="M11 44c4-6 8-9 14-9h7c3 0 5 2 5 5v5H25l-6 3-8-4V44z" {...traco} />
    <path d="M40 40l6-7 5 4 8-11" {...traco} />
    <path d="M41 50h18M41 45v5M47 41v9M53 37v13" {...traco} />
  </svg>
)

export const IconCardSaldo = ({ className = 'h-14 w-14 text-slate-300' }) => (
  <svg className={className} {...grande}>
    <path d="M17 26h27c5 0 9 4 9 9v6c0 7-6 13-13 13H24c-7 0-13-6-13-13v-4c0-6 5-11 11-11h3" {...traco} strokeLinecap={undefined} />
    <path d="M23 26v-3c0-5 4-9 9-9h6" {...traco} />
    <circle cx="45" cy="20" r="8" {...traco} />
    <path d="M45 16v8M42 19h6" {...traco} />
    <circle cx="20" cy="38" r="2" fill="currentColor" />
  </svg>
)
