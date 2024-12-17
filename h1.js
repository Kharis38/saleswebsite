document.addEventListener("DOMContentLoaded", function () {
    const cartButtons = document.querySelectorAll(".add-to-cart");

    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Item added to cart!");
            // You can also add more complex cart functionality here
        });
    });
    function addToCart(productId) {
        // Store product IDs in local storage (or use a more robust solution)
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(productId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Redirect to cart page
        window.location.href = "cart.html";
    }
    // Initialize an empty cart array
    let cart = [];

    // Add event listeners to all "Add to Cart" buttons
    document.addEventListener("DOMContentLoaded", function () {
        const addToCartButtons = document.querySelectorAll(".add-to-cart");

        addToCartButtons.forEach((button, index) => {
            button.addEventListener("click", function () {
                const product = getProductDetails(button);
                addToCart(product);
            });
        });
    });

    // Function to get product details
    function getProductDetails(button) {
        const productDiv = button.closest(".product");
        const name = productDiv.querySelector("h3").textContent;
        const priceText = productDiv.querySelector("p").textContent;
        const price = parseFloat(priceText.replace("GH₵", "").trim());

        return { name, price, quantity: 1 };
    }

    // Function to add product to cart
    function addToCart(product) {
        const existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity += 1; // Increase quantity if product exists
        } else {
            cart.push(product); // Add new product to the cart
        }

        updateCartUI();
    }

    // Function to update cart UI and show items
    function updateCartUI() {
        let cartContent = "";
        let total = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
            cartContent += `<li>${item.name} - GH₵ ${item.price} x ${item.quantity}</li>`;
        });

        // Update cart section
        document.querySelector("#cart-items").innerHTML = cartContent;
        document.querySelector("#cart-total").textContent = total.toFixed(2);
    }

});
