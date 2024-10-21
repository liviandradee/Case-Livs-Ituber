// URL da API
const apiUrl = "http://localhost:5000/pessoas";

// Função para cadastrar 
document.getElementById('form-cadastrar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const pessoa = {
        nome_completo: document.getElementById('nome_completo').value,
        data_nascimento: document.getElementById('data_nascimento').value,
        endereco: document.getElementById('endereco').value,
        cpf: document.getElementById('cpf').value,
        estado_civil: document.getElementById('estado_civil').value,
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pessoa),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pessoa cadastrada:', data);
        listarPessoas();  // Atualiza a lista de pessoas
    })
    .catch((error) => {
        console.error('Erro ao cadastrar pessoa:', error);
    });
});

// Função para atualizar 
document.getElementById('form-atualizar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const id = document.getElementById('id_atualizar').value;
    
    const pessoaAtualizada = {
        nome_completo: document.getElementById('nome_completo_atualizar').value,
        data_nascimento: document.getElementById('data_nascimento_atualizar').value,
        endereco: document.getElementById('endereco_atualizar').value,
        cpf: document.getElementById('cpf_atualizar').value,
        estado_civil: document.getElementById('estado_civil_atualizar').value,
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(pessoaAtualizada),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pessoa atualizada:', data);
        listarPessoas();  // Atualiza a lista 
    })
    .catch((error) => {
        console.error('Erro ao atualizar pessoa:', error);
    });
});

// Função para deletar 
function deletarPessoa(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pessoa deletada:', data);
        listarPessoas();  // Atualiza a lista de pessoas dps da exclusao
    })
    .catch((error) => {
        console.error('Erro ao deletar pessoa:', error);
    });
}

// Listando as pessoas cadastradas
function listarPessoas() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const listaPessoasDiv = document.getElementById('lista-pessoas');
        listaPessoasDiv.innerHTML = '';

        if (Object.keys(data).length === 0) {
            listaPessoasDiv.innerHTML = '<p class="centralizado">Nenhuma pessoa cadastrada.</p>';
        } else {
            Object.keys(data).forEach(id => {
                const pessoa = data[id];
                listaPessoasDiv.innerHTML += `
                    <div>
                        <h3>${pessoa.nome_completo} (ID: ${id})</h3>
                        <p>Data de Nascimento: ${pessoa.data_nascimento}</p>
                        <p>Endereço: ${pessoa.endereco}</p>
                        <p>CPF: ${pessoa.cpf}</p>
                        <p>Estado Civil: ${pessoa.estado_civil}</p>
                        <button onclick="deletarPessoa(${id})">Excluir</button>
                    </div>
                    <hr>
                `;
            });
        }
    })
    .catch((error) => {
        console.error('Erro ao listar pessoas:', error);
    });
}

// Listar pessoas
listarPessoas();
