document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  // ADD TO CART - only run on product pages
  if (path.includes("index.html") || path.includes("products.html")) {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productCard = button.closest(".product-card");
        const name = productCard.querySelector("h3").textContent;
        const priceText = productCard.querySelector(".price").textContent;
        const price = parseInt(priceText.match(/\d+/)[0]);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find((item) => item.name === name);
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ name, price, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
      });
    });
  }

  // DISPLAY CART - only run on cart.html
  if (path.includes("cart.html")) {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotalDiv = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!cartItemsDiv || !cartTotalDiv || !checkoutBtn) return;

    cartItemsDiv.innerHTML = "";

    if (cartData.length === 0) {
      cartItemsDiv.innerHTML = "<p>No items in your cart.</p>";
      checkoutBtn.style.display = "none";
      return;
    }

    let total = 0;

    cartData.forEach((item, index) => {
      total += item.price * item.quantity;

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("product-card");
      itemDiv.innerHTML = `
        <h3>${item.name}</h3>
        <p>Qty: ${item.quantity} kg</p>
        <p>Price: ₹${item.price * item.quantity}</p>
        <button class="btn tertiary-btn" data-index="${index}">Remove</button>
      `;
      cartItemsDiv.appendChild(itemDiv);
    });

    cartTotalDiv.innerHTML = `<h3>Total: ₹${total}</h3>`;

    document.querySelectorAll(".tertiary-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cartData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cartData));
        location.reload();
      });
    });

    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout...");
    });
  }
});
