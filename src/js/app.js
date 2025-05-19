import { products } from "./products.js";

const divProducts = document.getElementById('productContainerDisplay');
const categorySelect = document.getElementById('category');
const buttonFilter = document.getElementById('buttonFilter');
const allProducts = document.getElementById('listAllProducts');

// Exibe todos os produtos inicialmente
displayProducts();

allProducts.addEventListener('click', () => displayProducts());

buttonFilter.addEventListener('click', function () {
    const selectedCategory = categorySelect.value;
    const selectedAvailability = document.querySelector('input[name="availableFilter"]:checked').value;

    displayProducts(selectedCategory, selectedAvailability);
});

function displayProducts(category = "", availability = "all") {
    let html = '';

    products.forEach(product => {
        const matchesCategory = !category || product.categoria === category;

        const matchesAvailability =
            availability === "all" ||
            (availability === "available" && product.disponibilidade) ||
            (availability === "unavailable" && !product.disponibilidade);

        if (matchesCategory && matchesAvailability) {
            html += `
            <div class="product">
                <h2>${product.nome}</h2>
                <img src="${product.imagem}" alt="Imagem">
                <p>R$${product.preco.toFixed(2)}</p>
                <h5>${product.categoria}</h5>
                <h4>${product.disponibilidade ? "Disponível" : "Indisponível"}</h4>
            </div>`;
        }
    });

    divProducts.innerHTML = html || "<p>Nenhum produto encontrado com esses filtros.</p>";
}
