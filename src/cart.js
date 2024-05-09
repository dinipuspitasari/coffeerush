let shoppingCart = document.getElementById("cart-product");
let total = document.getElementById("final-total");
let cartTotal = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateCartItems = () => {
    if (cart.length !== 0){
        return (shoppingCart.innerHTML = cart.map((x) => {
            let {id, item} = x;
            let search = productData.find((y) => y.id === id) || [];
            return`
            <div class="product-details">
                <div class="desc">
                    <div class="desc-detail">
                        <img class="img-cart" width="100px" src="${search.img}" alt="">
                        <div class="desc-harga">
                            <h4>${search.name}</h4>
                            <p>${toRupiah(search.price, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0 })}</p>
                        </div>
                    </div>
                </div>
                <div class="qty">
                    <div class="qty-detail">
                        <button class="decrement" onclick="decrement(${id})" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </button>
                        <p id="${id}">${item}</p>
                        <button class="increment" onclick="increment(${id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="total">
                    <div class="total-detail">
                        <p>${toRupiah(item * search.price, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0})}</p>
                    </div>
                </div>
                <svg class="svg-cart" onclick="removeItem(${id})" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                </svg>
            </div>
            `
        })
        .join(""));
    } else {
        shoppingCart.innerHTML = `
        <h3 class="heading">Keranjang anda kosong!</h3>
        <div class="container-empty-cart">
            <a href="product.html">
                <button>
                    <p>Cek Produk</p>
                </button>
            </a>

            <a href="index.html">
                <button>
                    <p>Kembali ke Beranda</p>
                </button>
            </a>
        </div>
        `;
        cartTotal.classList.add("empty-cart")
    };
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        cart.push({
        id: selectedItem.id,
        item: 1,
    });
    } else {
        search.item += 1;
    }

    generateCartItems();
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(cart));
};

let decrement = (id) => {
    let selectedItem = id;
    let search = cart.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    cart = cart.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(cart));
};

let update = (id) => {
    let search = cart.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let selectedItem = id;
    cart = cart.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    localStorage.setItem("data", JSON.stringify(cart));
};

let clearCart = () => {
    cart = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(cart));
    // calculation();
};

let TotalAmount = () => {
    if (cart.length !== 0) {
        let amount = cart
        .map((x) => {
            let { item, id } = x;
            let search = productData.find((y) => y.id === id) || [];

            return item * search.price;
        })
        .reduce((x, y) => x + y, 0);
        // console.log(amount);
        total.innerHTML = `
            <h4>Total</h4>
            <p>${toRupiah(amount)}</p>
        `;
    } else return;
};

TotalAmount();

// modal

let modal = document.getElementById("my-modal");

let exitModal = document.getElementById("exit-modal");

let openModal = () => {
    modal.style.display= "block";
}

exitModal.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}