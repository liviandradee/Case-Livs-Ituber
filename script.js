// URL da API
const apiUrl = "http://localhost:5000/pessoas";

// Função para cadastrar pessoa
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
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        if (status === 201) {
            console.log('Pessoa cadastrada:', body);
            listarPessoas();  // Atualiza a lista de pessoas
            window.alert('Cadastro realizado com sucesso!');
            document.getElementById('form-cadastrar').reset();
        } else {
            console.error('Erro ao cadastrar pessoa:', body);
            window.alert(`Erro: ${body.erro}`);
        }
    })
    .catch((error) => {
        console.error('Erro ao cadastrar pessoa:', error);
        window.alert('Erro ao cadastrar pessoa. Tente novamente.');
    });
});

// Função para atualizar pessoa
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
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        if (status === 200) {
            console.log('Pessoa atualizada:', body);
            listarPessoas();  // Atualiza a lista de pessoas
            window.alert('Atualização realizada com sucesso!');
        } else {
            console.error('Erro ao atualizar pessoa:', body);
            window.alert(`Erro: ${body.erro}`);
        }
    })
    .catch((error) => {
        console.error('Erro ao atualizar pessoa:', error);
    });
});

// Função para deletar pessoa
function deletarPessoa(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json().then(data => ({ status: response.status, body: data })))
    .then(({ status, body }) => {
        if (status === 200) {
            console.log('Pessoa deletada:', body);
            listarPessoas();  // Atualiza a lista de pessoas após a exclusão
            window.alert('Pessoa excluída com sucesso!');
        } else {
            console.error('Erro ao deletar pessoa:', body);
            window.alert(`Erro: ${body.erro}`);
        }
    })
    .catch((error) => {
        console.error('Erro ao deletar pessoa:', error);
        window.alert('Erro ao deletar pessoa. Tente novamente.');
    });
}

// Função para listar pessoas cadastradas
function listarPessoas() {
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const listaPessoasDiv = document.getElementById('lista-pessoas');
        listaPessoasDiv.innerHTML = '';

        if (data.length === 0) {
            listaPessoasDiv.innerHTML = '<p class="centralizado">Nenhuma pessoa cadastrada.</p>';
        } else {
            data.forEach(pessoa => {
                listaPessoasDiv.innerHTML += `
                    <div>
                        <h3>${pessoa.nome_completo} (ID: ${pessoa.id})</h3>
                        <p>Data de Nascimento: ${pessoa.data_nascimento}</p>
                        <p>Endereço: ${pessoa.endereco}</p>
                        <p>CPF: ${pessoa.cpf}</p>
                        <p>Estado Civil: ${pessoa.estado_civil}</p>
                        <button onclick="deletarPessoa(${pessoa.id})">Excluir</button>
                    </div>
                    <hr>
                `;
            });
        }
    })
    .catch((error) => {
        console.error('Erro ao listar pessoas:', error);
        window.alert('Erro ao listar pessoas. Tente novamente.');
    });
}

// Listar pessoas ao carregar a página
listarPessoas();
