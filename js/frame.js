let menuBtn = document.getElementById("menu-btn");
let navBar = document.querySelector("nav");
let dropdowns = document.querySelectorAll(".dropdown");
let dropdownMenus = document.querySelectorAll(".dropdown-content");
let lock = 0;
let dropdownEntered = 0;


//  creates an asynchronous sleep (NOT BUSY WAIT)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//  behaviour that occurs to reset elements upon resize
addEventListener("resize", async (event) => {
    closeNavMenu();

    addClass(navBar, "no-transition");
    await sleep(750);
    removeClass(navBar, "no-transition");

    
});

//  open/close nav sidebar on menu button click
menuBtn.addEventListener("click", function() {
    if (!navBar.classList.contains("open")){
        addClass(navBar, "open");
    }
    else{
        closeNavMenu();
    }
}); 



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
            openDropdown(sectionName, dropdownMenu, content, 0)  
            dropdowns[i].style.height = (dropdowns[i].getAttribute("data-count") * content[0].offsetHeight + navBar.offsetHeight) + "px";
            dropdownMenu.style.height = dropdowns[i].getAttribute("data-count") * content[0].offsetHeight + "px";
        }

    });
    dropdowns[i].addEventListener("mouseleave", async function(){
        if (window.innerWidth > 580){
            
            closeDropdown(sectionName, dropdownMenu, content, 0)

            dropdowns[i].style.height = navBar.offsetHeight + "px";
            dropdownMenu.style.height = "0px";
        }
    });

}

async function openDropdown(sectionName, menu, content, delay){
    
    closeDropdowns([sectionName]);
    addClass(menu, "open");

    lock = 1;
    await sleep(delay);
    lock = 0;
    
    addClassToArr(content, "open");
}

async function closeDropdown(sectionName, menu, content, delay){
    if (lock){
        return 1;
    }
    removeClassFromArr(content, "open");

    lock = 1;
    await sleep(delay);
    lock = 0;
    
    removeClass(menu, "open");

    
    closeDropdowns([sectionName]);
}

async function mobileDropdown(sectionName, dropdown, delay){
    let dropdownMenu = dropdown.querySelector(".dropdown-content");
    let content = dropdownMenu.children;
    //  mobile navigation style
    if (window.innerWidth < 580){
        //  open the dropdown
        if (!lock && !dropdownMenu.classList.contains("open")){
            openDropdown(sectionName, dropdownMenu, content, delay)
        }
        //  close dropdown
        else if (!lock){
            closeDropdown(sectionName, dropdownMenu, content, delay)
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