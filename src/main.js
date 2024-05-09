let cart = JSON.parse(localStorage.getItem("data")) || [];

// calculation
let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();