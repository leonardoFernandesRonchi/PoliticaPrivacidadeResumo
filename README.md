🚀 **Projeto Resumo de Políticas de Privacidade**

Esse projeto foi desenvolvido com o objetivo de simplificar a leitura de políticas de privacidade e termos de uso, utilizando tecnologias modernas como LLM (Modelos de Linguagem de Grande Escala). A ideia é democratizar o acesso e compreensão desses documentos complexos, criando resumos claros para facilitar a navegação.

---

📋 **Pré-requisitos**

Antes de iniciar, verifique se possui os seguintes itens instalados em sua máquina:

- **Editor de código**: Sugerimos o [Visual Studio Code](https://code.visualstudio.com/), um dos editores mais populares.
- **Node.js**: Baixe e instale a versão mais recente estável de [Node.js](https://nodejs.org/).
- **Git**: Instale o [Git](https://git-scm.com/) a partir do site oficial.
- Além disso, será necessário um banco de dados SQL configurado corretamente.

---

🔧 **Instalação**

Siga os passos abaixo para instalar o projeto corretamente:

1. Clone o repositório:
    ```bash
    git clone https://github.com/leonardoFernandesRonchi/Estagio.git
    ```

2. Navegue até a pasta `front` e instale as dependências:
    ```bash
    cd front
    npm install
    ```

3. Em seguida, abra outro terminal, navegue até a pasta `node` e instale as dependências:
    ```bash
    cd node
    npm install
    ```

---

📄 Estrutura do Banco de Dados

```
CREATE TABLE politicas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  texto TEXT NOT NULL
);
```
---

**Configuração do Banco de Dados e API**:

Crie um arquivo `.env` dentro da pasta `node` com as seguintes configurações:

```bash
DB_HOST= (localhost) ou (nome do site)
DB_USER= (usuário do banco de dados)
DB_PASS= (senha)
DB_NAME= (nome do banco de dados)
DB_PORT= (porta onde o projeto ficará acessível)
MISTRAL_API_KEY= (sua chave de API do Mistral AI)
```

**Lembre-se de Reconfigurar o CORS para as portas necessárias em server.js**:

```
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3003'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200 // Para navegadores antigos
};

```
---

📌 Endpoints da API

| Método | Rota                   | Descrição                          |
|--------|------------------------|-----------------------------------|
| POST   | `/politicas`           | Cria uma nova política            |
| GET    | `/politicas`           | Lista todas as políticas          |
| GET    | `/politicas/:id`       | Busca uma política por ID         |
| DELETE | `/politicas/:id`       | Remove uma política               |
| POST   | `/politicas/:id/resumo`| Gera resumo da política via Mistral|

---

⚙️ Executando

Para rodar o projeto, siga os passos abaixo:

Na pasta front, execute o comando para iniciar o servidor front-end:

```bash
cd front
npm run dev
```
Em seguida, na pasta node, execute o servidor back-end:

```bash
cd node
node server.js
```
Agora, você pode acessar a aplicação no seu navegador, no host e porta configurados!

---

🛠️ Ferramentas Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

React: Biblioteca JavaScript para construir interfaces de usuário.

Next.js: Framework React para otimizar o desenvolvimento e a performance.

Node.js: Plataforma para o desenvolvimento de back-end utilizando JavaScript.

---



