# Loja de Crochê da Ruiva

E-commerce especializado em peças de crochê artesanais, desenvolvido com TypeScript, SASS e Node.js.

## 🚀 Funcionalidades

- Catálogo de produtos organizado por categorias
- Carrossel de produtos em destaque
- Filtro de produtos por categoria
- Sistema de pedidos
- Área administrativa para gerenciamento de produtos

## 🛠️ Tecnologias Utilizadas

### Front-end
- TypeScript
- SASS
- Vite
- HTML5

### Back-end
- Node.js
- Express
- SQLite (em desenvolvimento)
- Sequelize ORM

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/LojaCrocheDaRuiva.git
cd LojaCrocheDaRuiva
```

2. Instale as dependências do servidor:
```bash
cd server
npm install
```

3. Instale as dependências do cliente:
```bash
cd ../client
npm install
```

## 🚀 Executando o Projeto

1. Inicie o servidor:
```bash
cd server
npm run dev
```

2. Em outro terminal, inicie o cliente:
```bash
cd client
npm run dev
```

3. Acesse a aplicação:
- Front-end: http://localhost:5173
- Back-end: http://localhost:3000

## 📝 Estrutura do Projeto

```
LojaCrocheDaRuiva/
├── client/                 # Front-end
│   ├── src/
│   │   ├── styles/        # Arquivos SASS
│   │   ├── main.ts        # Ponto de entrada
│   │   └── index.html     # Template HTML
│   └── package.json       # Dependências do front-end
│
├── server/                 # Back-end
│   ├── src/
│   │   ├── models/        # Modelos do banco de dados
│   │   ├── routes/        # Rotas da API
│   │   └── server.js      # Ponto de entrada
│   └── package.json       # Dependências do back-end
│
└── README.md              # Documentação
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [ ] Implementar autenticação de usuários
- [ ] Criar sistema de carrinho de compras
- [ ] Desenvolver painel administrativo
- [ ] Adicionar sistema de pagamento
- [ ] Implementar avaliações de produtos 