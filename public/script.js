var ShoppingCart = function () {
  var source = $('#post-template').html();
  var template = Handlebars.compile(source);
  var STORAGE_ID = 'ShoppingCart';
  var cart = [];
  var total = 0;
  var $cart = $('.cart-list');

  var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart));
  };

  var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  };

  var addLocalStorageToTotal = function () {
    for (var i in cart) {
      total += cart[i].price;
    }
  };

  var addLocalStorageToCart = function() {
    cart = getFromLocalStorage();
    addLocalStorageToTotal();
  }

  var updateCart = function () {
    $cart.empty();

    var newHTML = template({cart});
    $('.cart-list').append(newHTML);

    $('.total').first()[0].innerHTML = total;
  };


  var addItem = function (item) {
    let cart_item = _findItem(item);
    if ( cart_item === null ) {
      cart.push(item);
      var itemPrice = item.price;
      total += itemPrice;
      item.quant = 1;
    } else {
      let singleItemPrice = cart_item.price / cart_item.quant;
      total += singleItemPrice;
      cart_item.price += singleItemPrice;
      cart_item.quant ++;
    } 
    saveToLocalStorage();
  };

  var _findItem = function (item) {
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].name === item.name) {
        return cart[i];
      }
    }
    return null;   
  };

  var _findItemByName = function (itemName) {
    for (let index = 0; index < cart.length; index += 1) {
      if (cart[index].name === itemName) {
        return cart[index];
      }
    }   
  };

  var clearCart = function () {
    cart = [];
    total = 0;
    saveToLocalStorage();
  }

  var removeItem = function (itemName) {
    let cartItem = _findItemByName(itemName);
    if (cartItem.quant === 1) {
      total -= cartItem.price;
      cart.splice(cart.indexOf(cartItem), 1);
      saveToLocalStorage();
    } else {
      let singleItemPrice = cartItem.price / cartItem.quant;
      total -= singleItemPrice;
      cartItem.price -= singleItemPrice;
      cartItem.quant -= 1;
      saveToLocalStorage();
    }
  };
  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    removeItem: removeItem,
    saveToLocalStorage: saveToLocalStorage,
    getFromLocalStorage: getFromLocalStorage,
    addLocalStorageToCart: addLocalStorageToCart,
    addLocalStorageToTotal: addLocalStorageToTotal
  }
};

var app = ShoppingCart();
app.addLocalStorageToCart();
// update the cart as soon as the page loads!
app.updateCart();

//--------EVENTS---------

$('.view-cart').on('click', function () {
  $('.shopping-cart').toggle();
});

$('.add-to-cart').on('click' , function () {
  // TODO: get the "item" object from the page
  var $clickedCard = $(this).closest('.card');
  var item = findCardItem($clickedCard);
  app.addItem(item);
  app.updateCart();
});

var findCardItem = function($clickedCard) {
  var $itemName = $clickedCard.data("name");
  var $itemPrice = $clickedCard.data("price");
  var item = {name: $itemName, price: $itemPrice};
  return item;
};

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
});

$('.cart-list').on('click', '.remove', function () {
  var $clickedItem = $(this).closest('.item');
  var itemName = $clickedItem.data("name");
  app.removeItem(itemName);
  app.updateCart();
});

