const cart = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("data.json")
        .then(response => 
response.json()
        )
        .then(products => {
            const productList = document.getElementById('product-list');

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'card';
                card.style.width = '12rem';
                card.innerHTML = `
                    <div class="card-body grid-item"> 
                        <img src="${product.image.thumbnail}" class="card-img-top" alt="${product.name}">
                        <button class="add-to-cart btn btn-primary" data-product='${JSON.stringify(product)}'>Add</button>
                        <h5 class="card-title">${product.name}</h5>
                        <div class="card-text-content d-flex justify-content-center">
                            <p class="card-text">${product.category}</p>
                            <p class="card-price">${product.price} EUR</p>
                        </div>
                    </div>
                `;
                productList.appendChild(card);
            });

            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', addToCart);
            });


            const checkout = document.getElementById("checkout");
            checkout.addEventListener('click', () => {
                if (cart.length === 0) {
                    alert("Add at least one product");
                } else {
                    alert("Checkout completed successfully");
                }
            });
        })
});

function addToCart(event) {
    const button = event.target;
    const product = JSON.parse(button.getAttribute('data-product'));

    const existingProductIndex = cart.findIndex(item => item.name === product.name);

    if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    console.log('Product added to cart:', product);
    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    console.log('Product removed from cart');
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContent = document.getElementById('cart-content');
    const cartAmount = document.getElementById('cart-amount');
    const checkout = document.getElementById("checkout");

    cartContent.innerHTML = ''; 

    const cartCount = cart.length;
    cartAmount.textContent = `Your Cart (${cartCount})`;

    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item d-flex align-items-center';
        cartItem.innerHTML = `
            <p>${product.name}</p>
            <p class="text-muted me-3 mb-0">X${product.quantity}</p>
            <p class="text-muted me-3 mb-0">${product.price.toFixed(2)} EUR</p>
            <button class="btn btn-danger btn-sm ms-3" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartContent.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    document.getElementById('total-price').textContent = `Total Price: ${totalPrice.toFixed(2)} EUR`;
}
