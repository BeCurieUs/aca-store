"use strict";
const userIsActive = () => {
  userActive = true;
}
// triggers anytime anything in the main site div is clicked to let us
// know the user is active.

const checkActivity = () => {

  // function is triggered every min from our timer, sets activity manually to false
  // unless the user creates an on click action on the main, the next
  // min will trigger false and promt for use action...in the most
  // horrible and obnoxious way!
  if(userActive) {
    userActive = false;
  }else{
    console.log("Are you still there?")
    userActive = true;
    // changed from alert to console for now cause alerts are the devil
    // if I forget to change back just know I know it was supposed to be
    // alert
  }
}

const displayProduct = (itemID) => {

  const item = getItemById(itemID)


  document.getElementById("main-list").innerHTML = `
  <div class="flex-right padding-small">
    <img class="fit-content" src=${item.imgUrl} alt=${item.description} />
    <div class="margin-small-left"> 
      <p>${item.name}</p>
      <p>Rating: ${item.rating}</p>
      <p>Reviews: ${item.reviews.length}</p>
      <p>Price: ${item.price}</p>
      <p>Description: ${item.description}</p>
    </div>
    <div class="margin-small-left flex-align-center ">
      <p>Qty:</p>
      <select id="product-qty" >
        ${descriptionNumberCart(itemID)}
      </select>
    </div>
    <button class="margin-small-left" onclick="addToCart(${itemID})">Add To Cart</button>

  </div>

  ${showReviews(item)}
  `
}

const showReviews = (item) => {
  // should likely go in and clear up the tags and make H1s and H2s where
  // appropriate, everything being a P tag is about as suboptimal
  // SEO as achivable. 
  return `
  <section id="reviews">
    <h1 class="h2-size"> Reviews: </h1>
    ${item.reviews.map( (review,index) => {
      return `
        <article class="padding-small">
          <p>Description: ${review.description}</p>
          <p>Rating: ${review.rating}</p>
        </article>
      `
    }).join('')}
  </section>
  `
}

const descriptionNumberCart = (itemID) => {

  // we might want cart quantity options to be dynamic base on avaliablily
  // we would throw that in here for the return
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

  // on hindsite, uniue property ID isn't needed if we gather similar items
  // for the user, I will consider doing this in a refactor. This would save some
  // memory. 
}

const displayCart = () => {
 

  document.getElementById("main-list").innerHTML = 
  (cart.length!=0 ? '<button class="fit-content margin-small-top" onclick="checkout()">Check out</button>' : "")+
  `<h1 class="h2-size margin-small">Your Shopping Cart:<h1>`+
  (cart.length!=0 ? cart.map( (item,index) => {
    //creates the individual cart boxes
    return `
    <div class="flex-right">
      ${imageCard(item,false,"article")} 
      <button class="fit-content" onclick="cartDeleteItem(${item.cartId})">X</button>
    </div>
    `
  }).join("") : "<p>Cart is empty</p>")+
  (cart.length!=0 ? '<button class="fit-content margin-small-top" onclick="checkout()">Check out</button>' : "")
}

