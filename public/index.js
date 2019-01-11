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

  const item = products.find(items => {
    return items._id == itemID;
  })
  document.getElementById("itemlist").innerHTML = ""

  

  document.getElementById("product-description").innerHTML = `
  <div class="main-product-details">
    <img src=${item.imgUrl} alt=${item.description} />
    <div id="detail-listing"> 
      <p class="product-title">${item.name}</p>
      <p class="product-rating">Rating: ${item.rating}</p>
      <p class="product-reviews">Reviews: ${item.reviews.length}</p>
      <p class="product-price">Price: ${item.price}</p>
    </div>
  </div>
  `

  // showReviews();
}

const imageCard = (item, descriptionSelector) => {
  if(descriptionSelector){
    return `
      <li class="product-item" >
        <img src=${item.imgUrl} alt=${item.description} />
        <p class="product-title">${item.name}</p>
        <p class="product-rating">Rating: ${item.rating}</p>
        <p class="product-reviews">Reviews: ${item.reviews.length}</p>
        <p class="product-price">Price: ${item.price}</p>
        <p onclick="displayProduct('${item._id}')" class="product-description">See description</p>

      </li>`
  }
  //implicit else
  return `
  <li class="product-item" >
    <img src=${item.imgUrl} alt=${item.description} />
    <p class="product-title">${item.name}</p>
    <p class="product-rating">Rating: ${item.rating}</p>
    <p class="product-reviews">Reviews: ${item.reviews.length}</p>
    <p class="product-price">Price: ${item.price}</p>
  </li>`
}
const searchItems = () => {
  document.getElementById("product-description").innerHTML = ""
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

const displayDefault = (category) => {
  document.getElementById("product-description").innerHTML = ""
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
let filterTracker = [];

const activityTimer = setInterval(checkActivity,60000)


displayDefault();
populateCategories();




