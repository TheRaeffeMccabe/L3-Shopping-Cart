var items = [
    ['Images/CarNumber1.jpg', 65999, 'HelaZula 5000 Series'],
    ['Images/CarNumber2.jpg', 37999, 'Bititzu Hybrid'],
    ['Images/CarNumber3.jpg', 55999, 'Butintale Deluxe'],
    ['Images/CarNumber4.jpg', 22999, 'Mitzanubushi'],
    ['Images/CarNumber5.jpg', 61999, 'Pogorsh 911'],
    ['Images/CarNumber6.jpg', 89999, 'Totota Hylix'],
];

function testing(){
    alert('here');
}

var cartItems = [];

function run() {
 var main = document.getElementById('products');

 // elements needing to be added
 
 for (var i = 0; i < items.length; i++) {
     var ele = document.createElement('li');
     var pic = document.createElement('img');
     var price = document.createElement('h1');
     var desc = document.createElement('h2');
     var add = document.createElement('button');
     var typeBox = document.createElement('input');



     // Push elements into html
     main.appendChild(ele);
     ele.appendChild(pic);
     ele.appendChild(price);
     ele.appendChild(desc);
     ele.appendChild(add);
     ele.appendChild(typeBox);

     //edit pusher elements info from array

     pic.src = items[i][0];
     price.innerHTML = '$' + items[i][1];
     desc.innerHTML = items[i][2];
     add.innerHTML = 'Add to Cart';
     typeBox.type = 'number';

     typeBox.setAttribute("id", "input" + i);
     typeBox.value = 1;

     add.dataset.cartIndex = i;
     add.addEventListener('click', adding, false);
 }
}
 function adding(event) {
     const NUM = event.currentTarget.dataset.cartIndex;

     cartItems.push([items[NUM]]);
     cartItems[cartItems.length - 1][1] = Number(document.getElementById('input' + NUM).value);

     updateCart();
 }

 var totalItems = 0;
 /*   Update total amount of values */
 function updateCart() {
     var itemCounter = document.getElementById('itemCount');

     totalItems = 0;

     window.sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

     var data = sessionStorage.getItem('cartItems');
     data = JSON.parse(data);

     cartItems = data;

     for (var i = 0; i < cartItems.length-1; i++) {
         totalItems += cartItems[i][1];

     }

     //itemCounter.innerHTML = totalItems;
 }

// Loading cart items
function loadCart() {
 var main = document.getElementById('cartProducts');

 // Grabbing Session storage info
 var data = sessionStorage.getItem('cartItems');
data = JSON.parse(data);

cartItems = data;

updateCart();

 // elements needing to be added
 for (var i = 0; i <= data.length -1; i++) {
     var ele = document.createElement('li');
     var pic = document.createElement('img');
     var price = document.createElement('h1');
     var desc = document.createElement('h2');
     var deleteItem = document.createElement('button');
     var amount = document.createElement('h2');
     var subtotal = document.createElement('h3');



     // Push elements into html
     main.appendChild(ele);
     ele.appendChild(pic);
     ele.appendChild(price);
     ele.appendChild(desc);
     ele.appendChild(deleteItem);
     ele.appendChild(amount);
     ele.appendChild(subtotal);

     //edit pusher elements info from array

     pic.src = cartItems[i][0][0];
     price.innerHTML = '$' + cartItems[i][0][1];
     desc.innerHTML = cartItems[i][0][2];

     deleteItem.innerHTML = 'Delete Item';
     deleteItem.dataset.cartIndex = i;
     deleteItem.addEventListener('click', deleteMe, false);

     amount.innerHTML = cartItems[i][1];
     subtotal.innerHTML = '$' + cartItems[i][1] * cartItems[i][0][1];
 }
}// end func

function deleteMe () {
    const NUM = event.currentTarget.dataset.cartIndex;

    delete cartItems[NUM];
    
    cartItems = cartItems.filter(item => item !== undefined);

    updateCart();
    loadCart();
    window.location.reload(true);
}