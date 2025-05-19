import { products } from "./products.js";

const divProducts = document.getElementById('productContainerDisplay');

function displayProducts() {
    let html = '';
    products.forEach(product => {
        html += `
        <div class="product">
            <h2>${product.nome}</h2>
            <img src="${product.imagem}" alt="Imagem">
            <p>R$${product.preco}</p>
            <h5>${product.categoria}</h5>
            <h4>${product.disponibilidade ? "Disponível" : "Indisponível"}</h4>
        </div>`;
    });
    divProducts.innerHTML = html;
}

displayProducts();

console.log(products);