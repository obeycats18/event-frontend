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
  $("#owl-menu").owlCarousel({
    items:1, 
    nav:true,
    dots: false,
    navText:[
      '<div class="food-menu-arrow-left"><img src="img/angleLeft.svg"></div>', 
      '<div class="food-menu-arrow-right"><img src="img/angleRight.svg"></div>'
    ]
  });

  $("#owl-reviews").owlCarousel({
    items:1, 
    nav:true,
    loop:true,
    dots: true,
    navText:[
      '<div class="review-arrow-left"><img src="img/Left.svg"></div>', 
      '<div class="review-arrow-right"><img src="img/Right.svg"></div>'
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
  select()
  datepickerMine()
  scrollbarMine()

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

function select () {

  $(document).ready(function() {
    $('select').niceSelect();
  });
}


function datepickerMine () {
  $(document).ready(function(){
    $('.datepicker-here').datepicker({
      autoClose:true
    });
  });
}

function scrollbarMine () {
  $('.edit-form-wraper').scrollbar()
}

function toTop () {
  $('.btn-top').on('click', function(e) {
    $('body, html').animate({scrollTop:0}, 500)
  });
}