let zoomImg = document.getElementById("zoom-img");
let staticImg = document.getElementById("cover");


//  copy the cover image source to the static image
let staticSrc = staticImg.getAttribute("src");
zoomImg.style.backgroundImage = "url(../" + staticSrc + ")";

window.onload = listenZoom;
window.onresize = listenZoom;


//  tracks mouse movement and zooms on image
function zoom(e) {
    if (window.innerWidth >= 580) {
        let zoom = e.currentTarget;
        let offsetX = e.offsetX;
        let offsetY = e.offsetY;
        let x = offsetX / zoom.offsetWidth * 100;
        let y = offsetY / zoom.offsetHeight * 100;
        zoom.style.backgroundPosition = x + '% ' + y + '%';
        zoom.style.backgroundSize = '180%';
    }
}

//  activates zoom when mouse overs an image
function listenZoom() {
    if (window.innerWidth >= 580) {
        zoomImg.addEventListener("mouseenter", handleMouseEnter);
        zoomImg.addEventListener("mouseleave", handleMouseLeave);
    } else {
        zoomImg.style.cursor = "default";
        zoomImg.removeEventListener("mouseenter", handleMouseEnter);
        zoomImg.removeEventListener("mouseleave", handleMouseLeave);
    }
}

function handleMouseEnter(e) {
    staticImg.style.opacity = 0;
    staticImg.style.transition = "opacity 0.25s"; 
    zoomImg.style.backgroundSize = '180%';
}

function handleMouseLeave(e) {
    staticImg.style.opacity = 1;
    zoomImg.style.backgroundSize = 'cover';
}