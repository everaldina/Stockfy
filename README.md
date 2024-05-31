# Stockfy

Um sistema de gerenciamento de estoque de produtos, nele é possivel gerenciar produtos e registrar o movimento de lotes, assim como seus status.

Para o projeto foi utilizado angular para front-end e firebase para o back-end. Tambem foi utilizado materiais do [PrimeNG](https://primeng.org/) para a criação de componentes.

O projeto pode ser visualizado em: https://stockify-5c8ba.web.app/

## Como utilizar

Para utilizar o projeto é necessario ter o node instalado, e o angular-cli, para instalar o angular-cli basta rodar o comando:

```bash
npm install -g @angular/cli
```

Depois de instalar o angular-cli, basta rodar o comando para instalar as dependencias do projeto:

```bash
npm install
```

Feito isso, basta rodar o comando para iniciar o projeto:

```bash
ng serve
```

O projeto estará disponivel em `http://localhost:4200/`

## Funcionalidades

O projeto possui as seguintes funcionalidades:

- CRUD de produtos (/produtos)
- CRUD de lotes (/lotes/:id)
- Autenteicação (/login)

## Caracteristicas do projeto

- Autenticação do usuário
  - Login e logout com email e senha, utilizando o firebase
- Componentes standalone
  - Lista de produtos
  - Lista de lotes
  - Home
  - Header
  - Adicionar produtos
  - Adicionar lotes
- CRUD
  - Produtos
  - Lotes
- Metodo de ciclo de vida dos componentes
  - ngOnChanges: Utilizado para atualizar o formulario de edição de produtos e lotes
  - ngOnInit: Utilizado para carregar os dados de produtos e lotes
- Formularios reativos
  - Cadastro de produtos
  - Cadastro de lotes
  - Edição de produtos
  - Edição de lotes
- Signals
  - Lista de produtos
  - Lista de lotes
- Gerencia de estado
  - Services

## Equipe

### Caua Clemente

- Github: [Caua-Clemente](https://github.com/Caua-Clemente)

### Everaldina Barbosa

- Github: [everaldina](github.com/everaldina)
- Contato: everaldinag@gmail.com

### João Manoel

- Github: [John Parsec](https://github.com/John-Parsec)

### Náthalie Lima

- Github: [NathalieLima](https://github.com/NathalieLima)
