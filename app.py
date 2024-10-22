import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Conexão com o SQL
def get_db_connection():
    conn = mysql.connector.connect(
        host="192.168.15.13",
        user="api_user",
        password="Demilovato123@", 
        database="api_pessoas"
    )
    return conn

# Função para validar CPF
def validar_cpf(cpf):
    cpf = cpf.replace(".", "").replace("-", "")

    if len(cpf) != 11 or not cpf.isdigit():
        return False

    if cpf == cpf[0] * len(cpf):
        return False

    soma = sum(int(cpf[i]) * (10 - i) for i in range(9))
    digito1 = (soma * 10 % 11) % 10

    soma = sum(int(cpf[i]) * (11 - i) for i in range(10))
    digito2 = (soma * 10 % 11) % 10

    return digito1 == int(cpf[9]) and digito2 == int(cpf[10])

# Endpoint para cadastro (Create)
@app.route('/pessoas', methods=['POST'])
def cadastrar_pessoa():
    data = request.json

    if not data.get('nome_completo') or not data.get('cpf'):
        return jsonify({"erro": "Nome completo e CPF são obrigatórios."}), 400

    if not validar_cpf(data.get('cpf')):
        return jsonify({"erro": "CPF inválido."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            INSERT INTO pessoas (nome_completo, data_nascimento, endereco, cpf, estado_civil)
            VALUES (%s, %s, %s, %s, %s)
        ''', (data['nome_completo'], data['data_nascimento'], data['endereco'], data['cpf'], data['estado_civil']))

        conn.commit()
        pessoa_id = cursor.lastrowid

    except mysql.connector.IntegrityError:
        return jsonify({"erro": "CPF já cadastrado."}), 400

    finally:
        cursor.close()
        conn.close()

    return jsonify({"id": pessoa_id, **data}), 201

# Endpoint para listar as pessoas (Read)
@app.route('/pessoas', methods=['GET'])
def listar_pessoas():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute('SELECT * FROM pessoas')
    pessoas = cursor.fetchall()

    cursor.close()
    conn.close()

    return jsonify(pessoas), 200

# Endpoint para atualizar pessoa (Update)
@app.route('/pessoas/<id>', methods=['PUT'])
def atualizar_pessoa(id):
    data = request.json

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM pessoas WHERE id = %s', (id,))
    pessoa = cursor.fetchone()

    if not pessoa:
        return jsonify({"erro": "Pessoa não encontrada."}), 404

    cursor.execute('''
        UPDATE pessoas
        SET nome_completo = %s, data_nascimento = %s, endereco = %s, cpf = %s, estado_civil = %s
        WHERE id = %s
    ''', (data.get('nome_completo', pessoa[1]), data.get('data_nascimento', pessoa[2]),
          data.get('endereco', pessoa[3]), data.get('cpf', pessoa[4]), data.get('estado_civil', pessoa[5]), id))

    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"id": id, **data}), 200

# Endpoint para deletar pessoa (Delete)
@app.route('/pessoas/<id>', methods=['DELETE'])
def excluir_pessoa(id):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM pessoas WHERE id = %s', (id,))
    pessoa = cursor.fetchone()

    if not pessoa:
        return jsonify({"erro": "Pessoa não encontrada."}), 404

    cursor.execute('DELETE FROM pessoas WHERE id = %s', (id,))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({"mensagem": "Pessoa excluída com sucesso."}), 200

if __name__ == '__main__':
    app.run(debug=True)
