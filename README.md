# Manage+ API
## Manage+ é um programa  simples que permite cadastrar, atualizar, listar e excluir pessoas. Este README explica como utilizar a API e como trabalhar com a interface HTML fornecida.

### Requisitos
Antes de começar, você precisa ter o seguinte instalado:

### Python 3.x
### Flask
### Flask-CORS

 ###  1. Objetivo: Criar uma API para cadastro e gestão de pessoas.
 ###  2. Endpoints: 
  - localhost/pessoas (POST)
  - localhost/pessoas (GET)
  - localhost/pessoas/id (PUT)
  - localhost/pessoas/id (DELETE)
 ###  3. Recurso: Gestão de pessoas


## Instalação


### Crie um ambiente virtual (opcional, mas recomendado):

python -m venv venv

### Ative o ambiente virtual:

####  python -m venv venv
#### source venv/bin/activate   Para Linux/Mac
####  venv\Scripts\activate      Para Windows



### Instale as dependências:

pip install flask
pip install flask-cors

## Como Executar a API
Execute o comando:

python app.py

A API estará disponível em http://127.0.0.1:5000.

Testando a API com o Postman

### 1. Cadastrar uma nova pessoa

Método: POST
URL: http://127.0.0.1:5000/pessoas
Body (JSON):



{
  "nome_completo": "João Silva",
  "data_nascimento": "1990-01-01",
  "endereco": "Rua das Flores, 123",
  "cpf": "12345678901",
  "estado_civil": "Solteiro"
}

Resposta esperada:

{
  "id": "1",
  "nome_completo": "João Silva",
  "data_nascimento": "1990-01-01",
  "endereco": "Rua das Flores, 123",
  "cpf": "12345678901",
  "estado_civil": "Solteiro"
}

### 2. Listar todas as pessoas
Método: GET
URL: http://127.0.0.1:5000/pessoas

Resposta esperada:


{
  "1": {
    "nome_completo": "João Silva",
    "data_nascimento": "1990-01-01",
    "endereco": "Rua das Flores, 123",
    "cpf": "12345678901",
    "estado_civil": "Solteiro"
  }
}


## 3. Atualizar uma pessoa existente
Método: PUT
URL: http://127.0.0.1:5000/pessoas/1

Body (JSON):

{
  "endereco": "Avenida Central, 456"
}
Resposta esperada:

{
  "nome_completo": "João Silva",
  "data_nascimento": "1990-01-01",
  "endereco": "Avenida Central, 456",
  "cpf": "12345678901",
  "estado_civil": "Solteiro"
}

## 4. Excluir uma pessoa
Método: DELETE
URL: http://127.0.0.1:5000/pessoas/1

Resposta esperada:

{
  "mensagem": "Pessoa excluída com sucesso."
}


### INTERFACE HTML: 

#### Inicie a api com o python app.py

#### Abra o arquivo index.html: Você pode abrir o arquivo index.html em um navegador web.

####  Cadastrar Pessoa: Preencha o formulário de cadastro e clique em "Cadastrar". A nova pessoa será adicionada à API e aparecerá na lista abaixo.

####  Atualizar Pessoa: Para atualizar uma pessoa, insira o ID da pessoa que deseja atualizar e preencha os campos que deseja modificar. Clique em "Atualizar".

#### Excluir Pessoa: Na lista de pessoas cadastradas, clique no botão "Excluir" ao lado da pessoa que deseja remover.

## 🧡💙
