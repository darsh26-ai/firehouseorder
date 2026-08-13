// ===============================
// ONLINE ORDERING SYSTEM
// ===============================

let cart = [];

let orderType = "Pickup";


// ===============================
// ADD TO CART
// ===============================

function addToCart(name, price) {

  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  openCart();
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  cartCount.textContent = totalItems;

  cartTotal.textContent =
    "$" + totalPrice.toFixed(2);


  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        <div>🥪</div>
        <h3>Your cart is empty</h3>
        <p>Add something delicious from the menu.</p>
      </div>
    `;

    return;
  }


  cartItems.innerHTML = "";


  cart.forEach((item, index) => {

    const itemElement = document.createElement("div");

    itemElement.className = "cart-item";

    itemElement.innerHTML = `

      <div>

        <h4>${item.name}</h4>

        <div class="cart-item-price">
          $${(item.price * item.quantity).toFixed(2)}
        </div>

      </div>


      <div class="quantity-controls">

        <button onclick="changeQuantity(${index}, -1)">
          −
        </button>

        <strong>
          ${item.quantity}
        </strong>

        <button onclick="changeQuantity(${index}, 1)">
          +
        </button>

      </div>

    `;

    cartItems.appendChild(itemElement);

  });

}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(index, amount) {

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

  document
    .getElementById("cartOverlay")
    .classList.add("open");

}


// ===============================
// CLOSE CART
// ===============================

function closeCart(event) {

  if (
    event &&
    event.target !== document.getElementById("cartOverlay")
  ) {
    return;
  }

  document
    .getElementById("cartOverlay")
    .classList.remove("open");

}


// ===============================
// ORDER TYPE
// ===============================

function setOrderType(type, button) {

  orderType = type;

  document
    .querySelectorAll(".order-option")
    .forEach(option => {
      option.classList.remove("active");
    });

  button.classList.add("active");

  document.getElementById(
    "selectedOrderType"
  ).textContent = type;

}


// ===============================
// MENU FILTER
// ===============================

function filterMenu(category, button) {

  document
    .querySelectorAll(".category")
    .forEach(item => {
      item.classList.remove("active");
    });

  button.classList.add("active");


  const cards =
    document.querySelectorAll(".menu-card");


  cards.forEach(card => {

    if (
      category === "all" ||
      card.dataset.category === category
    ) {

      card.style.display = "";

    } else {

      card.style.display = "none";

    }

  });

}


// ===============================
// CHECKOUT
// ===============================

function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty. Please add an item first.");

    return;
  }

  document
    .getElementById("checkoutModal")
    .classList.add("open");

}


// ===============================
// CLOSE CHECKOUT
// ===============================

function closeCheckout() {

  document
    .getElementById("checkoutModal")
    .classList.remove("open");

}


// ===============================
// SUBMIT DEMO ORDER
// ===============================

function submitOrder(event) {

  event.preventDefault();

  const successMessage =
    document.getElementById("successMessage");


  successMessage.innerHTML = `
    ✓ Demo order received!<br>
    <small>
      Order type: ${orderType}
    </small>
  `;


  cart = [];

  updateCart();


  setTimeout(() => {

    closeCheckout();

    document
      .getElementById("cartOverlay")
      .classList.remove("open");

    successMessage.innerHTML = "";

  }, 3000);

}


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  updateCart();

});
