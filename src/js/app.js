import { products } from "./products.js";

const divProducts = document.getElementById('productContainerDisplay');
const categorySelect = document.getElementById('category');
const ascendingOrderPrice = document.getElementById('ascendingOrder');
const descendingOrderPrice = document.getElementById('descendingOrder');
const buttonFilter = document.getElementById('buttonFilter');
const allProducts = document.getElementById('listAllProducts');
const clearFilter = document.getElementById('clearFilters');

allProducts.addEventListener('click', () => {
    categorySelect.value = "";
    document.querySelector('input[name="availableFilter"][value="all"]').checked = true;
    displayProducts();
});

clearFilter.addEventListener('click', () => location.reload());

buttonFilter.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    const selectedAvailability = document.querySelector('input[name="availableFilter"]:checked').value;
    displayProducts(selectedCategory, selectedAvailability);
});

ascendingOrderPrice.addEventListener('click', (event) => {
    event.preventDefault();
    products.sort((firstElementToCompare, secondElementToCompare) => 
        firstElementToCompare.preco - secondElementToCompare.preco);
    buttonFilter.click();
});

descendingOrderPrice.addEventListener('click', (event) => {
    event.preventDefault();
    products.sort((firstElementToCompare, secondElementToCompare) => 
        secondElementToCompare.preco - firstElementToCompare.preco);
    buttonFilter.click();
});

function displayProducts(category = "", availability = "all") {
    let allProductsFilteredInHtml = products
        .filter((product) => {
            return checkFilters(category, availability, product);
        })
        .map(buildHtmlCardProducts)
        .join("");
    divProducts.innerHTML = allProductsFilteredInHtml || "<p>Nenhum produto encontrado com esses filtros.</p>";
}

function checkFilters(category, availability, product) {
    const matchesCategory = !category || product.categoria === category;
    const matchesAvailability = checkAvailability(availability, product.disponibilidade);
    return matchesCategory && matchesAvailability;
}

function checkAvailability(availability, productAvailability) {
    return availability === "all" || 
    (availability === "available" && productAvailability) ||
    (availability === "unavailable" && !productAvailability);
}

function buildHtmlCardProducts(product) {
    return `
    <div class="product">
        <h2>${product.nome}</h2>
        <img src="${product.imagem}" alt="Imagem">
        <p>R$${product.preco.toFixed(2)}</p>
        <h5>${product.categoria}</h5>
        <h4>${product.disponibilidade ? "Disponível" : "Indisponível"}</h4>
    </div>`;
}
