//genric approach
var all = document.getElementById("all");
var img = document.getElementById("img");
var news = document.getElementById("news");
var video = document.getElementById("video");
var shop = document.getElementById("shop");

var prevElem = "all";


//on search bar
function CheckPassword() {
    var myInput = document.getElementById("input");
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (myInput.value.match(paswd)) {
        fetchPostData();
        return true;
    } else {
        alert('Wrong...!')
        return false;
    }
}


//After enter key is pressed
function onEnterClick(event) {
    var x = event.key
    if (x === "Enter") {
        console.log("In if block")
        CheckPassword();
    }
}


//use generic approach
function onIconClick(obj) {
    var id = obj.id;

    console.log(id);

    if (id == 'all') {
        console.log("inside the if");
        restoreColor(id);
        fetchPostData();

    } else if (id == 'img') {
        var divName = document.getElementsByClassName("row-3")[0];
        divName.innerHTML = "";
        divName.className += ' roboimg';
        restoreColor(id);
        fetchRoboImage();
    } else if (id == 'news') {
        var divName = document.getElementsByClassName("row-3")[0];
        divName.innerHTML = "";
        restoreColor(id);
        slideShow();
    } else if (id == 'video') {
        var divName = document.getElementsByClassName("row-3")[0];
        divName.innerHTML = "";
        restoreColor(id);
        document.getElementsByClassName('row-3')[0].innerHTML = "<iframe title='YouTube video player' id='player'  type=\'text/html\' width='640' height='390' src='http://www.youtube.com/embed/W-Q7RMpINVo' frameborder='0' allowFullScreen></iframe>";
    } else if (id == 'shop') {
        var divName = document.getElementsByClassName("row-3")[0];
        divName.innerHTML = "";
        divName.className += ' products';
        restoreColor(id);
        getShopItems();
    }
}


//For fetching fake json  //1. h2 tag 2. need of line 75 .then 3.any other method except string interpolation
function fetchPostData() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            let output = "<h2>Lists of Posts</h2>";
            output += '<ul>';
            posts.forEach(function (post) {
                output += `
                <li>
                    ${post.title}
                </li>
            `;
            });
            output += '</ul>'
            document.getElementsByClassName("row-3")[0].innerHTML = output;
        });
}


//For fetching images
function fetchRoboImage() {
    for (let i = 1; i <= 12; i++) {
        var img = new Image(200, 200);
        img.className = 'robo';
        img.src = "https://robohash.org/" + i + ".png";

        var src = document.getElementsByClassName("row-3")[0];
        src.appendChild(img);
    }
}

//For Slide show
function slideShow() {
    var divName = document.getElementsByClassName("row-3")[0];
    for (counter = 1; counter <= 3; counter++) {
        var imagem = document.createElement("img");
        imagem.className = "slide";
        imagem.src = "img-" + counter + ".jpg";
        divName.appendChild(imagem);
    }
    document.getElementsByClassName("slide")[0].className = 'slide showing';

    //for slide show
    var slides = document.querySelectorAll('.row-3 .slide');
    var currentSlide = 0;
    var slideInterval = setInterval(nextSlide, 2000);
    function nextSlide() {
        slides[currentSlide].className = 'slide';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].className = 'slide showing';
    }
}

//for shopping 
function getShopItems() {
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
            let output = '<h2>Lists of Products</h2>';
            products.forEach(function (product) {
                output += `<img src = ${product.image} style:'width=100px; height=100px'>`;
            });
            document.getElementsByClassName("row-3")[0].innerHTML = output;
        });
}

function changeColor() {
    this.style.color = 'blue';
    this.style.borderBottom = '3px solid';
    return false;
}

//using generic class

function restoreColor(currentElem) {

    console.log("inside restore");
    if (currentElem != prevElem) {
        console.log(currentElem, prevElem);
        console.log(document.getElementById(prevElem));

        document.getElementById(prevElem).style.color = '#5f6368';
        document.getElementById(prevElem).style.borderBottom = 'none';
        prevElem = currentElem;
        document.getElementById(currentElem).style.color = "blue";
        document.getElementById(currentElem).style.borderBottom = '3px solid';
    }
    return false;
}

all.addEventListener('click', changeColor, false);
img.addEventListener('click', changeColor, false);
news.addEventListener('click', changeColor, false);
video.addEventListener('click', changeColor, false);
shop.addEventListener('click', changeColor, false);

