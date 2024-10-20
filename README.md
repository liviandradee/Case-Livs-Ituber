# API de Cadastro e Gestão de Pessoas
## Esta é uma API simples para cadastro e gestão de pessoas. Ela permite criar, listar, atualizar e excluir informações de pessoas, armazenando os dados em memória.

 1. Objetivo: Criar uma API para cadastro e gestão de pessoas.
 2. Endpoints: 
  - localhost/pessoas (POST)
  - localhost/pessoas (GET)
  - localhost/pessoas/id (PUT)
  - localhost/pessoas/id (DELETE)
 3. Recursos: Gestão de pessoas




## Tecnologias Utilizadas

Python

Flask

## Funcionalidades

A API oferece as seguintes operações:

Cadastrar uma nova pessoa (Create)
#
Listar todas as pessoas cadastradas (Read)
#
Atualizar informações de uma pessoa (Update)
#
Excluir uma pessoa (Delete)
#

## Pré-requisitos
Python 3.7+
#
Pip (para instalar dependências)
#
Postman (para testar a API)
#
## Instalação


### Crie um ambiente virtual (opcional, mas recomendado):

python -m venv venv

### Ative o ambiente virtual:

### Windows:

venv\Scripts\activate

### Linux/Mac:

source venv/bin/activate

### Instale as dependências:

pip install flask

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


## 🧡💙
