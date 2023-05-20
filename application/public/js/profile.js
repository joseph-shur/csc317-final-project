var url2 = "https://dummyjson.com/products";
var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

async function fetchWithString() {
    try {
        var response = await fetch(url);
        var data = await response.json();
        var htmlString = data.reduce(function(prev, product){
            return prev + `<div id="product-card" class="product-card grid-item">
                    <img class="product-img" src="${product.thumbnailUrl}">
                    <div class="product info">
                        <p class="product-title">${product.title}</p>
                        <p class="product-price">${product.url}</p>
                    </div>
            </div>
        </div>`
        }, "");
        document.getElementById("product-list").innerHTML = htmlString;
        let cards = document.getElementsByClassName("product-card");
        [...cards].forEach(function(ele){
            ele.addEventListener('click', function(ev){
                fadeOut(ev);
            })
        })
    } catch (error) {
        console.log(error);
    }
}

function fadeOut(ev) {
    var evct = ev.currentTarget;
    evct.style.transition = 'opacity 2s';
    evct.style.opacity = 0;
    let timer = setInterval(function(){
        evct.remove();
        clearInterval(timer);
    }, 2000)
}
fetchWithString();