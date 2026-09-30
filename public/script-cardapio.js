document.addEventListener("DOMContentLoaded", () => {

    const URL_API = "http://localhost:3000/api/cardapio";
    const containerCards = document.getElementById("container-cards");

    async function carregarCardapio() {

        try {
            const resposta = await fetch(URL_API);
            if (!resposta.ok) {
                throw new Error("Erro ao buscar o cardápio");
            }
            const cafes = await resposta.json();
            containerCards.innerHTML = "";
            cafes.forEach((cafe) => {
                const card = document.createElement("article");
                card.classList.add("card");
                card.innerHTML = `
                    <img src="${cafe.imagem}" alt="${cafe.nome}">
                    <h3>${cafe.nome}</h3>
                    <p>${cafe.descrição}</p>
                    <button>Pedir Agora</button>
                `;
                containerCards.appendChild(card);
            });

        } catch (erro) {
            console.error("Erro ao carregar o cardápio:", erro);
            containerCards.innerHTML = `
                <p>Não foi possível carregar o cardápio no momento.</p>
            `;
        }
    }
    carregarCardapio();
});