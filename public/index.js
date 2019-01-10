"use strict";

const imageCard = (item, index) => {
  return `
  <li class="product-item" >
    <img src=${item.imgUrl} alt=${item.description} />
    <p class="product-title">${item.name}</p>
    <p class="product-rating">Rating: ${item.rating}</p>
    <p class="product-reviews">Reviews: ${item.reviews.length}</p>
    <p class="product-price">Price: ${item.price}</p>
    <p class="product-description">description drop down placeholder</p>

  </li>`
}

let displayArray = [];

if(displayArray){
  products.forEach((item,index)=>{
    displayArray.push(imageCard(item,index))
  });
}

const searchItems = () => {
  const formValue = document.getElementById("search-form").elements[0].value

  displayArray = products.filter( (item,index) => {
    return item.name.toLocaleLowerCase().includes(formValue) ||
    item.description.toLocaleLowerCase().includes(formValue) ||
    item.category.toLocaleLowerCase().includes(formValue);
  }).map((fliteredItem,filteredIndex) => {
    return imageCard(fliteredItem,filteredIndex)
  })
  document.getElementById("itemlist").innerHTML = displayArray

}

document.getElementById("itemlist").innerHTML = displayArray.join('');

