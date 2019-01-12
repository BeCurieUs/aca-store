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
    <button class="description-addtocart" onclick="addToCart(${itemID})">Add To Cart</button>

  </div>
  `
  // showReviews();
}

const getItemById = (id) => {
  return products.find(items => {
    return items._id == id;
  })
}


const addToCart = (id) => {
  const item = JSON.parse(JSON.stringify(getItemById(id)));
  // deep copy of item so we don't mess with the orignial product array
  carduniquieid ++;
  // make unique id for cart item
  item.cartId = carduniquieid;
  // assign unique id to cart item. This allows for deletion of speicific cart items rather
  // than items of the first item of the matched product ID
  cart.push(item);

}

const displayCart = () => {
  document.getElementById("product-description").innerHTML = ""
  document.getElementById("itemlist").innerHTML = ""
  document.getElementById("cart").innerHTML = cart.map( (item,index) => {
    return `
    <div class="cart-row-container">
      ${imageCard(item,false,"div")} 
      <button class="cart-delete-item" onclick="cartDeleteItem(${item.cartId})">X</button>
    </div>
    `
  }).join("")

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


displayDefault();
populateCategories();




