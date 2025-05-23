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
    document.querySelectorAll('input[name="availableFilter"]').forEach(checkboxAvailability => checkboxAvailability.checked = true);
    displayProducts();
});

clearFilter.addEventListener('click', () => location.reload());

buttonFilter.addEventListener('click', () => {
    const selectedCategory = categorySelect.value;
    const selectedAvailability = Array.from(
        document.querySelectorAll('input[name="availableFilter"]:checked')
    ).map(input => input.value);
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

function displayProducts(category = "", availability = ["available", "unavailable"]) {
    const categoryDivs = document.querySelectorAll('#productContainerDisplay > div');
    categoryDivs.forEach(div => {
        div.style.display = "none";
        div.innerHTML = `<h2>${div.id}</h2>`;
    });
    const filteredProducts = products.filter(product =>
        checkFilters(category, availability, product)
    );
    if (filteredProducts.length === 0) {
        divProducts.innerHTML = "<p>Nenhum produto encontrado com esses filtros.</p>";
        return;
    }
    filteredProducts.forEach(product => {
        const categoryDiv = document.getElementById(product.categoria);
        if (categoryDiv) {
            categoryDiv.style.display = "flex";
            categoryDiv.innerHTML += buildHtmlCardProducts(product);
        }
    });
    addHoverEffectToProducts();
}

function checkFilters(category, availabilityArray, product) {
    const matchesCategory = !category || product.categoria === category;
    const matchesAvailability = checkAvailability(availabilityArray, product.disponibilidade);
    return matchesCategory && matchesAvailability;
}

function checkAvailability(availabilityArray, productAvailability) {
    return (
        (productAvailability && availabilityArray.includes("available")) ||
        (!productAvailability && availabilityArray.includes("unavailable"))
    );
}

function buildHtmlCardProducts(product) {
    return `
    <div class="product">
        <h3>${product.nome}</h3>
        <p>R$${product.preco.toFixed(2)}</p>
        <h5>${product.categoria}</h5>
        <h4>${product.disponibilidade ? "Disponível" : "Indisponível"}</h4>
    </div>`;
}

function addHoverEffectToProducts() {
    const cards = document.querySelectorAll('.product');

    cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease';

        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.06)';
            card.style.border = '1.5px solid var(--color-primary)';
            card.style.boxShadow = '0 6px 20px rgba(127, 29, 255, 0.3)';
        });

        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
            card.style.border = '1px solid rgba(127, 29, 255, 0.2)';
            card.style.boxShadow = '0 4px 12px rgba(127, 29, 255, 0.15)';
        });
    });
}
