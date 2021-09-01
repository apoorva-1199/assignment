var buttonData = {
    'all': setPostData,
    'img': fetchRoboImage,
    'news': slideShow,
    'video': videoPlayer,
    'shop': setShopItems
}
var apiResponse = {
    'postData': {},
    'productData': {}
}


//on search bar
function checkPassword() {
    var myInput = document.getElementById("input");
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (myInput.value.match(paswd)) {
        loadContainerData('all');
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
// function onIconClick(obj) {
//     var id = obj.id;
//     console.log(id);
//     var idList = Object.keys(buttonData);
//     console.log(idList);
//     for(let i =0 ;i<=idList.length;i++){
//         let a =document.getElementById(idList[i]);
//         console.log(a);
//         a.addEventListener('click',callTabFunction(idList[i]));
//     }
//     //loadContainerData(id);

// }

// function callTabFunction(tab){
//     if(tab===)
    
// }


function onIconClick(obj) {
    var id = obj.id;
    console.log(id);
    loadContainerData(id);
}


function loadContainerData(id) {
    selectedElement(id);
    if (buttonData[id]) {
        clearViewContainer();
        buttonData[id].call();
    }
}

function loadContainerData(id) {
    selectedElement(id);
    if (buttonData[id]) {
        clearViewContainer();
        buttonData[id].call();
    }
}

function clearViewContainer() {
    let divName = document.getElementById("view-container");
    if (divName.innerHTML.trim().length > 0) {
        divName.innerHTML = "";
    }

}

//For fetching fake json  
async function fetchPostData() {
    if (Object.keys(apiResponse['postData']).length === 0 && apiResponse['postData'].constructor === Object) {
        apiResponse['postData'] = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
    }
    return apiResponse['postData'];
}

async function setPostData() {
    let divName = document.getElementById("view-container");
    divName.classList.remove('products');
    divName.classList.remove('roboimg');
    let posts = await fetchPostData();
    let output = "&lt;h2&gt;Lists of Posts&lt;/h2&gt;";
    divName.innerHTML = output;
    var ul = document.createElement('ul');
    posts.forEach(function (post) {
        var li = document.createElement('li');
        li.textContent = post.title;
        ul.appendChild(li);
    });
    divName.appendChild(ul);
}


//For fetching images
function fetchRoboImage() {
    let divName = document.getElementById("view-container");
    divName.classList.add('roboimg');
    divName.classList.remove('products');
    const imgURL = "https://robohash.org/";
    for (let i = 1; i <= 12; i++) {
        var img = new Image();
        img.className = 'robo';
        img.src = imgURL + i + ".png";

        var src = divName;
        src.appendChild(img);
    }
}

//For Slide show
function slideShow() {

    let divName = document.getElementById("view-container");
    divName.classList.remove('products');
    for (counter = 1; counter <= 3; counter++) {
        var imagem = document.createElement("img");
        imagem.className = "slide";
        imagem.src = "img-" + counter + ".jpg";
        divName.appendChild(imagem);
    }
    let slide = document.querySelector('.slide');
    if (slide !== null) {
        slide.className = 'slide showing';
    }
    //for slide show
    let slides = document.querySelectorAll('.row-3 .slide');
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 2000);
    function nextSlide() {
        slides[currentSlide].className = 'slide';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].className = 'slide showing';
    }

}


//for video
function videoPlayer() {
    let divName = document.getElementById("view-container");
    const vidSrc = "<iframe title='YouTube video player' id='player'  type=\'text/html\' width='640' height='390' src='http://www.youtube.com/embed/W-Q7RMpINVo' frameborder='0' allowFullScreen></iframe>"
    divName.innerHTML = vidSrc;
}

//for shopping 
async function getShopItems() {
    if (Object.keys(apiResponse['productData']).length === 0 && apiResponse['productData'].constructor === Object) {
        apiResponse['productData'] = await (await fetch("https://fakestoreapi.com/products")).json();
    }
    return apiResponse['productData'];
}

async function setShopItems() {
    let divName = document.getElementById("view-container");
    divName.classList.add('products');
    divName.classList.remove('roboimg');
    let output = '<h2>Lists of Products</h2>';
    let products = await getShopItems();
    document.getElementById("view-container").innerHTML = output;
    products.forEach(function (product) {
        var img = document.createElement('img');
        img.src = src = product.image;
        divName.appendChild(img);
    });

}

function selectedElement(id) {
    let remove = document.querySelector(".active");
    if (remove !== null) {
        remove.classList.remove('active');
    }
    var el = document.getElementById(id);
    el.classList.add('active');
}

