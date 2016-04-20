jQuery(document).ready(function($) {
  $('#play-button').on('click', function(ev) {
    $('.video-overlay').addClass('clicked');
    $("#video")[0].src += "&autoplay=1";
    ev.preventDefault();
  });
});

$(function mobileToggle(){
  
  $(document).click(function () {
    $(".mobile-toggle").removeClass('open');
    $('.main-menu li').removeClass('active');
  });

  $('.mobile-toggle').click(function(e){
    e.preventDefault();
    var $this = $(this);
    if($(this).hasClass('open')){
      $($this).removeClass('open');
      $('.main-menu li').removeClass('active');
    } else {
      $($this).addClass('open');
      $('.main-menu li').addClass('active');
      return false;
    }
  });
});

$(function loadMore(){
  $(".work-container").slice(0, 1).show(); // select the first container if works
  $(".btn-load-more").click(function(e){ // click event for load more
    e.preventDefault();
    $(".work-container:hidden").slice(0, 1).show(); // select next hidden container of worksand show it
    if($(".work-container:hidden").length == 0){ // check if any hidden containers still exists
      $(".btn-load-more").html("No more images :(").hide(); // alert if there are none left and hide button
    }
  });
});

$(function StickyNav(){
  var top = $('.nav').offset().top ;

  $(window).scroll(function (event) {
    // what the y position of the scroll is
    var y = $(this).scrollTop();
    // whether that's below the form
    if (y >= top) {
      // if so, ad the fixed class
      $('.nav').addClass('fixed');
      $('.mobile-toggle').addClass('fixed-nav');
    } else {
      // otherwise remove it
      $('.nav').removeClass('fixed');
      $('.mobile-toggle').removeClass('fixed-nav');
    }
  });
});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


$(function testimonials(){
  $('.control-dot').first().addClass('active');
  $('.slider-unit').first().addClass('active');

  $('.control-dot').click(function(){
    var $this = $(this),
    $dotLength = $this.parent().children(),
    position = $dotLength.index($this);
    
    $('.control-dot').removeClass('active').eq(position).addClass('active');
    $('.slider-unit').removeClass('active').eq(position).addClass('active');
  });
});



function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

$(function contactValidation(){
  $('.error').hide();
  $(".btn-contact").click(function() {
  // validate and process form here
    $('.error').hide();
    var name = $("#contact-name").val();
    if (name === "") {
      $("#contact-name_error").show();
      $("#contact-name").focus();
      return false;
    }
    var email = $("#contact-email").val();
    if (email === "") {
      $("#contact-email_error").html("*This field is required!").show();
      $("#contact-email").focus();
      return false;
    } else if (validateEmail(email) == false){
      $("#contact-email_error").html("*This is not a valid email").show();
      $("#contact-email").focus();
      return false;
    }
    var message = $("#contact-message").val();
    if (message === "") {
      $("#contact-message_error").html("*Oh come on, write something:)").show();
      $("#contact-message").focus();
      return false;
    }

    var dataRegisterString = 'name='+ name + '&email=' + email + '&message=' + message;
    // alert (dataRegisterString);return false;
    $.ajax({
      type: "POST",
      // url: "src/process.php",
      data: dataRegisterString,
      success: function() {
      
        $('#contact-wrapper').html("<div id='contact-message-output'></div>");
        $('#contact-message-output').html("<h2>Your message was sent successfully! <i class='fa fa-check'></i> </h2>")
        .append("<p>We will be in touch soon.</p>")
        .hide()
        .fadeIn(1500, function() {
          $('#contact-message-output');
        });
      }
    });
    return false
    });
});
