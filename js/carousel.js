let carousel = document.querySelector(".carousel");
let numProducts = carousel.childElementCount;
let carouselIndex = 0;
const LEFT = 'left';
const RIGHT = 'right';
let arrows = document.querySelector(".carousel-toggle").children;
let leftArrow = arrows[0];
let rightArrow = arrows[1];

leftArrow.style.visibility = "hidden";
let scrollIncrement = window.innerWidth * 0.9;

function arrowClick(arrow){
    if (arrow == LEFT){
        carouselIndex--;
        carousel.scrollTo({
            left: carousel.scrollLeft - scrollIncrement,   
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
            left: carousel.scrollLeft + scrollIncrement,   
            behavior: 'smooth'
        });
        leftArrow.style.visibility = "visible";
        if (carouselIndex == numProducts - 1){
            rightArrow.style.visibility = "hidden";
        }
    }
}