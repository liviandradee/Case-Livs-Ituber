from flask import Flask, request, jsonify

app = Flask(__name__)

# Escolhi armazenar em memória para simplificação
pessoas = {}

# Função para validar CPF
def validar_cpf(cpf):
    # Remove os pontos e tracos do cpf
    cpf = cpf.replace(".", "").replace("-", "")

    # Verifica se todos sao numeros e se tem 11 numeros
    if len(cpf) != 11 or not cpf.isdigit():
        return False

    # Verifica se os numeros sao iguais
    if cpf == cpf[0] * len(cpf):
        return False

    # Calculo do primeiro digito
    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digito1 = (soma * 10 % 11) % 10

    # Calculo do segundo digito
    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digito2 = (soma * 10 % 11) % 10

    # Ve se os digitos sãa iguais ao cpf
    return digito1 == int(cpf[9]) and digito2 == int(cpf[10])

# Endpoint para cadastro (Create)
@app.route('/pessoas', methods=['POST'])
def cadastrar_pessoa():
    data = request.json
    # Validação dos dados recebidos
    if not data.get('nome_completo') or not data.get('cpf'):
        return jsonify({"erro": "Nome completo e CPF são obrigatórios."}), 400

    if not validar_cpf(data.get('cpf')):
        return jsonify({"erro": "CPF inválido."}), 400

    pessoa_id = str(len(pessoas) + 1)
    pessoas[pessoa_id] = {
        "nome_completo": data.get('nome_completo'),
        "data_nascimento": data.get('data_nascimento'),
        "endereco": data.get('endereco'),
        "cpf": data.get('cpf'),
        "estado_civil": data.get('estado_civil')
    }
    return jsonify({"id": pessoa_id, **pessoas[pessoa_id]}), 201

# Endpoint para listar as pessoas (Read)
@app.route('/pessoas', methods=['GET'])
def listar_pessoas():
    return jsonify(pessoas), 200

# Endpoint para atalizar pessoa (Update)
@app.route('/pessoas/<id>', methods=['PUT'])
def atualizar_pessoa(id):
    if id not in pessoas:
        return jsonify({"erro": "Pessoa não encontrada."}), 404

    data = request.json
    pessoa = pessoas[id]
    # Atualizando os dados
    pessoa.update({
        "nome_completo": data.get('nome_completo', pessoa["nome_completo"]),
        "data_nascimento": data.get('data_nascimento', pessoa["data_nascimento"]),
        "endereco": data.get('endereco', pessoa["endereco"]),
        "cpf": data.get('cpf', pessoa["cpf"]) if validar_cpf(data.get('cpf', pessoa["cpf"])) else pessoa["cpf"],
        "estado_civil": data.get('estado_civil', pessoa["estado_civil"])
    })
    return jsonify(pessoa), 200

# Endpoint para deletar (Delete)
@app.route('/pessoas/<id>', methods=['DELETE'])
def excluir_pessoa(id):
    if id not in pessoas:
        return jsonify({"erro": "Pessoa não encontrada."}), 404

    del pessoas[id]
    return jsonify({"mensagem": "Pessoa excluída com sucesso."}), 200

if __name__ == '__main__':
    app.run(debug=True)