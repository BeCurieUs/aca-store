"use strict";
const userIsActive = () => {
  userActive = true;
}

const checkActivity = () => {
  if(userActive) {
    userActive = false;
  }else{
    console.log("Are you still there?")
    userActive = true;
  }
}

const displayProduct = (itemID) => {

  const item = getItemById(itemID)
  document.getElementById("itemlist").innerHTML = ""
  document.getElementById("cart").innerHTML = ""

  // I decided to have different elements we inject the code at
  // this means I need to manage the state of them by blanking 
  // them out whenever we enter a differnet display element

  // This is as opposed to having to change the class for styling each time
  // we changed display modes. In retrospect, it hits the dom more this way
  // as I would only need to change the class for display reasons once
  // per display mode change rather than at least twice to blank out
  // the other display mode divs.  When I had just 2 display modes, 
  // this method was similarlly dom painful.

  
  // this display mode is for product descriptions, which puts the image
  // on the left and the description info on the right and the
  // reviews on the bottom, slighty different than the product list
  // mode and shopping cart display mode


  document.getElementById("product-description").innerHTML = `
  <div class="main-product-details">
    <img src=${item.imgUrl} alt=${item.description} />
    <div class="detail-listing"> 
      <p class="description-title">${item.name}</p>
      <p class="description-rating">Rating: ${item.rating}</p>
      <p class="description-reviews">Reviews: ${item.reviews.length}</p>
      <p class="description-price">Price: ${item.price}</p>
      <p class="description-price">Description: ${item.description}</p>
    </div>
    <div class="product-cart-qty">
      <p>Qty:</p>
      <select id="product-qty" >
        ${descriptionNumberCart(itemID)}
      </select>
    </div>
    <button class="description-addtocart" onclick="addToCart(${itemID})">Add To Cart</button>

  </div>

  ${showReviews(item)}
  `
}

const showReviews = (item) => {

  return `
  <div class="product-reviews">
    ${item.reviews.map( (review,index) => {
      return `
        <div class="product-reviews-group">
          <p>Description: ${review.description}</p>
          <p>Rating: ${review.rating}</p>
        </div>
      `
    }).join('')}
  </div>
  `
}

const descriptionNumberCart = (itemID) => {
  return `
  <option>1</option>
  <option>2</option>
  <option>3</option>
  <option>4</option>
  <option>5</option>
  <option>6</option>
  <option>7</option>
  <option>8</option>
  <option>9</option>
  <option>10</option>
  `
}

const getItemById = (id) => {
  return products.find(items => {
    return items._id == id;
  })

  // utility class that returns an item object from the product array
  // given a product ID, used because you can't really pass around
  // objects in HTML function calls well
}


const addToCart = (id) => {
  const item = JSON.parse(JSON.stringify(getItemById(id)));
  // deep copy of item so we don't mess with the orignial product array
  // when we add a uniquie cartID
  carduniquieid ++;
  // make unique id for cart item
  item.cartId = carduniquieid;
  // assign unique id to cart item. This allows for deletion of speicific cart items rather
  // than items of the first item of the matched product ID
  item.qty = document.getElementById("product-qty").value
  cart.push(item);

  sessionStorage.setItem('cart', JSON.stringify(cart));

}

const displayCart = () => {
  document.getElementById("product-description").innerHTML = ""
  document.getElementById("itemlist").innerHTML = ""
  document.getElementById("cart").innerHTML = `<button class="cart-checkout" onclick="checkout()">Check out</button>`+
  cart.map( (item,index) => {
    return `
    <div class="cart-row-container">
      ${imageCard(item,false,"div")} 
      <button class="cart-delete-item" onclick="cartDeleteItem(${item.cartId})">X</button>
    </div>
    `
  }).join("")+
  `<button class="cart-checkout" onclick="checkout()">Check out</button>`
}

