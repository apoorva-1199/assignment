var postData;
var productData;
var buttonData = {
    'all': setPostData,
    'img': fetchRoboImage,
    'news': slideShow,
    'video': videoPlayer,
    'shop': setShopItems
}


//on search bar
function checkPassword() {
    var myInput = document.getElementById("input");
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (myInput.value.match(paswd)) {
        selectedElement('all');
        setPostData();
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
        checkPassword();
    }
}


//use generic approach
function onIconClick(obj) {
    var id = obj.id;
    console.log(id);
    loadContainerData(id);
}


function loadContainerData(id){
    selectedElement(id);
    clearViewContainer();
    if(buttonData[id]){
    buttonData[id].call();
    }
}

function clearViewContainer() {
    var divName = document.getElementById("view-container");
    divName.innerHTML = "";
}

//For fetching fake json  
async function fetchPostData() {
    if (postData === undefined) {
        postData = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
    }
    return postData;
}

async function setPostData() {
    document.getElementById("view-container").classList.remove('products');
    document.getElementById("view-container").classList.remove('roboimg');
    let posts = await fetchPostData();
    let output = "&lt;h2&gt;Lists of Posts&lt;/h2&gt;";
    document.getElementById("view-container").innerHTML = output;
    var ul = document.createElement('ul');
    posts.forEach(function (post) {
        var li = document.createElement('li');
        li.textContent = post.title;
        ul.appendChild(li);
    });
    document.getElementById("view-container").appendChild(ul);
}


//For fetching images
function fetchRoboImage() {
    document.getElementById("view-container").classList.add('roboimg');
    document.getElementById("view-container").classList.remove('products');
    for (let i = 1; i <= 12; i++) {
        var img = new Image(200, 200);
        img.className = 'robo';
        img.src = "https://robohash.org/" + i + ".png";

        var src = document.getElementById("view-container");
        src.appendChild(img);
    }
}

//For Slide show
function slideShow() {
    document.getElementById("view-container").classList.remove('products');
    var divName = document.getElementById("view-container");
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

//for video
function videoPlayer() {
    document.getElementById("view-container").innerHTML = "<iframe title='YouTube video player' id='player'  type=\'text/html\' width='640' height='390' src='http://www.youtube.com/embed/W-Q7RMpINVo' frameborder='0' allowFullScreen></iframe>";
}

//for shopping 
async function getShopItems() {
    if (productData === undefined) {
        productData = await (await fetch("https://fakestoreapi.com/products")).json();
    }
    return productData;
}

async function setShopItems() {
    document.getElementById("view-container").classList.add('products');
    document.getElementById("view-container").classList.remove('roboimg');
    let output = '<h2>Lists of Products</h2>';
    let products = await getShopItems();
    document.getElementById("view-container").innerHTML = output;
    products.forEach(function (product) {
        var img = document.createElement('img');
        img.src = src = product.image;
        document.getElementById("view-container").appendChild(img);
    });

}

function selectedElement(id) {
    var remove = document.getElementsByClassName("active");
    if (remove.length != 0) {
        remove[0].classList.remove('active');
    }

    var el = document.getElementById(id);
    el.classList.add('active');
}

