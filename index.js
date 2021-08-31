//genric approach
// var all = document.getElementById("all");
// var img = document.getElementById("img");
// var news = document.getElementById("news");
// var video = document.getElementById("video");
// var shop = document.getElementById("shop");

// var prevElem = "all";

// var buttonData = {
//     'all': { 'fun': fetchPostData, 'isCalled': false },
//     'img': { 'fun': fetchRoboImage, 'isCalled': false },
//     'news': { 'fun': slideShow, 'isCalled': false },
//     'video': { 'fun': videoPlayer, 'isCalled': false },
//     'shop': { 'fun': getShopItems, 'isCalled': false }
// }

//on search bar
function CheckPassword() {
    var myInput = document.getElementById("input");
    var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    if (myInput.value.match(paswd)) {
        document.getElementById('all').classList.add('active');
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
    var clicked = true;

    var buttonData = {
        'all': fetchPostData,
        'img': fetchRoboImage,
        'news': slideShow,
        'video': videoPlayer,
        'shop': getShopItems
    }
    console.log(buttonData);
    Object.entries(buttonData).forEach(([key, value]) => {
        
        if (key === id) {
            //clicked=true;
             if (clicked) {
                //clicked=true;
                console.log("inside buttonData");
                selectedElement(id);
                getDiv(id);
                buttonData[key].call();
                clicked=false;
            }
            
            // console.log("inside buttonData");
            // selectedElement(id);
            // getDiv(id);
            // buttonData[key].call();
        }
    });

    // if (id == 'all') {
    //     getDiv(id);
    //     fetchPostData();
    // } else if (id == 'img') {
    //     getDiv(id);
    //     document.getElementsByClassName("row-3")[0].className += ' roboimg';
    //     fetchRoboImage();
    // } else if (id == 'news') {
    //     getDiv(id);
    //     slideShow();
    // } else if (id == 'video') {
    //     getDiv(id);
    //     videoPlayer()

    // } else if (id == 'shop') {
    //     getDiv(id)
    //     document.getElementsByClassName("row-3")[0].className += ' products';
    //     getShopItems();
    // }
}


function getDiv(id) {
    var divName = document.getElementsByClassName("row-3")[0];
    divName.innerHTML = "";
    //restoreColor(id);  
}

//For fetching fake json  //1. h2 tag 2. need of line 75 .then 3.any other method except string interpolation
function fetchPostData() {
    document.getElementsByClassName("row-3")[0].classList.remove('products');
    document.getElementsByClassName("row-3")[0].classList.remove('roboimg');
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            let output = "&lt;h2&gt;Lists of Posts&lt;/h2&gt;";
            //output = "<h2>Lists of Posts</h2>";
            document.getElementsByClassName("row-3")[0].innerHTML = output;
            var ul = document.createElement('ul');
            posts.forEach(function (post) {
                var li = document.createElement('li');
                li.textContent = post.title;
                ul.appendChild(li);
            });
            document.getElementsByClassName("row-3")[0].appendChild(ul);
        });
}


//For fetching images
function fetchRoboImage() {
    document.getElementsByClassName("row-3")[0].classList.add('roboimg');
    document.getElementsByClassName("row-3")[0].classList.remove('products');
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
    document.getElementsByClassName("row-3")[0].classList.remove('products');
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

//for video
function videoPlayer() {
    document.getElementsByClassName('row-3')[0].innerHTML = "<iframe title='YouTube video player' id='player'  type=\'text/html\' width='640' height='390' src='http://www.youtube.com/embed/W-Q7RMpINVo' frameborder='0' allowFullScreen></iframe>";
}

//for shopping 
function getShopItems() {
    document.getElementsByClassName("row-3")[0].classList.add('products');
    document.getElementsByClassName("row-3")[0].classList.remove('roboimg');
    console.log("In shop block");
    fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((products) => {
            let output = '<h2>Lists of Products</h2>';
            document.getElementsByClassName("row-3")[0].innerHTML = output;
            products.forEach(function (product) {
                var img = document.createElement('img');
                img.src = src = product.image ;
                document.getElementsByClassName("row-3")[0].appendChild(img);
            });
        });
}

function selectedElement(id) {
    var remove = document.getElementsByClassName("active");
    console.log(remove);
    if (remove.length != 0) {
        remove[0].classList.remove('active');
    }

    var el = document.getElementById(id);
    el.classList.add('active');
}

// function changeColor() {
//     this.style.color = 'blue';
//     this.style.borderBottom = '3px solid';
//     return false;
// }

// //using generic class

// function restoreColor(currentElem) {

//     console.log("inside restore");
//     if (currentElem != prevElem) {
//         console.log(currentElem, prevElem);
//         console.log(document.getElementById(prevElem));

//         document.getElementById(prevElem).style.color = '#5f6368';
//         document.getElementById(prevElem).style.borderBottom = 'none';
//         prevElem = currentElem;
//         document.getElementById(currentElem).style.color = "blue";
//         document.getElementById(currentElem).style.borderBottom = '3px solid';
//     }
//     return false;
// }

// all.addEventListener('click', changeColor, false);
// img.addEventListener('click', changeColor, false);
// news.addEventListener('click', changeColor, false);
// video.addEventListener('click', changeColor, false);
// shop.addEventListener('click', changeColor, false);

