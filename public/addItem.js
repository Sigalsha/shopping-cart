var addNewItemsCards = function () {

    var source = $('#item-template').html();
    var template = Handlebars.compile(source);
    var cards = [];

    var addNewItem = function (itemName, itemPrice, itemImg) {
        card = {name: itemName, price: itemPrice, image: itemImg};
        cards.push.card;
    };

    var renderNewItem = function () {
        var newHTML = template({cards});
        $('.card-container').append(newHTML);
    };
 
    return {
        addNewItem: addNewItem,
        renderNewItem: renderNewItem,
        cards
        };
};

var feature = addNewItemsCards();

feature.renderNewItem();

//--------EVENTS---------

$('.view-add-new-item').on('click', function () {
    $('.add-item-form').toggle();
  });

  $('.add-item').on('click' , function () {
    var $newCardImage = $(this).prev('#item-img').val();
    var $newCardPrice = $newCardName.prev('#item-price').val();
    var $newCardName = $formGroupTitle.find('#item-name').val();
    feature.addNewItem($newCardName, $newCardPrice, $newCardImage).val();
    feature.renderNewItem();
  });