document.addEventListener("DOMContentLoaded", function () {
    let meusSeguidores = []

    const perfilDiv = document.getElementById('perfil')
    const seguidoresDiv = document.getElementById('seguidores-gh')
    const linkHome = document.getElementById('link-home')

    function carregarDados(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Erro ao carregar:', error))
    }

    function exibirPerfil(data) {
        perfilDiv.innerHTML = `
            <h2 class="nome">${data.name}</h2>
            <img class="perfil-img" src="${data.avatar_url}" alt="Avatar">
            <p class="bio">${data.bio}</p>
        `
    }

    function exibirSeguidores(seguidores) {
        seguidoresDiv.innerHTML = seguidores.map(follower => `
            <div class="seguidor" data-username="${follower.login}">
                <img src="${follower.avatar_url}" alt="avatar${follower.login}">
                <p class="seguidor-nome">${follower.login}</p>
            </div>
        `).join('')
    }

    function carregarPerfilEseguidores(url) {
        carregarDados(url, data => {
            exibirPerfil(data)
            carregarDados(data.followers_url, seguidores => {
                meusSeguidores = seguidores
                exibirSeguidores(meusSeguidores)
            })
        })
    }

    function inicializar() {
        carregarPerfilEseguidores('https://api.github.com/users/DavidLaurethAL')
        atualizarLinkHome('Home')
    }

    seguidoresDiv.addEventListener('click', function (event) {
        const seguidorDiv = event.target.closest('.seguidor')
        if (seguidorDiv) {
            const username = seguidorDiv.getAttribute('data-username')
            carregarPerfilEseguidores(`https://api.github.com/users/${username}`)
            atualizarLinkHome('Voltar')
        }
    })

    linkHome.addEventListener('click', function () {
        inicializar()
    })

    function atualizarLinkHome(texto) {
        linkHome.textContent = texto
    }

    inicializar()
})
