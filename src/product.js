let productTart = document.getElementById("container-product-tart");
let filteredTart = productData.filter((productData) => productData.type == "tart"
);

let productBolu = document.getElementById("container-product-bolu");
let filteredBolu = productData.filter((productData) => productData.type == "bolu"
);

let productRoti = document.getElementById("container-product-roti");
let filteredRoti = productData.filter((productData) => productData.type == "roti"
);

let productKueKering = document.getElementById("container-product-kue-kering");
let filteredKueKering = productData.filter((productData) => productData.type == "kue kering"
);

let generateTart = () => {
    return (productTart.innerHTML = filteredTart
    .map((x) => {
        let { id, name, price, img } = x;
        return `
        <div id=product-id-${id} class="product">
            <img  class="img-product" width="200px" src="${img}" alt="">
            <h3 class="product-name">${name}</h3>
            <p class="price">${toRupiah(price, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0})}</p>    
            <button id="${id}" onclick="addToCart(${id})" class="button-cart">Masukkan ke keranjang</button>
        </div>
        `;
    })
    .join(""));
};

// bolu
let generateBolu = () => {
    return (productBolu.innerHTML = filteredBolu
    .map((x) => {
        let { id, name, price, img } = x;
        return `
        <div id=product-id-${id}} class="product">
            <img  class="img-product" width="200px" src=${img} alt="">
            <h3 class="product-name">${name}</h3>
            <p class="price">${toRupiah(price, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0})}</p>    
            <button id="${id}" onclick="addToCart(${id})" class="button-cart">Masukkan ke keranjang</button>
        </div>
        `;
    })
    .join(""));
};

// roti
let generateRoti = () => {
    return (productRoti.innerHTML = filteredRoti
    .map((x) => {
        let { id, name, price, img } = x;
        return `
        <div id=product-id-${id}} class="product">
            <img  class="img-product" width="200pz" src=${img} alt="">
            <h3 class="product-name">${name}</h3>
            <p class="price">${toRupiah(price, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0})}</p>    
            <button id="${id}" onclick="addToCart(${id})" class="button-cart">Masukkan ke keranjang</button>
        </div>
        `;
    })
    .join(""));
};

// kue kering
let generateKueKering = () => {
    return (productKueKering.innerHTML = filteredKueKering
    .map((x) => {
        let { id, name, price, img } = x;
        return `
        <div id=product-id-${id}} class="product">
            <img  class="img-product" width="200px" src=${img} alt="">
            <h3 class="product-name">${name}</h3>
            <p class="price">${toRupiah(price, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0})}</p>    
            <button id="${id}" onclick=addToCart(${id})  class="button-cart">Masukkan ke keranjang</button>
        </div>
        `;
    })
    .join(""));
};

generateTart();
generateBolu();
generateRoti();
generateKueKering();

let cart = JSON.parse(localStorage.getItem("data")) || [];

// add to cart
let addToCart = (id) => {
let selectedItem = id;
let search = cart.find((x) => x.id === selectedItem.id);

if (search === undefined) {
    cart.push({
        id: selectedItem.id,
        item: 1,
    });
    } else {
    Swal.fire({
        icon: "info",
        text: "Item sudah ada di keranjang!",
        iconColor: "#f47c7c",
        confirmButtonColor: "#f47c7c",
    });
    }
    calculation();
    localStorage.setItem("data", JSON.stringify(cart));
};

// calculation shopping cart
let calculation = () => {
    let cartIcon = document.getElementById("cart-amount");
    cartIcon.innerHTML = cart.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
