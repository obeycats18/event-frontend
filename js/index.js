$(document).ready(function(){
  $("#owl-galery").owlCarousel({
  	items:1, 
  	loop:true,
  	autoplay: true,
  	autoplayTimeout: 3000,
  	nav:true,
  	navText:[
  		'<div class="galery-arrow-left"><img src="img/angleLeft.svg"></div>', 
  		'<div class="galery-arrow-right"><img src="img/angleRight.svg"></div>'
  	]
  });

  
  $("#owl-order-menu").owlCarousel({
    items:1, 
    nav:true,
    dots: false,
    navText:[
      '<div class="food-menu-arrow-left"><img src="../img/angleLeft.svg"></div>', 
      '<div class="food-menu-arrow-right"><img src="../img/angleRight.svg"></div>'
    ],
    
    margin: 25

  });

  toTop()
  mask()

});


function mask () { 

  let button = $("#button-send")
  let inputPhone = $("#phone-mask")
  let inputName = $("#input-name")

  inputPhone.mask("+38(999) 999-9999");
  button.click(function (event) {
    console.log({
      name: inputName.val(),
      phone: inputPhone.val()
    })  
  })
}

function toTop () {
  $('.btn-top').on('click', function(e) {
    $('body, html').animate({scrollTop:0}, 500)
  });
}