document.addEventListener("DOMContentLoaded", function() {
    const cartIcon = document.getElementById("cart-icon");
    const closeCartIcon = document.getElementById("close-cart");
    const cart = document.querySelector(".cart");
    const cartContent = document.querySelector(".cart-content");
    const cartTotal = document.querySelector(".total-price");
    const buyBtn = document.querySelector(".btn-buy");
    const products = document.querySelectorAll(".product-box");
    
    let totalPrice = 0;

    // Function to update total price
    function updateTotalPrice() {
        cartTotal.textContent = "$" + totalPrice.toFixed(2);
    }

    // Event listener for adding items to cart
    products.forEach(function(product) {
        const addCartBtn = product.querySelector(".add-cart");
        
        addCartBtn.addEventListener("click", function() {
            const productImgSrc = product.querySelector(".product-img").src;
            const productTitle = product.querySelector(".product-title").textContent;
            const productPrice = parseFloat(product.querySelector(".price").textContent.replace("$", ""));
            
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-box");

            const cartItemContent = `
                <img src="${productImgSrc}" alt="" class="cart-img">
                <div class="detail-box">
                    <div class="cart-product-title">${productTitle}</div>
                    <div class="cart-price">$${productPrice.toFixed(2)}</div>
                    <input type="number" value="1" class="cart-quantity">
                </div>
                <i class="bi bi-trash cart-remove"></i>
            `;
            cartItem.innerHTML = cartItemContent;
            cartContent.appendChild(cartItem);

            // Update total price
            totalPrice += productPrice;
            updateTotalPrice();
        });
    });

    // Event listener for removing items from cart
    cartContent.addEventListener("click", function(event) {
        if (event.target.classList.contains("cart-remove")) {
            const itemPrice = parseFloat(event.target.previousElementSibling.querySelector(".cart-price").textContent.replace("$", ""));
            totalPrice -= itemPrice;
            event.target.parentElement.remove();
            updateTotalPrice();
        }
    });

    // Event listener for opening/closing cart
    cartIcon.addEventListener("click", function() {
        cart.classList.toggle("show-cart");
    });

    closeCartIcon.addEventListener("click", function() {
        cart.classList.remove("show-cart");
    });

    // Event listener for buy button
    buyBtn.addEventListener("click", function() {
        alert("Thank you for your purchase!");
        // Reset total price and cart content
        totalPrice = 0;
        cartContent.innerHTML = "";
        updateTotalPrice();
    });
});