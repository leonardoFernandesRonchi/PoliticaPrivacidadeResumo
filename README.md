🚀Projeto Resumo de Políticas de Privacidade
Esse projeto foi desenvolvido com o objetivo de simplificar a leitura de políticas de privacidade e termos de uso, utilizando tecnologias modernas como LLM (Modelos de Linguagem de Grande Escala). A ideia é democratizar o acesso e compreensão desses documentos complexos, criando resumos claros para facilitar a navegação.

📋 Pré-requisitos
Antes de iniciar, verifique se possui os seguintes itens instalados em sua máquina:

- **Editor de código:** Sugerimos o [Visual Studio Code](https://code.visualstudio.com/), um dos editores mais populares.
- **Node.js:** Baixe e instale a versão mais recente estável de [Node.js](https://nodejs.org/).
- **Git:** Instale o [Git](https://git-scm.com/) a partir do site oficial.

Além disso, será necessário um banco de dados SQL configurado corretamente.

🔧 Instalação
Siga os passos abaixo para instalar o projeto corretamente:

Clone o repositório:
`git clone https://github.com/leonardoFernandesRonchi/Estagio.git`

Navegue até a pasta front e instale as dependências:
`npm install`

Em seguida, abra outro terminal, navegue até a pasta node e instale as dependências:
`npm install`

Configuração do Banco de Dados e API:

Crie um arquivo .env dentro da pasta node com as seguintes configurações:

DB_HOST= (localhost) ou (nome do site)
DB_USER= (usuário do banco de dados)
DB_PASS= (senha)
DB_NAME= (nome do banco de dados)
DB_PORT= (porta onde o projeto ficará acessível)
MISTRAL_API_KEY= (sua chave de API do Mistral AI)
**Observação: Lembre-se de que a chave da API deve ser armazenada no arquivo .env para segurança.**

⚙️ Executando
Para rodar o projeto, siga os passos abaixo:

Na pasta front, execute o comando para iniciar o servidor front-end:

`
npm run dev
`
Em seguida, na pasta node, execute o servidor back-end:
`
node server.js
`
Agora, você pode acessar a aplicação no seu navegador, no host e porta configurados!

🛠️ Ferramentas Utilizadas
Este projeto foi desenvolvido utilizando as seguintes tecnologias:

React: Biblioteca JavaScript para construir interfaces de usuário.

Next.js: Framework React para otimizar o desenvolvimento e a performance.

Node.js: Plataforma para o desenvolvimento de back-end utilizando JavaScript.
