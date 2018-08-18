var ShoppingCart = function () {
  var source = $('#post-template').html();
  var template = Handlebars.compile(source);

  // an array with all of our cart items
  var cart = [];
  var total = 0;
  var $cart = $('.cart-list');

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
    // TODO: Write a function that clears the cart ;-)
    cart = [];
    total = 0;
  };

  var removeItem = function (itemName) {
    var item = _findItemByName(itemName);
    if (item.quant === 1) {
      total -= item.price;
      cart.splice(cart.indexOf(item), 1);
    } else {
      let singleItemPrice = item.price / item.quant;
      total -= singleItemPrice;
      item.price -= singleItemPrice;
      item.quant -= 1;
    }
  };

  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    removeItem: removeItem,
    cart
  };
};

var app = ShoppingCart();

// update the cart as soon as the page loads!
app.updateCart();


//--------EVENTS---------

$('.view-cart').on('click', function () {
  // TODO: hide/show the shopping cart!
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
  var $clickedItem = $(this).closest('.cart-item');
  var itemName = $clickedItem.data("name");
  app.removeItem(itemName);
  app.updateCart();
});