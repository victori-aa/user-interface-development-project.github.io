let menuBtn = document.getElementById("menu-btn");
let navBar = document.querySelector("nav")
menuBtn.addEventListener("click", function() {
    navBar.classList.toggle("mobile-open");
}); 


//  behaviour that occurs to reset elements upon resize
addEventListener("resize", (event) => {
    if (window.innerWidth > 580){
        navBar.classList.remove("mobile-open");
    }
});