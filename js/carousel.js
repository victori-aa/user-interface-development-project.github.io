let carousel = document.querySelector(".carousel");
let numProducts = carousel.childElementCount;
let carouselIndex = 0;
const LEFT = 'left';
const RIGHT = 'right';
let arrows = document.querySelector(".carousel-toggle").children;
let leftArrow = arrows[0];
let rightArrow = arrows[1];

leftArrow.style.visibility = "hidden";

//  scrolls the product carousel when an arrow is clicked
function arrowClick(arrow){
    if (arrow == LEFT){
        carouselIndex--;
        carousel.scrollTo({
            left: (carouselIndex * window.innerWidth),   
            behavior: 'smooth'
        });
        rightArrow.style.visibility = "visible";
        if (carouselIndex == 0){
            leftArrow.style.visibility = "hidden";
        }
    }
    else if (arrow == RIGHT){
        carouselIndex++;
        carousel.scrollTo({
            left: (carouselIndex * window.innerWidth),   
            behavior: 'smooth'
        });
        leftArrow.style.visibility = "visible";
        if (carouselIndex == numProducts - 1){
            rightArrow.style.visibility = "hidden";
        }
    }
}