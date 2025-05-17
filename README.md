
# Portal de Notícias

Este é um projeto de portal de notícias desenvolvido para demonstrar conhecimentos em Node.js, Express, MongoDB, EJS, HTML, CSS, e JavaScript. O sistema permite que qualquer usuário possa se cadastrar, fazer login e acessar um painel administrativo onde é possível adicionar, editar e excluir notícias. Além disso, foi implementada uma funcionalidade de **modo escuro** para personalizar a experiência do usuário.

## Funcionalidades

- **Login e Cadastro**: Usuários podem se cadastrar e fazer login.
- **Painel Administrativo**: Área exclusiva para administradores, onde podem adicionar, editar e excluir notícias.
- **Modo Escuro**: O site pode ser alternado entre modo claro e escuro, com a preferência salva no navegador.
- **Cadastro de Notícias**: O administrador pode criar notícias com título, conteúdo, categoria, autor, slug (URL única) e imagem.
- **Edição e Exclusão de Notícias**: O administrador pode editar ou excluir notícias existentes.
- **Busca de Notícias**: Implementação de uma barra de pesquisa que permite aos usuários procurar por notícias por título ou subtítulo.

## Tecnologias Usadas

- **Node.js**: Plataforma para execução do JavaScript no servidor.
- **Express**: Framework web para Node.js, usado para simplificar o roteamento e gerenciamento de requisições.
- **MongoDB**: Banco de dados NoSQL para armazenar os dados das notícias e usuários.
- **EJS**: Motor de template usado para renderizar as páginas HTML dinâmicas.
- **CSS**: Estilização do site, incluindo a implementação do modo escuro.
- **Multer**: Middleware para o upload de arquivos, utilizado para enviar imagens nas notícias.
- **Session**: Gerenciamento de sessões para manter o usuário logado enquanto navega pelo site.

## Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/tonydevpro/portal-de-noticias.git
```

### 2. Instale as dependências

Entre no diretório do projeto e instale as dependências:

```bash
cd portal-de-noticias
npm install
```

### 3. Configure o MongoDB

Certifique-se de ter o MongoDB instalado e em execução. Você também pode usar um serviço de MongoDB na nuvem, como o [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### 4. Inicie o servidor

Com as dependências instaladas e o MongoDB configurado, execute o comando para iniciar o servidor:

```bash
npm start
```

O servidor estará rodando em `http://localhost:5000`.

### 5. Acesse o projeto

Abra o navegador e acesse a URL `http://localhost:5000`. Você pode:

- **Cadastrar-se**: Para criar uma conta.
- **Fazer login**: Com as credenciais de administrador ou usuário comum.
- **Painel Administrativo**: Acesse o painel para adicionar, editar ou excluir notícias (somente para administradores).

## Funcionalidades de Admin

O administrador tem acesso a um painel exclusivo onde é possível:

- **Adicionar notícias**: O administrador pode criar uma nova notícia com título, categoria, conteúdo, autor e imagem.
- **Editar notícias**: O administrador pode modificar as notícias existentes.
- **Excluir notícias**: O administrador pode remover notícias do portal.
- **Visualizar notícias**: O painel exibe uma lista das notícias cadastradas.

## Contribuindo

Se você quiser contribuir para este projeto, sinta-se à vontade para fazer um fork, criar uma branch, e enviar um pull request. Fique à vontade para sugerir melhorias ou reportar bugs.

## Licença

Este projeto é de código aberto e está sob a licença [MIT](LICENSE).
