# test-transfeera

## Motivação

Este é um projeto criado para uma das etapas do processo seletivo da empresa Transfeera.

## Descrição

Esta aplicação foi desenvolvida utilizando o Framework React na versão 18.2 utilizando a biblioteca JSON Server como um servidor "fake". Suas funcionalidades são: uma listagem de favorecidos em tabela com opção de exclusão em lote, e um modal para edição/visualização.

## Pré-requisitos

Antes de começar, certifique-se de atender aos seguintes requisitos:

Ter o Node.js instalado em seu computador.  
Ter o Git instalado em seu computador, com as credenciais configuradas.

## Instalação e Execução

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
