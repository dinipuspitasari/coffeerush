let dataInvoice = document.getElementById("inv-product-list");
let totalInv = document.getElementById("total-inv");
let unique = Math.random() * 2;
let uniqueID = document.getElementById("unique-id");

let cart = JSON.parse(localStorage.getItem("data"));

let generateDataInvoice = () => {
    return (dataInvoice.innerHTML = cart.map((x) => {
        let { id, name, img, item} = x;
        let search = productData.find((y) => y.id === id)
        return `
        <div id="${id}" class="container-satu-table table-margin">
            <div class="produk-thumbnail">
                <img width="70px" src=${search.img} alt="">
                <p>${search.name}</p>
            </div>
            <div class="jumlah-produk">
                <p>${item}</p>
            </div>
            <div class="harga-produk">
                <p>${toRupiah(item * search.price, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0})}</p>
            </div>
        </div>
        `
    })
    .join(""));
}

generateDataInvoice();

let totalBill = () => {
    let amount = cart.map((x) => {
        let {item, id} = x;
        let search = productData.find((y) => y.id === id);

        return item * search.price;
    })
    .reduce((x, y) => x + y, 0);

    totalInv.innerHTML = `
        <p>${toRupiah(amount, {spaceBeforeUnit: true, dot: '.', floatingPoint: 0})}</p>
    `;
};

totalBill();

let generateUniqueId = () => {
    return uniqueID.innerHTML = 'id transaksi ' + unique;
}

generateUniqueId();

let saveInputValue = () => {
    let nama = document.getElementById("nama").value;
    let nohp = document.getElementById("nohp").value;
    let email = document.getElementById("email").value;
    let alamat = document.getElementById("alamat").value;
    let metodeBayar = document.getElementById("metode-bayar").value;
    let pengiriman = document.getElementById("metode-kirim").value;

    sessionStorage.nama = nama.value;
    sessionStorage.nohp = nohp.value;
    sessionStorage.email = email.value;
    sessionStorage.alamat = alamat.value;
    sessionStorage.metodeBayar = metodeBayar.value;
    sessionStorage.pengiriman = pengiriman.value;
}
