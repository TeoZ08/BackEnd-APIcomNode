# API de Usuários com Node.js

https://teoz08.github.io/FrontEnd-ApicomNode/

Este é o repositório do back-end para uma API RESTful de gerenciamento de usuários. O projeto foi desenvolvido com Node.js, Express e Prisma, utilizando um banco de dados MongoDB.

## ✨ Funcionalidades

-   [x] **Criar** usuários
-   [x] **Listar** todos os usuários (com suporte a filtros por nome, email e idade)
-   [x] **Atualizar** um usuário existente pelo seu ID
-   [x] **Deletar** um usuário pelo seu ID

## 🛠️ Tecnologias Utilizadas

-   [Node.js](https://nodejs.org/en/)
-   [Express.js](https://expressjs.com/pt-br/)
-   [Prisma](https://www.prisma.io/) - ORM para Node.js
-   [MongoDB](https://www.mongodb.com/) - Banco de Dados NoSQL

## ⚙️ Pré-requisitos

Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:
-   [Git](https://git-scm.com)
-   [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
-   [npm](https://www.npmjs.com/) (geralmente já vem com o Node.js)

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/TeoZ08/BackEnd-APIcomNode.git](https://github.com/TeoZ08/BackEnd-APIcomNode.git)
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd BackEnd-APIcomNode
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**
    -   Crie um arquivo chamado `.env` na raiz do projeto.
    -   Copie o conteúdo do exemplo abaixo e cole no seu arquivo `.env`, substituindo pela sua string de conexão do MongoDB Atlas.
    ```env
    # Exemplo de conteúdo para o arquivo .env
    # Substitua pela sua string de conexão do MongoDB Atlas
    DATABASE_URL="mongodb+srv://seu_usuario:sua_senha@seu_cluster.mongodb.net/seu_banco?retryWrites=true&w=majority"
    ```

5.  **Sincronize o banco de dados com o schema do Prisma:**
    ```bash
    npx prisma db push
    ```

6.  **Inicie o servidor:**
    ```bash
    node --watch server.js
    ```

O servidor estará rodando em `http://localhost:3000`.

## 📖 Endpoints da API

Abaixo estão os endpoints disponíveis na API.

| Método | Rota | Descrição | Corpo (Body) Exemplo |
| :--- | :--- |:---|:---|
| `GET` | `/usuarios` | Lista todos os usuários. Aceita filtros via query params (`?name=`, `?email=`, `?age=`). | *Nenhum* |
| `POST` | `/usuarios` | Cria um novo usuário. | `{ "name": "string", "email": "string", "age": number }` |
| `PUT` | `/usuarios/:id` | Atualiza um usuário existente pelo seu ID. | `{ "name": "string", "email": "string", "age": number }` |
| `DELETE`| `/usuarios/:id`| Deleta um usuário pelo seu ID. | *Nenhum* |
