$(document).ready(function(){
console.log("DOM Ready!!")
$("#hamburgerBtn").click(function(){
  $(".sidebar").toggleClass('active')
});
$(".sidebarBtn_close").click(function(){
  $(".sidebar").toggleClass('active')
})

function renderProductCard(obj){
      var mainCard = document.createElement('div')
      mainCard.classList.add('product-card')

      var productLink = document.createElement('a')
      productLink.href = './details.html?p='+obj.id;

      var productImage = document.createElement('img')
      productImage.classList.add('product-image')
      productImage.src = obj.preview
      productImage.alt = obj.name + 'Image'

      productLink.appendChild(productImage)

      var productDetailsDiv = document.createElement('div')
      productDetailsDiv.classList.add('product-details')

      var productName = document.createElement('h4')
      productName.innerHTML = obj.name

      var productBrand = document.createElement('h5')
      productBrand.innerHTML = obj.brand

      var productPrice = document.createElement('p')
      productPrice.innerHTML = "Rs " + obj.price

      productDetailsDiv.appendChild(productName)
      productDetailsDiv.appendChild(productBrand)
      productDetailsDiv.appendChild(productPrice)

      mainCard.appendChild(productLink)
      mainCard.appendChild(productDetailsDiv)

      return mainCard;
  }
  $.ajax({
    type: "GET",
    url: "https://5d76bf96515d1a0014085cf9.mockapi.io/product",
    success: function(data,status){
      var response = data;

      for(var i=0;i<response.length;i++)
      {
        if(response[i].isAccessory){
          $('#accessory-grid').append(renderProductCard(response[i]))
          //console.log(response[i].isAccessory)
        }
        else{
          $('#clothing-grid').append(renderProductCard(response[i]))
        }
      }
    }
  })
})