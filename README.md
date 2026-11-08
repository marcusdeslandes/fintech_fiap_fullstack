# Fintech – Projeto Final (Java + Oracle + Spring Boot + ReactJS)

Controle financeiro com cadastro de **usuários, despesas, receitas e investimentos**.

```
backend/atvFase7   API REST (Spring Boot, JPA, Oracle FIAP)
frontend           SPA em React (Vite + React Router + Tailwind CSS)
banco/script.sql   Tabelas/sequences de referência + usuário de teste
```

## Pré-requisitos

* Java e Maven (ou o `mvnw` incluso) compatíveis com o `pom.xml`
* Node.js 20+ e npm
* Acesso (VPN/rede FIAP) à instância Oracle `oracle.fiap.com.br:1521:ORCL`

## 1\. Backend (porta 8080)

1. Confira usuário e senha do Oracle em `backend/atvFase7/src/main/resources/application.properties`.
2. Garanta que as tabelas existem (veja `banco/script.sql`; não rode os `CREATE` se já existirem).
3. Execute:

```bash
   cd backend/atvFase7
   ./mvnw spring-boot:run      # Windows: mvnw.cmd spring-boot:run
   ```

## 2\. Frontend (porta 5173)

```bash
cd frontend
npm install
npm run dev
```

Acesse **http://localhost:5173**. O `vite.config.js` encaminha `/api` para `http://localhost:8080` (proxy), então não há problema de CORS. O backend precisa estar rodando.

## Usuário de teste (login)

|E-mail|Senha|
|-|-|
|`teste@fintech.com`|`123456`|

## Funcionalidades

* Login, cadastro e logout; rotas protegidas; página 404 e tela de erro personalizadas
* Início (dashboard): totais de receitas, despesas e investimentos, último gasto, saldo e gráfico
* Perfil: consultar, atualizar e excluir a conta (`/api/usuarios`)
* Despesas, Receitas e Investimentos: listar, buscar, inserir, atualizar e excluir (`/api/despesas`, `/api/receitas`, `/api/investimentos`)

## Organização do frontend (`frontend/src`)

`pages/` telas · `components/` componentes reutilizáveis · `context/` autenticação · `services/api.js` consumo da API REST (fetch) · `config/entidades.js` campos e colunas de cada entidade · `hooks/`, `utils/`

## Observações

* O backend não tem endpoint de login: a autenticação confere e-mail e senha na lista de usuários (adequado ao escopo do curso).

