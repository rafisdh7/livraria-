const apiBaseUrl = "http://127.0.0.1:5000/livros";

// Funções de exibição e ocultação dos formulários
function mostrarAdicionar() {
    document.getElementById("formulario-adicionar").style.display = "block";
    document.getElementById("formulario-busca").style.display = "none";
    document.getElementById("formulario-atualizar").style.display = "none";
    document.getElementById("formulario-remover").style.display = "none";
}

function listarLivros() {
    fetch(apiBaseUrl)
        .then(response => response.json())
        .then(data => {
            let listaLivros = "<h2>Lista de Livros</h2>";
            data.forEach(livro => {
                listaLivros += `<p>${livro.titulo} - ${livro.autor} - R$ ${livro.preco} - Estoque: ${livro.estoque}</p>`;
            });
            document.getElementById("livros-lista").innerHTML = listaLivros;
        });
}

function buscarLivro() {
    document.getElementById("formulario-busca").style.display = "block";
    document.getElementById("formulario-adicionar").style.display = "none";
    document.getElementById("formulario-atualizar").style.display = "none";
    document.getElementById("formulario-remover").style.display = "none";
}

function buscarLivroPorTitulo() {
    const titulo = document.getElementById("titulo-busca").value;
    fetch(`${apiBaseUrl}/${titulo}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                document.getElementById("livro-busca").innerHTML = data.message;
            } else {
                document.getElementById("livro-busca").innerHTML = `${data.titulo} - ${data.autor} - R$ ${data.preco} - Estoque: ${data.estoque}`;
            }
        });
}

function atualizarEstoque() {
    document.getElementById("formulario-atualizar").style.display = "block";
    document.getElementById("formulario-adicionar").style.display = "none";
    document.getElementById("formulario-busca").style.display = "none";
    document.getElementById("formulario-remover").style.display = "none";
}

function atualizarEstoqueLivro() {
    const titulo = document.getElementById("titulo-estoque").value;
    const estoque = document.getElementById("estoque-novo").value;
    fetch(`${apiBaseUrl}/${titulo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estoque: estoque })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}

function removerLivro() {
    document.getElementById("formulario-remover").style.display = "block";
    document.getElementById("formulario-adicionar").style.display = "none";
    document.getElementById("formulario-busca").style.display = "none";
    document.getElementById("formulario-atualizar").style.display = "none";
}

function removerLivroPorTitulo() {
    const titulo = document.getElementById("titulo-remover").value;
    fetch(`${apiBaseUrl}/${titulo}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
}

function adicionarLivro() {
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const preco = document.getElementById("preco").value;
    const estoque = document.getElementById("estoque").value;

    fetch(apiBaseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, autor, preco, estoque })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });
}
