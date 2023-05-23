var url2 = "https://dummyjson.com/products";
var url = "https://jsonplaceholder.typicode.com/albums/2/photos";

async function fetchWithString() {
    try {
        var response = await db.execute(`SELECT * FROM csc317db.posts WHERE fk_userid=${req.session.user.userid};`); //Change this line to gain data from posts table
        var data = await response.json();
        var htmlString = data.reduce(function(prev, post){
            return prev + `<div id="product-list" class="product-list grid-container">
    <a href="/posts/{{this.id}}">
        <img src="/{{this.thumbnail}}">
    </a>
    <p class="video-username">{{this.username}}</p>
    <p class="video-date">{{this.createdAt}}</p>
    <p class="video-title">{{this.title}}</p>
    <p class="video-description">{{this.description}}</p>
</div>`
        }, "");
        // document.getElementById("product-list").innerHTML = htmlString;
        // let posts = document.getElementsByClassName("product-card");
        // [...posts].forEach(function(ele){
        //     ele.addEventListener('click', function(ev){
        //         fadeOut(ev);
        //     })
        // })
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