 const products=[
    {   
        id:"1",
        nombre: "producto-1",
        imagen:'images/imagen1.png',
        precio:1000
    },

    {
        id:"2",
        nombre: "producto-2",
        imagen: "images/imagen2.png",
        precio:2000
    },
    {
        id:"3",
        nombre: "producto-3",
        imagen: "images/imagen3.png",
        precio:3000
    }
    
]
function renderProducts() {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <h2>${product.nombre}</h2>
            <img src="${product.imagen}" alt="${product.nombre}">
            <p>Precio: $${product.precio}</p>
            <button data-id="${product.id}">Agregar al Carrito</button>
        `;
        productsContainer.appendChild(productElement);
    });

    productsContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const productId = event.target.getAttribute('data-id');
            addToCart(productId);
        }
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id == productId);
    if (existingProduct) {
        existingProduct.quantity++;
        existingProduct.subTotal += product.precio;
    } else {
        cart.push({ ...product, quantity: 1, subTotal: product.precio });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.nombre} ha sido añadido al carrito`);
}

function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        let total = 0;
        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <h3>${product.nombre}</h3>
                <img src="${product.imagen}" alt="${product.nombre}">
                <p>Precio: $${product.precio}</p>
                <p>Cantidad: ${product.quantity}</p>
                <p>Subtotal: $${product.subTotal}</p>
                <button data-id="${product.id}">Eliminar del Carrito</button>
            `;
            cartContainer.appendChild(cartItem);
            total += product.subTotal;
        });

        const totalElement = document.createElement('div');
        totalElement.className = 'total';
        totalElement.innerHTML = `<h2>Total: $${total}</h2>`;
        cartContainer.appendChild(totalElement);

        cartContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const productId = event.target.getAttribute('data-id');
                removeFromCart(productId);
            }
        });
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(product => product.id == productId);
    if (productIndex !== -1) {
        cart[productIndex].quantity--;
        cart[productIndex].subTotal -= cart[productIndex].precio;
        if (cart[productIndex].quantity === 0) {
            cart.splice(productIndex, 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('products-container')) {
        renderProducts();
    }
    if (document.getElementById('cart-container')) {
        renderCart();
    }

    const purchaseButton = document.getElementById('purchase-button');
    if (purchaseButton) {
        purchaseButton.addEventListener('click', () => {
            alert('Compra exitosa');
            localStorage.removeItem('cart');
            renderCart();
        });
    }
});


    



