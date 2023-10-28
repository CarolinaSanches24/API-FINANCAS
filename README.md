# :bar_chart: API-FINANCAS

API para Controle de Finanças

<img src="https://hubbseguros.com.br/wp-content/uploads/2020/04/blog-2-financas.png">

# :clipboard: Descrição do Projeto
Consiste em uma API Rest que controla finanças do usuário , fluxo de entradas e sáidas, com segurança e proteção dos dados do cliente através da criptografia e autenticação do usuário.
# Funcionalidades do Projeto
✅ Criar Conta Usuáriobr>
✅ Atualizar Conta <br>
✅ Logar <br>
✅ Listar Contas <br>
✅ Criar Transação <br>
✅ Atualizar Transação<br>
✅ Buscar uma Transação especifica <br>
✅ Excluir Transação <br>
✅ Consultar Extrato <br>
✅ Listar Categorias<br>
✅ Autenticação de Usuário via Token e senha <br>
✅ Criptografia de Senha <br>
# :hammer_and_pick: Tecnologias Utilizadas


# Implementação do Projeto
- Primeiro faça o Fork do Projeto.
-  Depois clone o repositório para seu ambiente:<br>
  Digite o comando <strong>git clone + a chave ssh do Projeto.</strong>
  
# Instalações de Bibliotecas Necessárias
- npm install bcrypt :closed_lock_with_key: (Responsável pela Criptografia das senhas)
- npm install express (processo de criação de servidores web)
- npm install pg (conexao ao banco de dados PostgreSQL)
- npm install nodemon (automaticamente reinicia o servidor quando mudanças são detectadas)
- npm install dotenv ( gerenciamento variáveis de ambiente)
- npm install jsonwebtoken :key: (criação de tokens )
# 🚀 Inicialização

# Execução do Projeto

O projeto pode ser executado utilizando o <strong style ="color:purple">Insomia</strong>
<br> Através das Rotas Abaixo:

- Cadastrar Usuário
  <br>
  <strong style="color:green">POST</strong>
  http://localhost:3000/usuario

- Login
  <br>
  <strong style="color:green">POST</strong>
  http://localhost:3000/login

- Exibir Usuário
  <br>
  <strong style="color:purple">GET</strong>
  http://localhost:3000/usuario
- Atualizar Usuário
  <br>
  <strong style="color:orange">PUT</strong>
  http://localhost:3000/usuario
- Listar Categorias
  <br>
  <strong style="color:purple">GET</strong>
  http://localhost:3000/categoria
- Cadastrar Transação
  <br>
  <strong style="color:green">POST</strong>
  http://localhost:3000/transacao
- Atualizar Transação
  <br>
  <strong style="color:orange">PUT</strong>
  http://localhost:3000/transacao/:id
- Obter Transação
  <br>
  <strong style="color:purple">GET</strong>
  http://localhost:3000/transacao/:id
- Excluir Transação
  <br>
  <strong style="color:red">DELETE</strong>
  http://localhost:3000/transacao/:id
- Listar Transações
  <br>
  <strong style="color:purple">GET</strong>
  http://localhost:3000/transacao/extrato
  - Extrato
  <br>
  <strong style="color:purple">GET</strong>
  http://localhost:3000/transacao

# 🤝Contribuições

Siga os passos abaixo para contribuir:

1. Faça o fork do projeto (https://github.com/CarolinaSanches24/API-FINANCAS)

2. Clone o seu fork para sua maquína (git clone https://github.com/user_name/REPO_NAME.git)

3. Crie uma branch para realizar sua modificação (git checkout -b feature/name_new_feature)

4. Adicione suas modificações e faça o commit (git commit -m "Descreva sua modificação")

5. Push (git push origin feature/name_new_feature)

6. Crie um novo Pull Request

Pronto, agora só aguardar a análise

# :black_nib: Autoras

<img src="./img/Carolina Sanches Moraes .png" width="150px" height="150px">
<p class = "descricao_carol"><b>Professora de Informática</b>, <br>
Desenvolvedora de Software</p>
<br>

<img src="./img/Eduarda Menegueli Souza.png" width="150px" height="150px">
<p><b>
Desenvolvedora de Software</b></p>
