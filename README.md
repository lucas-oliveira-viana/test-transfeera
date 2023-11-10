# test-transfeera

## 💡 Motivação

Este é um projeto criado para uma das etapas do processo seletivo da empresa Transfeera.

## 🌟 Descrição

Esta aplicação contém uma listagem de favorecidos em tabela com opção de exclusão em lote, uma tela de criação e um modal para edição/visualização.

## 🏰 Arquitetura

Como descrito no desafio, a ideia desse projeto é criar uma aplicação front-end escalável. Portanto, para permitir essa escalabilidade, foram utilizadas algumas abordagens como:
- Webpack configurado manualmente do zero para permitir o controle total das configurações da aplicação.
- Separação da estrutura de pastas entre dois tipos:
  - `core`: contém os arquivos não ou pouco reutilizaveis da aplicação ou vitais para o funcionamento. ex: Páginas, componentes como Header e Footer, hooks, tipos...
  - `shared`: contém os componentes e artefatos reutilizaveis e que poderiam funcionar alheios à aplicação. ex: Assets estáticos, internacionalização, estilos genéricos...
- Design tokens definidos no arquivo `tokens.scss`.
- Utilização da biblioteca `Redux Toolkit` para gerenciamento e centralização de estados reutilizáveis pela aplicação
- Funcionalidade de internacionalização com a biblioteca `i18next`.
- Todos os componentes criados manualmente para possibilidade de migração à um possível futuro Design System da empresa.
- Proxy configurado com o webpack-dev-server para ser possível realizar a chamada ao mesmo host no caminho  `/api` como comumente é feito no ambiente de produção, evitando conflitos de ambiente.

## 🛠️ Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

Ter o Node.js de uma versão compatível com o React 18 instalado em seu computador.  
Ter o Git instalado em seu computador, com as credenciais configuradas.

## 🚀 Instalação e Execução

Clone este repositório.

Navegue até o diretório do projeto:

```bash
cd test-transfeera
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação do servidor:

```bash
npm run server
```

Abra um navegador e acesse http://localhost:3001/ para visualizar a página inicial do servidor.

Inicie a aplicação do client (front-end):

```bash
npm start
```

O navegador deverá abrir automaticamente na página da aplicação, mas caso não funcione, abra um navegador e acesse a url indicada pelo webpack no log do terminal

### Outros comandos

Comando para execução de testes:

```bash
npm run test
```

Comando para geração do bundle/artefato:

```bash
npm run build
```
