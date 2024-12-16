<<<<<<< HEAD
# CRUD: Gerenciamento de Livros em uma Biblioteca

## Objetivo

Desenvolver uma API utilizando Node.js com Express, integrada a um banco de dados SQLite por meio do ORM Prisma. O objetivo é criar um sistema que permita o cadastro, atualização, exclusão e listagem de livros em uma biblioteca.

## Requisitos

1. Implementar os endpoints para gerenciar livros utilizando o framework Express.
2. Usar o Prisma com SQLite para persistência de dados no banco de dados.
3. Cada livro deve conter as seguintes informações:
   - **ID** (gerado automaticamente)
   - **Título**
   - **Autor**
   - **Ano de Publicação**
   - **Gênero**

## Funcionalidades Obrigatórias

- **Cadastrar:** Adicionar novos livros ao sistema.
- **Atualizar:** Editar os dados de um livro já existente.
- **Excluir:** Remover um livro do banco de dados.
- **Listar:** Exibir todos os livros cadastrados em formato de tabela.

---

## Sistema de Gerenciamento de Biblioteca

### Descrição

Este projeto foi desenvolvido em TypeScript para gerenciar livros de forma eficiente. O sistema oferece funcionalidades como:

- Cadastro de livros.
- Registro de empréstimos.
- Consulta de disponibilidade de livros.

### Funcionalidades

- **Cadastro de Livros:** Permite adicionar novos livros ao catálogo da biblioteca.
- **Registro de Empréstimos:** Permite registrar quando um livro é emprestado.
- **Consulta de Disponibilidade:** Informa se um livro está disponível ou se já foi emprestado.

### Estrutura do Projeto

- **Livro.ts:** Define a estrutura de um livro, incluindo propriedades como código, título, autor e disponibilidade. O construtor inicializa todas as propriedades e define como padrão a disponibilidade do livro como `true`.
- **Biblioteca.ts:** Classe que gerencia o catálogo de livros. Inclui métodos para adicionar livros, registrar empréstimos e verificar disponibilidade. Realiza tratamentos de erro para cenários como tentativas de empréstimo de livros inexistentes ou já emprestados.
- **main.ts:** Script de teste que simula o uso do sistema. Ele adiciona livros ao catálogo, registra empréstimos e consulta a disponibilidade de livros, reproduzindo o fluxo do sistema.

### Detalhamento do Código

#### Classe Livro

Define as propriedades de um livro:

- **código:** Identificador único do livro.
- **título:** Título do livro.
- **autor:** Autor do livro.
- **disponível:** Indica se o livro está disponível para empréstimo (valor padrão: `true`).

#### Classe Biblioteca

Gerencia um catálogo privado de livros e possui métodos para:

- **Adicionar Livros:** Inserir novos livros no catálogo.
- **Registrar Empréstimos:** Atualizar a disponibilidade de livros ao registrar empréstimos.
- **Consultar Disponibilidade:** Verificar se um livro está disponível para empréstimo.

Inclui tratamentos de erro para:

- **Livros Inexistentes:** Informa quando um livro não está presente no catálogo.
- **Livros Já Emprestados:** Informa quando um livro já foi emprestado.

#### Funções de Teste

A função `testarBiblioteca` em `main.ts` simula o uso do sistema:

1. Cria instâncias de livros.
2. Adiciona livros ao catálogo.
3. Registra o empréstimo de um livro.
4. Verifica a disponibilidade antes e após o empréstimo.

### Como Executar

#### Pré-requisitos

- Certifique-se de ter o Node.js e o TypeScript instalados na sua máquina.

#### Instalação do TypeScript (se necessário):

```bash
npm install -g typescript
```

#### Compilar os Arquivos TypeScript:

Com o terminal aberto na pasta `src`, compile os arquivos TypeScript com:

```bash
tsc
```

Isso gerará os arquivos JavaScript correspondentes.

#### Executar o Script Principal:

Com o terminal aberto na pasta `dist`, execute o arquivo `main.js` gerado:

```bash
node main.js
```

### Testes Realizados

- **Cadastro de Livros:** Adição de novos livros ao catálogo inicial.
- **Registro de Empréstimo:** Registro de empréstimos para livros específicos.
- **Consulta de Disponibilidade:** Verificação da disponibilidade antes e após o empréstimo.
- **Tratamento de Erros:** Garantia de mensagens apropriadas em casos de operações inválidas, como tentativa de empréstimo de livros inexistentes ou já emprestados.

### Tratamento de Erros

O sistema realiza verificações para:

- **Livros Inexistentes:** Informa quando o livro não está presente no catálogo.
- **Livros Já Emprestados:** Notifica que o livro já está indisponível quando emprestado.

=======
# CRUD---Livro
>>>>>>> fa2cce4e235f91d3f0bc54cdf1e17525bace77bc