const checkout = () => {
  let priceTotal = 0;

  // create the checkout form. You can only get here from the shopping cart
  // so no need to reset any of the forms and we reuse the 
  // shopping cart view mode so we don't have to reset a 4th item in the
  // other code
  document.getElementById("main-list").innerHTML = `
    <h1 class="h2-size margin-small-top">Enter Order Details:</h2>
    <form class= "flex-down margin-small half-vw" onsubmit="event.preventDefault(); buyItems();">
      <input class="margin-small" id="checkout-firstname" type="text" placeholder="First Name">
      <input class="margin-small" id="checkout-lastname" type="text" placeholder="Last Name">
      <input class="margin-small"  id="checkout-email" type="text" placeholder="Email Address">
      <ul class="margin-small">
        ${cart.map( (item,index) => {
          priceTotal+=(item.qty*(Number(item.price.slice(1,item.price.length))));
          return `
          <li class="checkout-item">
            ${item.name + ": " + item.qty + "x" + item.price + "=" + "$"+(item.qty*(Number(item.price.slice(1,item.price.length)))).toFixed(2)}
          </li> 
          `
        }).join('')}
      </ul>
      <p class"checkout-price-total">
        Total: $${priceTotal.toFixed(2)}
      </p>
      <input class="fit-content margin-small-top" id="checkout-submit" type="submit" value="Submit Order">
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

  sessionStorage.setItem('cart', JSON.stringify(cart));


  displayCart();
}

const imageCard = (item, descriptionSelector,tagType) => {
  // use to create images and display text, but I need to rethink this
  // implimentation, it's clunky. Likely need just a flat version of this
  // and smarter CSS implimentation
  if(!tagType){
    tagType="li"
  }

  if(descriptionSelector){
    return `
      <${tagType} class="padding-small" >
        <img src=${item.imgUrl} alt=${item.description} />
        <div class="description-container"> 
          <p>${item.name}</p>
          <p>Rating: ${item.rating}</p>
          <p>Reviews: ${item.reviews.length}</p>
          <p>Price: ${item.price}</p>
          <button onclick="displayProduct('${item._id}')" >See description</button>
        </div>
      </${tagType}>`
  }
  //implicit else
  return `
  <${tagType} class="padding-small " >
    <img src=${item.imgUrl} alt=${item.description} />
    <div class="description-container"> 
      <p>${item.name}</p>
      <p>Rating: ${item.rating}</p>
      <p>Reviews: ${item.reviews.length}</p>
      <p>Price: ${item.price}</p>
      <p>Qty: ${item.qty}</p>
    </div>
  </${tagType}>`
}
const searchItems = () => {
  
  let categoryProducts = [];
  const category = document.getElementById("select-category").value
  // grab the catagory field
  const formValue = document.getElementById("search-form").elements[0].value
  // grab the search field
  if(category && category !== "--Choose--"){
    categoryProducts = products.reduce( (accumulator,item) => {
      if(item.category===category){
        accumulator.push(item);
        return accumulator;
      }
      return accumulator;
    },[])
    // return a list of only products that meet the select catagory search
  } else{
    categoryProducts = products;
    // but if its the default just return the full list
  }


  // then apply the search filter and we will display the mapped results
  const tempDisplayArray = categoryProducts.filter( (item,index) => {
    return item.name.toLocaleLowerCase().includes(formValue);
  }).map((fliteredItem,filteredIndex) => {
    return imageCard(fliteredItem,true,"article")
  })

  

  document.getElementById("main-list").innerHTML = 
  "<div class='flex-right overflow'>"+
  tempDisplayArray.join("")+
  "</div>"
  const imageTags = document.getElementsByTagName("img");
  for(let i=0;i<imageTags.length;i++){
    imageTags[i].nextElementSibling.style.width = imageTags[i].width.toString()+"px";
  }
  // set the width dynamically to the width of the picture of its sibling
}

const resetEverything = () => {
  displayDefault();
  document.getElementById("select-category").value = "--Choose--"

}

const displayDefault = (category) => {
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

  document.getElementById("main-list").innerHTML = "<div id='product-row' class='flex-right overflow'>" +
  categoryProducts.map((item,index)=>{
    return(imageCard(item,true,"article"))
  }).join('') +
  "</div>"

  const imageTags = document.getElementsByTagName("img");
  for(let i=0;i<imageTags.length;i++){
    if(imageTags[i].width){
      imageTags[i].nextElementSibling.style.width = imageTags[i].width.toString()+"px"
    }
    // setting description width to that of the image sibling
    // but this doesn't work for the first time the page loads and
    //  onload function make this work right. This stop gap works
  }
}

const populateCategories = () => {

  // categories not hardcoded, dynamically generated. 

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

  // empty out the search field to let the user know that their
  // old search isn't active in the new category field

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


