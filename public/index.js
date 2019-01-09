"use strict";

const searchItems = () => {
  console.log(products)
}
const displayArray = ""


document.getElementById("itemlist").innerHTML = products.map((item,index)=>{
  return `<img src=${item.imgUrl} alt=${item.description} /><li>${item.name}</li>`
}).join('')

