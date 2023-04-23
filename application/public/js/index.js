var url = "https://dummyjson.com/products";
var url2 = "https://jsonplaceholder.typicode.com/albums/2/photo";

async function fetchWithString() {
    try {
        var response = await fetch(url);
        var data = await response.json();
        var htmlString = data.products.reduce(function(prev, product){
            return prev + `<div id="product-card" class="product-card grid-item">
                    <img class="product-img" src="${product.thumbnail}">
                    <div class="product info">
                        <p class="product-title">${product.title}</p>
                        <p class="product-price">${product.price}</p>
                    </div>
            </div>
        </div>`
        }, "");
        document.getElementById("product-list").innerHTML = htmlString;
    } catch (error) {
        console.log(error);
    }
}
fetchWithString();