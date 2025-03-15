// script.js

// Variables globales
let cart = [];
const cartPopup = document.querySelector('.cart-popup');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartCount = document.querySelector('#cart-count');

// Funciones del carrito de compras
document.querySelectorAll('.dropdown-menu a').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Evita que el enlace recargue la página
        // Obtiene la categoría seleccionada
        const selectedCategory = this.getAttribute('data-category');
        // Muestra/oculta los productos según la categoría seleccionada
        document.querySelectorAll('.product').forEach(product => {
            if (product.getAttribute('data-category') === selectedCategory) {
                product.style.display = 'block'; // Muestra el producto
            } else {
                product.style.display = 'none'; // Oculta el producto
            }
        });
    });
});

// Funciones del carrito de compras
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}

// Función para agregar productos al carrito
function addToCart(productId, name, price) {
    cart.push({ id: productId, name, price });
    updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Funciones para abrir y cerrar el popup del carrito
function openCart() {
    cartPopup.classList.add('active');
}

function closeCart() {
    cartPopup.classList.remove('active');
}

// Función para comprar por WhatsApp
// IMPORTANTE: Reemplaza el número de teléfono con tu número de WhatsApp
function buyViaWhatsApp() {
    // Cambia este número por tu número de WhatsApp (con código de país)
    const phoneNumber = '+573161268717';
    
    // Construye el mensaje del pedido
    let message = 'Hola! Me interesa hacer una orden:\n\n';
    cart.forEach(item => {
        message += `- ${item.name}: $${item.price.toFixed(2)}\n`;
    });
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    message += `\nTotal: $${total.toFixed(2)}`;
    
    // Codifica el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abre WhatsApp con el mensaje predefinido
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
}

// Event Listeners para los botones de "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.target.closest('.product-card');
        const id = parseInt(product.dataset.id);
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);
        addToCart(id, name, price);
    });
});
