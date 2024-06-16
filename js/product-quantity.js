let total = document.getElementById("total");

//  increment and decrement the quantity of a product in the cart
const CURRENCY =  "AUD"
let products = document.getElementById("cart").children;
for (let i = 0; i < products.length; i++){
    let container = products[i].querySelector(".product-quantity");

    let quantityElem = container.querySelector("p");
    let qty = Number(quantityElem.innerHTML);

    //  set the default price 
    let price = products[i].querySelector(".price");
    price.innerHTML = "$" + price.getAttribute("default") + " " + CURRENCY;

    //  decrement the amount, unless the amout is 0
    container.children[0].addEventListener("click", function(){ 
        qty--;
        qty = Math.max(0, qty);
        
        applyMultiplier(price, quantityElem, qty);
        updateTotal();
    });

    //  increment the amount
    container.children[container.children.length - 1].addEventListener("click", function(){ 
        qty++;

        applyMultiplier(price, quantityElem, qty);
        updateTotal();
    });
}

//  set the default price 
total.innerHTML = "$" + total.getAttribute("value") + " " + CURRENCY;

//  apply the multiplier to the price
function applyMultiplier(price, quantityElem, qty){
    quantityElem.innerHTML = qty;
    let amount = qty * price.getAttribute("default");

    //  round accurately to two decimal places
    amount = Math.round((amount + Number.EPSILON) * 100) / 100;
    amount = amount.toFixed(2);
    price.setAttribute("value", amount);
    price.innerHTML = "$" + amount + " " + CURRENCY;
}

//  updates the cart total
function updateTotal(){
    let sum = 0;
    //  add the sum of each product
    for (let i = 0; i < products.length; i++){
        let price = products[i].querySelector(".price").getAttribute("value");
        sum += Number(price);
    }
    //  round accurately to two decimal places
    sum = Math.round((sum + Number.EPSILON) * 100) / 100;
    sum = sum.toFixed(2);
    total.innerHTML = "$" + sum + " " + CURRENCY;

}