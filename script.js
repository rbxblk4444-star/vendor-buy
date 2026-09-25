const cart = [];

const buttons = document.querySelectorAll(".product button");
const cartLink = document.querySelector('a[href="#cart"]');

function updateCart() {
  cartLink.textContent = `Cart (${cart.length})`;
}

function getTotal() {
  return cart.reduce((sum, item) => {
    return sum + parseFloat(item.price.replace("€", ""));
  }, 0);
}

function openCheckout() {
  const old = document.querySelector("#checkout-modal");
  if (old) old.remove();

  const modal = document.createElement("div");
  modal.id = "checkout-modal";

  modal.innerHTML = `
    <div class="checkout-window">
      <button class="close-checkout" onclick="closeCheckout()">×</button>

      <p class="eyebrow">VENDOR.BUY</p>
      <h2>CHECKOUT</h2>

      <div class="checkout-summary">
        <h3>YOUR ORDER</h3>

        ${cart.map(item => `
          <div class="checkout-item">
            <span>${item.name}</span>
            <span>${item.price}</span>
          </div>
        `).join("")}

        <div class="checkout-total">
          <span>TOTAL</span>
          <strong>€${getTotal().toFixed(2)}</strong>
        </div>
      </div>

      <form id="checkout-form">
        <label>Email address</label>

        <input
          type="email"
          id="customer-email"
          placeholder="you@example.com"
          required
        >

        <p class="digital-note">
          Your digital product will be delivered to this email address.
          No physical clothing will be shipped.
        </p>

        <button type="submit" class="checkout-submit">
          CONTINUE →
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document
    .querySelector("#checkout-form")
    .addEventListener("submit", function(event) {
      event.preventDefault();

      const email = document.querySelector("#customer-email").value;

      modal.querySelector(".checkout-window").innerHTML = `
        <button class="close-checkout" onclick="closeCheckout()">×</button>

        <p class="eyebrow">VENDOR.BUY</p>
        <h2>ORDER READY</h2>

        <div class="success-message">
          <div class="success-icon">✓</div>

          <h3>THANK YOU</h3>

          <p>
            Your order information has been received.
          </p>

          <p>
            Digital delivery email:
            <strong>${email}</strong>
          </p>

          <p class="digital-note">
            This is a demo checkout. No real payment has been processed.
          </p>

          <button class="checkout-submit" onclick="closeCheckout()">
            BACK TO SHOP
          </button>
        </div>
      `;
    });
}

function closeCheckout() {
  const modal = document.querySelector("#checkout-modal");

  if (modal) {
    modal.remove();
  }
}

function openCart() {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const old = document.querySelector("#cart-modal");

  if (old) {
    old.remove();
  }

  const modal = document.createElement("div");
  modal.id = "cart-modal";

  modal.innerHTML = `
    <div class="cart-window">
      <button class="close-cart" onclick="closeCart()">×</button>

      <p class="eyebrow">YOUR CART</p>
      <h2>CART</h2>

      ${cart.map((item, index) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <span>${item.price}</span>
          </div>

          <button onclick="removeItem(${index})">
            REMOVE
          </button>
        </div>
      `).join("")}

      <div class="cart-total">
        <span>TOTAL</span>
        <strong>€${getTotal().toFixed(2)}</strong>
      </div>

      <button class="checkout-button" onclick="openCheckout()">
        CHECKOUT →
      </button>
    </div>
  `;

  document.body.appendChild(modal);
}

function closeCart() {
  const modal = document.querySelector("#cart-modal");

  if (modal) {
    modal.remove();
  }
}

function removeItem(index) {
  cart.splice(index, 1);

  updateCart();

  closeCart();

  if (cart.length > 0) {
    openCart();
  }
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const product = button.closest(".product");

    const name = product.querySelector("h3").textContent;
    const price = product.querySelector(".bottom span").textContent;

    cart.push({
      name,
      price
    });

    updateCart();

    button.textContent = "ADDED ✓";

    setTimeout(() => {
      button.textContent = "ADD TO CART";
    }, 1000);
  });
});

cartLink.addEventListener("click", event => {
  event.preventDefault();

  openCart();
});

updateCart();
