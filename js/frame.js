let menuBtn = document.getElementById("menu-btn");
let navBar = document.querySelector("nav");
let dropdowns = document.querySelectorAll(".dropdown");
let dropdownMenus = document.querySelectorAll(".dropdown-content");
let lock = 0;

//  creates an asynchronous sleep (NOT BUSY WAIT)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//  behaviour that occurs to reset elements upon resize
addEventListener("resize", (event) => {
    if (window.innerWidth > 580){
        navBar.classList.remove("open");
        
// care for close nave
    }
});

//  open/close nav sidebar on menu button click
menuBtn.addEventListener("click", function() {
    if (!navBar.classList.contains("open")){
        navBar.classList.add("open");
    }
    else{
        closeNavMenu();
    }
}); 

function closeNavMenu(){
    navBar.classList.remove("open");
    removeClassFromArr(dropdownMenus, "open");
    for (let i = 0; i < dropdownMenus.length; i++){
        let content = dropdownMenus[i].querySelectorAll("a");
        console.log(content)
        removeClassFromArr(content, "open");
    }
    

}

//  behaviour of dropdown menus at different resolutions
for (let i = 0; i < dropdowns.length; i++){

    let sectionName = dropdowns[i].querySelector("a");
    let dropdownMenu = dropdowns[i].querySelector(".dropdown-content");
    
    sectionName.addEventListener("click", async function() {
        //  mobile - slide in dropdown menu on nav section click
        if (window.innerWidth < 580){
            let content = dropdownMenu.children;

            //  open the dropdown
            if (!lock && !dropdownMenu.classList.contains("open")){
                closeDropdowns([sectionName]);
                dropdownMenu.classList.add("open");

                lock = 1;
                await sleep(750);
                lock = 0;
                
                addClassToArr(content, "open");
                
            }
            //  close dropdown
            else if (lock){
                removeClassFromArr(content, "open");

                lock = 1;
                await sleep(750);
                lock = 0;
                
                dropdownMenu.classList.remove("open");
    
                
                closeDropdowns([sectionName]);
            }


        }
    });
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
        menu.classList.remove("open");
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