const checkout = () => {
  document.getElementById("cart").innerHTML = `
    <form id= "Checkout-form" onsubmit="event.preventDefault(); buyItems();">
      <input id="checkout-firstname" type="text" placeholder="First Name">
      <input id="checkout-lastname" type="text" placeholder="Last Name">
      <input id="checkout-email" type="text" placeholder="Email Address">
      <input id="checkout-submit" type="submit" value="Submit Order">
    </form> 
  `;
}

const buyItems = () => {
  console.log("dem items bois")
}

const cartDeleteItem = (passedCartId) => {

  const deleteIndex = cart.findIndex( (item,index) => {
    return item.cartId === passedCartId
  })

  cart.splice(deleteIndex,1)

  displayCart();
}

const imageCard = (item, descriptionSelector,tagType) => {
  if(descriptionSelector){
    return `
      <${tagType} class="product-item" >
        <img src=${item.imgUrl} alt=${item.description} />
        <p class="product-title">${item.name}</p>
        <p class="product-rating">Rating: ${item.rating}</p>
        <p class="product-reviews">Reviews: ${item.reviews.length}</p>
        <p class="product-price">Price: ${item.price}</p>
        <button onclick="displayProduct('${item._id}')" class="product-description">See description</button>
      </${tagType}>`
  }
  //implicit else
  return `
  <${tagType} class="product-item" >
    <img src=${item.imgUrl} alt=${item.description} />
    <p class="product-title">${item.name}</p>
    <p class="product-rating">Rating: ${item.rating}</p>
    <p class="product-reviews">Reviews: ${item.reviews.length}</p>
    <p class="product-price">Price: ${item.price}</p>
    <p class="cart-qty">Qty: ${item.qty}</p>
  </${tagType}>`
}
const searchItems = () => {
  document.getElementById("product-description").innerHTML = ""
  document.getElementById("cart").innerHTML = ""
  let categoryProducts = [];
  const category = document.getElementById("select-category").value
  const formValue = document.getElementById("search-form").elements[0].value

  if(category && category !== "--Choose--"){
    categoryProducts = products.reduce( (accumulator,item) => {
      if(item.category===category){
        accumulator.push(item);
        return accumulator;
      }
      return accumulator;
    },[])
  } else{
    categoryProducts = products;
  }
  // console.log(categoryProducts)


  const tempDisplayArray = categoryProducts.filter( (item,index) => {
    return item.name.toLocaleLowerCase().includes(formValue);
  }).map((fliteredItem,filteredIndex) => {
    return imageCard(fliteredItem,true)
  })

  

  document.getElementById("itemlist").innerHTML = tempDisplayArray.join("")

}

const resetEverything = () => {
  displayDefault();
  document.getElementById("select-category").value = "--Choose--"

}

const displayDefault = (category) => {
  document.getElementById("product-description").innerHTML = ""
  document.getElementById("cart").innerHTML = ""
  let categoryProducts = [];
  if(category && category !== "--Choose--"){
    categoryProducts = products.reduce( (accumulator,item) => {
      if(item.category===category){
        accumulator.push(item);
        return accumulator;
      }
      return accumulator;
    },[])
  } else{
    categoryProducts = products;
  }

  document.getElementById("itemlist").innerHTML = categoryProducts.map((item,index)=>{
    return(imageCard(item,true))
  }).join('');
}

const populateCategories = () => {

  const tempDisplay = products.reduce((accumulator,item) => {
    if(!accumulator.includes(item.category)){
      accumulator.push(item.category)
      return accumulator
    }
    return accumulator
  },[])
  document.getElementById("select-category").innerHTML = "<option>--Choose--</option>" +
  tempDisplay.map( (item,index)=>{
    return "<option>" + item + "</option>"
  })

}

const changeCatagory = (category) => {
  document.getElementById("search-form").elements[0].value = ""
  displayDefault(category);
}


let userActive = true;
let cart = [];
let carduniquieid = 0;

const activityTimer = setInterval(checkActivity,60000)

if(sessionStorage.getItem("cart")){
  cart = JSON.parse(sessionStorage.getItem("cart"))
}

displayDefault();
populateCategories();




