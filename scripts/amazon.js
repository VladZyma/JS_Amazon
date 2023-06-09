let productsHTML = '';

products.forEach((product) => {
  productsHTML = productsHTML + `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src=${product.image} alt="product" />
    </div>
    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>
    <div class="product-rating-container">
      <img class="product-rating-stars" src="./images/ratings/rating-${product.rating.stars * 10}.png" alt="product stars" />
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>
    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>
    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>
    <div class="product-spacer"></div>
    <div class="added-to-cart js-added-to-cart-${product.id}">
      <img src="./images/icons/checkmark.png" alt="check" />
      Added
    </div>
    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
      Add to cart
    </button> 
  </div>
  `;
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;

const addedMessageTimeouts = {};

document.querySelectorAll('.js-add-to-cart')
  .forEach(button => {
    button.addEventListener('click', () => {

      const productId = button.dataset.productId;

      const productValue = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

      let matchingItem;
      cart.forEach(item => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += productValue;
      } else {
        cart.push({
          productId: productId,
          quantity: productValue,
        });
      }
      const addedToCartEl = document.querySelector(`.js-added-to-cart-${productId}`);
      addedToCartEl.classList.add('active');

      const previousTimeoutId = addedMessageTimeouts[productId];

      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      let addedTimeout = setTimeout(() => {
        addedToCartEl.classList.remove('active');
      }, 2000);
      
      addedMessageTimeouts[productId] = addedTimeout;

      let cartQuantity = 0;
      cart.forEach(item => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    });
  });