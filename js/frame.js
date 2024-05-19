//  navigation bar
let menuBtn = document.getElementById("menu-btn");
let navBar = document.querySelector("nav");
let dropdowns = document.querySelectorAll(".dropdown");
let dropdownMenus = document.querySelectorAll(".dropdown-content");
let lock = 0;
let dropdownEntered = 0;
let maxNavSpread = 1000
let navSections = navBar.children;

//  search bar
let searchBar = document.getElementById("search-bar");
let searchInput = searchBar.querySelector("input")
let searchSubmit = searchBar.querySelector(".search-submit");
let searchIcon = searchSubmit.querySelector("picture");
let searchButton = searchSubmit.querySelector("button");



if (window.innerWidth > 580){
    adjustNavSectionSize();
}


function adjustNavSectionSize(){
    //  calculate each header width
    let width = maxNavSpread/navSections.length;

    //  apply calculated width
    let header;
    for (let i = 0; i < navSections.length; i++){
        if (navSections[i] instanceof HTMLDivElement){
            header = navSections[i].firstElementChild;
        }
        else{
            header = navSections[i];
        } 
        header.style.width = width + "px";
    }

    //  adjust width of dropdown menus
    for (let i = 0; i < dropdownMenus.length; i++){
        dropdownMenus[i].style.width = width + "px";
    }

}


//  wrapper for asynchronous sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//  behaviour that occurs to reset elements upon resize
addEventListener("resize", async (event) => {
    closeNavMenu();

    addClass(navBar, "no-transition");
    await sleep(750);
    removeClass(navBar, "no-transition");
    
    //  remove all injected styling
    for (let i = 0; i < dropdowns.length; i++){
        dropdowns[i].removeAttribute("style")
        dropdowns[i].firstElementChild.removeAttribute("style");
        dropdowns[i].lastElementChild.removeAttribute("style");
        
    }
    for (let i = 0; i < dropdownMenus.length; i++){
        navSections[i].removeAttribute("style");
    }

    if (window.innerWidth > 750){
        adjustNavSectionSize();
    }
});

//  prevent the header from overlapping the footer
addEventListener('scroll', function() {
    let header = document.querySelector('header');
    let footer = document.querySelector('footer');
    
    let headerRect = header.getBoundingClientRect();
    let footerRect = footer.getBoundingClientRect();
    let navRect = navBar.getBoundingClientRect();
    
    //  hide header
    if ((window.innerWidth < 580 && headerRect.height >= footerRect.top)
        || (window.innerWidth > 580 && headerRect.height + navRect.height >= footerRect.top)) {
        
        header.style.opacity = "0";
        closeSearchBar();
    } 
    else {
        header.removeAttribute("style");
    }
});


//  open/close nav sidebar on menu button click
menuBtn.addEventListener("click", function() {
    if (!navBar.classList.contains("open")){
        openNavBar();
    }
    else{
        closeNavMenu();
    }
}); 

function openNavBar(){
    closeSearchBar();
    addClass(navBar, "open");
}

//  behaviour of dropdown menus at different resolutions
for (let i = 0; i < dropdowns.length; i++){
    //  set the length of dropdowns
    dropdowns[i].setAttribute("data-count", dropdowns[i].lastElementChild.childElementCount);


    let sectionName = dropdowns[i].firstElementChild;
    
    //  handle mobile navigation style
    sectionName.addEventListener("click", async function() {
        mobileDropdown(sectionName, dropdowns[i], 750);
    });

    //  handle desktop navigation style
    let dropdownMenu = dropdowns[i].querySelector(".dropdown-content");
    let content = dropdownMenu.children;
    dropdowns[i].addEventListener("mouseover", async function(){
        if (window.innerWidth > 580){
            openDropdown(dropdownMenu, content, 0)  
            dropdowns[i].style.height = (dropdowns[i].getAttribute("data-count") * content[0].offsetHeight + navBar.offsetHeight) + "px";
            dropdownMenu.style.height = dropdowns[i].getAttribute("data-count") * content[0].offsetHeight + "px";
        }

    });
    dropdowns[i].addEventListener("mouseleave", async function(){
        if (window.innerWidth > 580){
            closeDropdown(dropdownMenu, content, 0)

            dropdowns[i].style.height = navBar.offsetHeight + "px";
            dropdownMenu.style.height = "0px";
        }
    });

}

async function openDropdown(menu, content, delay){
    addClass(menu, "open");

    lock = 1;
    await sleep(delay);
    lock = 0;
    

    if (window.innerWidth < 580 && !navBar.classList.contains("open")){
        closeDropdown(menu, content, 0);
    }
    addClassToArr(content, "open");
}

async function closeDropdown(menu, content, delay){
    removeClassFromArr(content, "open");

    lock = 1;
    await sleep(delay);
    lock = 0;
    
    if (window.innerWidth < 580 && !navBar.classList.contains("open")){
        closeDropdown(menu, content, 0);
    }
    removeClass(menu, "open");

}

async function mobileDropdown(sectionName, dropdown, delay){
    let dropdownMenu = dropdown.querySelector(".dropdown-content");
    let content = dropdownMenu.children;
    //  mobile navigation style
    if (window.innerWidth < 580){
        //  open the dropdown
        if (!lock && !dropdownMenu.classList.contains("open")){
            closeDropdowns();
            openDropdown(dropdownMenu, content, delay)
        }
        //  close dropdown
        else if (!lock){
            closeDropdown(dropdownMenu, content, delay)
            closeDropdowns();
        }
    }
}




function closeNavMenu(){
    removeClassFromArr(dropdownMenus, "open");
    for (let i = 0; i < dropdownMenus.length; i++){
        closeDropdownMenu(dropdownMenus[i]);
    }
    removeClass(navBar, "open");
}

function closeDropdownMenu(dropdown){
    let content = dropdown.querySelectorAll("a");
    removeClassFromArr(content, "open");
}


//  closes all dropdown menus, allows exceptions
function closeDropdowns(exceptions = null){
    for (let i = 0; i < dropdowns.length; i++){
        let section = dropdowns[i].firstElementChild;
        let menu = dropdowns[i].lastElementChild;

        if (exceptions && exceptions.includes(section)){
            continue;
        }
        
        let content = menu.querySelectorAll("a");
        removeClassFromArr(content, "open")
        removeClass(menu, "open");
    }

}


function addClassToArr(arr, className){
    for (let i = 0; i < arr.length; i++){
        addClass(arr[i], className);
    }
}

function removeClassFromArr(arr, className){
    for (let i = 0; i < arr.length; i++){
        removeClass(arr[i], className);
    }
}

function addClass(elem, className){
    elem.classList.add(className);
}

function removeClass(elem, className){
    elem.classList.remove(className);
}


function searchIconClicked(){
    //  mobile resolution
    if (window.innerWidth < 580){
        toggleMobileNav();
    }
}

function toggleMobileNav(){
    searchButton.classList.toggle("open");
    searchInput.classList.toggle("open");
}
function closeSearchBar(){
    searchButton.classList.remove("open");
    searchInput.classList.remove("open");
}