$(document).ready(function(){
    console.log("DOM Ready!!")
    $("#hamburgerBtn").click(function(){
      $(".sidebar").toggleClass('active')
    });
    $(".sidebarBtn_close").click(function(){
      $(".sidebar").toggleClass('active')
    });

    var productId = window.location.search.split('=')[1];
    var currentObj = null;

    function createProductImages(url, pos) {
        var image = document.createElement('img');
        image.src = url

        //To make the first image active 
        if(pos === 0) {
            image.classList.add("active-image");
        }

        image.onclick = function() {
            $('#product-images img').removeClass("active-image")
            image.classList.add("active-image");
            $('.product-preview-image').attr('src', url);
        }

        return image;
    }

    $.ajax({
        type: "GET",
        url: 'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + productId,
        success: function(data){
            currentObj = data;
            $('.product-preview-image').attr('src', data.preview)
            $('#product-title').html(data.name);
            $('#product-brand').html(data.brand);
            $('#description').html(data.description);
            $('#product-price').html(data.price);

            for(var i=0; i<data.photos.length; i++) {
                $('#product-images').append(createProductImages(data.photos[i], i));
            }
        }
    })
    $('#btn-add-to-cart').click(function(){
        //console.log(currentObj.id)
        $('#btn-add-to-cart').addClass('bigger');
        setTimeout(function(){
            $('#btn-add-to-cart').removeClass('bigger');
        },100)

        var productList = window.localStorage.getItem('product-list');
        productList = productList === null || productList === '' ? [] : productList;
        productList = productList.length > 0 ? JSON.parse(productList) : [];

        //Searching for all products 
        var foundAtPos = -1;
        for(var i=0; i < productList.length; i++) {
            console.log("From Local Storage: " + productList[i].id + " and " + "From current Obj: "+currentObj.id + " Found At Position: " + i)
            if(parseInt(productList[i].id) == parseInt(currentObj.id)) { 
                foundAtPos = i;
            }
        }

        if(foundAtPos > -1) {
            productList[foundAtPos].count = productList[foundAtPos].count + 1;//Add +1 every time cart button clicked
            console.log("No. of times Cart Button Clicked: " + productList[foundAtPos].count);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        } 
        else {
            currentObj.count = 1;
            productList.push(currentObj);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        }

        var totalCount = 0;
        for(var i=0; i<productList.length; i++) {
            totalCount = totalCount + productList[i].count;
        }
    
        $('#cart-count').html(totalCount);
    })



})