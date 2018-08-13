var ShoppingCart = function () {
  var source = $('#post-template').html();
  var template = Handlebars.compile(source);

  // an array with all of our cart items
  var cart = [];
  var total = 0;
  var $cart = $('.cart-list');

  var updateCart = function () {
    // TODO: Write this function. In this function we render the page.
    // Meaning we make sure that all our cart items are displayed in the browser.
    // Remember to empty the "cart div" before you re-add all the item elements.
    $cart.empty();

    var newHTML = template({cart});
    $('.cart-list').append(newHTML);

    $('.total').first()[0].innerHTML = total;
  };


  var addItem = function (item) {
    // TODO: Write this function. Remember this function has nothing to do with display. 
    // It simply is for adding an item to the cart array, no HTML involved - honest ;-)
    cart.push(item);
    total = 0;
    for (let i = 0; i < cart.length; i++) {
      var itemPrice = cart[i].price;
      total += itemPrice;
    }
    
  };

  var clearCart = function () {
    // TODO: Write a function that clears the cart ;-)
    cart = [];
    total = 0;
  }
  
  return {
    updateCart: updateCart,
    addItem: addItem,
    clearCart: clearCart,
    cart
  }
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

$('.clear-cart').on('click', function () {
  app.clearCart();
  app.updateCart();
});

var findCardItem = function($clickedCard) {
  var $itemName = $clickedCard.data("name");
  var $itemPrice = $clickedCard.data("price");
  var item = {name: $itemName, price: $itemPrice};
  return item;
};