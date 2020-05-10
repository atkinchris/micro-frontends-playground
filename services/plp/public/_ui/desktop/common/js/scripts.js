$(document).ready(function() {

  $('.searchButton').click(function(event) {
    var searchTerm = $('.text').val();
    $('.text_email').parent().removeClass("error");
    $('.formErrorIcon').parent().removeClass("text_hide");
    $(".formErrorIcon").remove();
    $(".form_field_error-message").remove();

    if (!searchTerm) {
      event.preventDefault();
      if ($('.form_field_error-message').length == 0) {
        $(".text_email").parent().parent().append('<div id="search-empty-errors" class="form_field_error-message"><span aria-live="assertive" role="alert" alt="Please complete a product search" title="Please complete a product search">Please complete a product search</span></div>');
        $('#search').attr('alt', 'Please complete a product search');
        $('#search').attr('title', 'Please complete a product search');
      }
      $(".text").focus();
    }
  });

  var dropdownht = 0;

  $('li.Lb-frame').each(function(j) {
    var ht = $(this).height();
    if ((ht > 360) && (ht > dropdownht)) {
      dropdownht = ht;
    }
  });


  $('li.Lb-frame').each(function(j) {
    $(this).height(dropdownht);
  });
  /************************************Toggle Radio button/ Show Checkout Registration**************************************************/

  $(".inline").colorbox({
    inline: true,
    width: "50%"
  });

  /* Return to checkout options */
  var radioBtn = $('<label><input type="radio" name="checkoutReg" value="1" class="checkoutGuestReturn" />Back to guest checkout</label>'); {
    radioBtn.appendTo('.guestCheckoutReturn');
  };

  /* Toggle Continue buttons */
  $(':radio[name=checkoutRadio]').change(function() {
    if ($('.checkoutRegClick').is(':checked')) {
      $('.regCheckoutButton').css('display', 'block');
      $('.guestCheckoutButton').css('display', 'none');
    } else if ($('.checkoutGuestClick').is(':checked')) {
      $('.regCheckoutButton').css('display', 'none');
      $('.guestCheckoutButton').css('display', 'block');
    }
  });

  $('.regCheckoutButton').css('display', 'none');

  $('.regCheckoutButton').click(function() {

    var email = $("#guest_email").val();
    var formdata = $("#guestForm").serialize();


    $.ajax({
      url: "/login/checkout/findUser",
      type: "POST",
      data: formdata,
      success: function(data, textStatus, jqXHR) {
        $('.text_email').parent().removeClass("error");
        $('.formErrorIcon').parent().removeClass("text_hide");
        $(".formErrorIcon").remove();
        $(".form_field_error-message").remove();

        if (data == "true") {
          $(".text_email").parent().addClass("error");
          console.log($(".form_field_error-message").length);
          if ($(".formErrorIcon").length == 0) {
            $(".text_email").parent().parent().append('<div class="formErrorIcon text_hide">Error icon</div>');
          }
          if ($('.form_field_error-message').length == 0) {
            $(".text_email").parent().parent().append('<div class="form_field_error-message"><span id="email.errors">You already have a Tu account. Please login to continue</span></div>');
          }
        } else if (data == "false") {
          $('.checkoutRegisterHolder').show();
          $('.registerForm').css('display', 'block');
          $('.regToggle').hide();
          $('.registerFormBenefits').hide();
          $('.checkoutRegisterHolder .registerFormSeparator').show();
          $('.checkoutGuestForm').hide();
          $('.guestCheckoutReturn').show();
          $('.registerFormHolder h2').text('New Tu customers');
          $('.registerFormHolder h3').text('Register for a Tu account');
          if ($('.negative').is(':visible')) {
            $('.negative').css('display', 'none');
            $('.page-checkout-login .regNectarFields').css('display', 'none');
          };

        } else if (data == "invalidemail") {
          $(".text_email").parent().addClass("error");
          console.log($(".form_field_error-message").length);
          if ($(".formErrorIcon").length == 0) {
            $(".text_email").parent().parent().append('<div class="formErrorIcon text_hide">Error icon</div>');
          }
          if ($('.form_field_error-message').length == 0) {
            $(".text_email").parent().parent().append('<div class="form_field_error-message"><span id="email.errors">Please enter a valid email address</span></div>');
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert("GOT Error");
      }
    });
  });


  if ($('.negative').is(':visible')) {
    $('.page-checkout-login .regNectarFields').css('display', 'none');
  };

  if ($('#tuApplyVoucherForm .form_field-input').hasClass('error')) {
    $('.basketPromoHolder').css({
      display: 'block',
      left: '-38px'
    });
  };

  $('#guestForm').keypress(function(event) {
    if ((event.keyCode == 10 || event.keyCode == 13) && ($('.checkoutRegClick').attr('checked'))) {
      event.preventDefault();
      var email = $("#guest_email").val();
      var formdata = $("#guestForm").serialize();


      $.ajax({
        url: "/login/checkout/findUser",
        type: "POST",
        data: formdata,
        success: function(data, textStatus, jqXHR) {
          $('.text_email').parent().removeClass("error");
          $('.formErrorIcon').parent().removeClass("text_hide");
          $(".formErrorIcon").remove();
          $(".form_field_error-message").remove();

          if (data == "true") {
            $(".text_email").parent().addClass("error");
            console.log($(".form_field_error-message").length);
            if ($(".formErrorIcon").length == 0) {
              $(".text_email").parent().parent().append('<div class="formErrorIcon text_hide">Error icon</div>');
            }
            if ($('.form_field_error-message').length == 0) {
              $(".text_email").parent().parent().append('<div class="form_field_error-message"><span id="email.errors">You already have a Tu account. Please login to continue</span></div>');
            }
            $('.checkoutRegClick').focus();

          } else if (data == "false") {
            $('.checkoutRegisterHolder').show();
            $('.registerForm').css('display', 'block');
            $('.regToggle').hide();
            $('.registerFormBenefits').hide();
            $('.checkoutRegisterHolder .registerFormSeparator').show();
            $('.checkoutGuestForm').hide();
            $('.guestCheckoutReturn').show();
            $('.registerFormHolder h2').text('New Tu customers');
            $('.registerFormHolder h3').text('Register for a Tu account');
            if ($('.negative').is(':visible')) {
              $('.negative').css('display', 'none');
              $('.page-checkout-login .regNectarFields').css('display', 'none');
            };

          } else if (data == "invalidemail") {
            $(".text_email").parent().addClass("error");
            console.log($(".form_field_error-message").length);
            if ($(".formErrorIcon").length == 0) {
              $(".text_email").parent().parent().append('<div class="formErrorIcon text_hide">Error icon</div>');
            }
            if ($('.form_field_error-message').length == 0) {
              $(".text_email").parent().parent().append('<div class="form_field_error-message"><span id="email.errors">Please enter a valid email address</span></div>');
            }
            $('.checkoutRegClick').focus();
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert("GOT Error");
        }
      });
    }
  });


  $('.guestCheckoutButton').click(function() {
    $('.checkoutRegisterHolder').hide();
    $('.registerForm').css('display', 'none');
    $('.regToggle').hide();
    $('.registerFormBenefits').hide();
    $('.checkoutRegisterHolder .registerFormSeparator').show();
    $('.checkoutGuestForm').show();
    $('.checkoutRegClick').prop('checked', false);
    $('.checkoutGuestReturn').prop('checked', false);
    $('.guestCheckoutReturn').hide();
    $('.registerFormHolder h2').hide();
    $('.registerFormHolder h3').hide();
  });

  $('.guestCheckoutReturn label').click(function() {
    $('.checkoutRegisterHolder').hide();
    $('.registerForm').css('display', 'none');
    $('.regToggle').hide();
    $('.registerFormBenefits').hide();
    $('.checkoutRegisterHolder .registerFormSeparator').hide();
    $('.checkoutGuestForm').show();
    $('.checkoutRegClick').attr('checked', false);
    $('.checkoutGuestClick').attr('checked', true);
    $('.checkoutGuestClick').focus();
    $('.registerFormHolder h2').text('New Tu customers');
    $('.registerFormHolder h3').text('Register for a Tu account');
    $('.guestCheckoutReturn').hide();
    $('.regCheckoutButton').css('display', 'none');
    $('.guestCheckoutButton').css('display', 'block');
    $('#guest_email').val($('#register_email').val());
  });



  $('.checkoutRegClick').click(function() {
    $('.checkoutRegClick').attr('checked', true);
    $('.checkoutGuestClick').attr('checked', false);
  });
  $('.checkoutGuestClick').click(function() {
    $('.checkoutRegClick').attr('checked', false);
    $('.checkoutGuestClick').attr('checked', true);
  });

  /*$(':radio[name=checkoutRadio]').change(function(){
	    $('.checkoutRegisterHolder').toggle();
	    $('.registerForm').css('display','block');
	    $('.regToggle').hide();
	    $('.registerFormBenefits').hide();
	    $('.checkoutRegisterHolder .registerFormSeparator').show();
	    $('.checkoutGuestForm').toggle();
	    $('.registerFormHolder h2').text('New Tu customers');
	    $('.registerFormHolder h3').text('Register for a Tu account');
	});


    $(':radio[name=checkoutReg]').click(function(){
	    $('.checkoutRegisterHolder').toggle();
	    $('.registerForm').css('display','none');
	    $('.regToggle').hide();
	    $('.registerFormBenefits').hide();
	    $('.checkoutRegisterHolder .registerFormSeparator').hide();
	    $('.checkoutGuestForm').toggle();
	    $('.checkoutRegClick').prop('checked', false);
	    $('.checkoutGuestReturn').prop('checked', false);
	    $('.checkoutGuestClick').prop('checked',true);
	    $('.registerFormHolder h2').text('New Tu customers');
	    $('.registerFormHolder h3').text('Register for a Tu account');
	});*/

  if ($('.checkoutRegisterHolder').hasClass('checkoutRegisterHolderError')) {
    $('.checkoutGuestForm.justVisitingFormHolder').css('display', 'none');
    $('.registerFormHolder h2').text('New Tu customers');
    $('.registerFormHolder h3').text('Register for a Tu account');
    $('.regContactTerms .form_field_error .form_field_error-message span').css({
      'position': 'relative',
      'top': '10px'
    });
    $('.registerButton').css({
      'width': '225px',
      'margin': '0 0 0 15px'
    });
  };

  //Carry forward email from guest check out to registered.
  $('#guest_email').change(function() {
    $('#register_email').val($(this).val());
  });

  $('#register_email').change(function() {
    $('#guest_email').val($(this).val());
  });

  $('.checkoutGuestReturn').click(function() {
    $('.guestCheckoutButton').addClass('guestSelected');
  });

  /************************************Generic Tooltip**************************************************/

  $('.tuToolTip').tooltipster();

  $('#nectarTooltip').tooltipster({
    content: $('<p>Enter the last 11 digits</p><div class="nectarImg">Nectar Card</div>')
  });


  /************************************Show/ Hide Toggle**************************************************/

  $('#showPromo').click(function() {
    $('.basketPromoHolder').toggle();
    if ($('.basketPromoHolder').is(':visible')) {
      $('#showPromo span').css('background-position', '0 -712px');
    };
    if ($('.basketPromoHolder').is(':hidden')) {
      $('#showPromo span').css('background-position', '0 -691px');
    };
  });
  if ($('.basketPromoHolder .form_field-input').hasClass('error')) {
    $('#showPromo span').css('background-position', '0 -712px');
    $('#showPromo span').addClass('minus');
  };

  /************************************selectobox js plugin**************************************************/

  if ($.isFunction($.fn.selectBox)) {
    $('select').selectBox();
  }

  $('a#close-autosearch').click(
    function() {
      $('#search').val('');
    });

  /************************************Size guide popup**************************************************/

  $(".sizeguide-trigger").colorbox({
    overlayClose: true,
    scrolling: true,
    title: true,
    width: 906,
    height: 650,
    fixed: true,
    onComplete: function() {
      $('#sizeChart #tabType li').first().addClass('active-tab');
      $('#sizeChart #tabs1').addClass('active-tab-content');

      $('#sizeChart #tabType').click(function(ev) {
        ev.preventDefault();
        var $target = $(ev.target);
        if (!$target.is('li'))
          $target = $target.parents('li');
        if ($target.is('li')) {
          var id = $target.index(),
            $content = $('#sizeChart div.tabs:eq(' + id + ')');

          $('#sizeChart .active-tab').removeClass('active-tab');
          $('#sizeChart .active-tab-content').removeClass('active-tab-content');
          $target.addClass('active-tab');
          $content.addClass('active-tab-content');
        }

      });
    }
  });
  $(".termsandconditions-trigger").colorbox({
    overlayClose: true,
    scrolling: true,
    title: true
  });



  /************************************Size guide popup **************************************************/

  /*	$("#zoomLink").colorbox({
  	    width:"990px",
  	    height:"100%"
  	});*/

  /************************************floating drop down menu**************************************************/

  var nav = {
    to: null,
    $ph: $('#nav_placeholder'),
    $window: $(window),
    $body: $('#nav_main'),
    $cart: $('#nav_cart'),
    clearTO: function() {
      if (this.to != null) {
        clearTimeout(this.to);
        this.to = null;
      }

    },
    delay: 100,
    setPos: function() {
      var top = nav.$ph.position().top;
      if (nav.$window.scrollTop() > top) {
        nav.$body.css({
          position: 'fixed',
          top: '0px'
        });
        nav.$cart.show();
      } else {
        nav.$body.css({
          position: 'absolute',
          top: top + 'px'
        });
        nav.$cart.hide();
      }
    },
    setActive: function(node) {
      $('#nav_block .active-nav').removeClass('active-nav');
      if (node)
        $(node).addClass('active-nav');
    },
    init: function() {
      if ($('#nav_placeholder').length == 0)
        return;

      nav.setPos();
      nav.$window.scroll(function() {
        nav.setPos();
        cart.reset();
      });

      var dropdownshown = false;
      var showdropdown = (function() {
        var dropdowntimer = 0;
        return function(callback, ms) {
          clearTimeout(dropdowntimer);
          dropdowntimer = setTimeout(callback, ms);
        };
      })();

      $('#nav_block li.La').on('mouseover', function(ev) {
        var that = this;
        if (dropdownshown == true) {
          showdropdown(function() {
            nav.setActive(that)
            dropdownshown = true;
          }, 200);
        } else {
          showdropdown(function() {
            dropdownshown = true;
            nav.setActive(that)
          }, 0);
        }
      });

      $('#nav_block').on('mouseleave', function(ev) {
        showdropdown(function() {
          dropdownshown = false;
          nav.setActive(0)
        }, 0);
      });
    }
  };
  nav.init();





  /************************************Login Show/ Hide Password**************************************************/

  $('.show-hide-password').each(function() {
    var $node = $('input', this);
    $node.after('<a href="#" class="hide-show-button" data-show="Show" data-hide="Hide">Show</a>');
  }).click(function(ev) {
    var $target = $(ev.target);
    if ($target.is('.hide-show-button')) {
      ev.preventDefault();
      if ($target.html() == $target.attr('data-show')) {

        $('input', this)[0].type = 'text';
        $('input.password').each(function() {
          $(this)[0].type = 'text';
        });
        $target.html($target.attr('data-hide'));
      } else {
        $('input', this)[0].type = 'password';
        $('input.password').each(function() {
          $(this)[0].type = 'password';
        });
        $target.html($target.attr('data-show'));
      }
    }
  });


  /************************************Popup cart **************************************************/

  var cart = {
    $popup: $('#rollover_cart_popup'),
    to: null,
    init: function() {
      if ($('#cart_header').length == 0)
        return;

      //set cart default state
      cart.$popup.css('display', 'none');

      this.load({
        url: cart.$popup.attr('data-load'),
        method: 'GET'
      });
      this.setItemsCount();

      //hide cart if doc is clicked
      $(document).on('click', function(ev) {
        var $target = $(ev.target);
        if (!$target.is('#cart_header, #rollover_cart_popup, #nav_cart, #addToCartButton'))
          $target = $target.parents('#cart_header, #rollover_cart_popup, #nav_cart, #addToCartButton');
        if (!$target.is('#cart_header, #rollover_cart_popup, #nav_cart, #addToCartButton'))
          cart.toggleCart(false);
      });

      //hide show cart when at the top
      $('#cart_header').click(function(ev) {
        var $node = $(this);

        if ($node.is('.disabled')) {
          ev.preventDefault();
          return;
        }

        $node = $(ev.target);
        if (!$node.is('#cart_link'))
          $node = $node.parents('#cart_link');

        if ($node.is('#cart_link')) {
          ev.preventDefault();
          cart.reload();
        }
      });

      this.$popup.bind('click', function(ev) {
        var $target = $(ev.target);
        if ($target.is('.removeCartItem')) {
          ev.preventDefault();
          var url = $target.attr('href');
          // Unset href to avoid multiple ajax requests in quick succession
          $target.attr('href', '');
          // Fire ajax request only on valid URL
          if (url) {
            cart.load({
              url: url,
              method: 'POST',
              fn: function () {
                cart.refreshScreen();
              }
            });
          }
        } else if (!$target.is('.prev,.next')) {
          $target = $target.parents('.prev,.next');
        }
        if ($target.is('.prev,.next')) {
          ev.preventDefault();
          cart[$target.is('.prev') ? 'scrollDown' : 'scrollUp']();
        }
      });

      //hide show cart when floating
      $('#nav_cart').click(function(ev) {
        ev.preventDefault();
        cart.reload();
      });

      var toggleSubmitButtonState = function (state) {
        // Enable/Disable submit (Add to Basket) button
        document.getElementById('AddToCart').disabled = state;
      };

      //"add to cart" popup integration into existing cart
      $('.add_to_cart_form, .add_to_cart_storepickup_form').ajaxForm({
        beforeSubmit: function () { toggleSubmitButtonState(true); },
        success: function(data) {

          try {
            toggleSubmitButtonState(false);
            var maxQntyExceeded = data.cartData.maxQntyExceeded;
            if (maxQntyExceeded == 'yes') {
              $('#maxQntyExceeded').css("display", "block");
              $('#addToCartError').css("display", "none");
              $('#addToCartConfirm').css("display", "none");
            } else if (data.cartData.insufficientStock == 'yes') {
              $('#maxQntyExceeded').css("display", "none");
              $('#addToCartError').css("display", "block");
              $('#addToCartError').empty().append(data.cartData.errorMsg);
              $('#addToCartConfirm').css("display", "none");
            } else if (data.cartData.errorMsg) {
              $('#maxQntyExceeded').css("display", "none");
              if (data.cartData.errorMsg === 'Please provide a positive number to update the quantity of an item.') {
                $('#addToCartError').empty().html(data.cartData.errorMsg);
                $('#addToCartError').css("display", "none");
                $('.pdp-add-to-cart-error-message').show();
                $('#Size').css('border', '2px solid #C00C0C');
                $('.sizeBox').addClass('errorState');
                $('.sizeBox .formErrorIcon').show();
              } else {
                $('#addToCartError').empty().html(data.cartData.errorMsg);
                if (data.cartData.errorMsg === 'Sorry, there is insufficient stock for your basket') {
                  $('.pdp-add-to-cart-error-message').hide();
                  $('#addToCartError').css("display", "block");
                } else {
                  $('.pdp-add-to-cart-error-message').show();
                  $('#addToCartError').css("display", "none");
                }
              };
              $('#addToCartConfirm').css("display", "none");

            } else {

              $('#maxQntyExceeded').css("display", "none");
              $('#addToCartError').css("display", "none");
              //$('#addToCartConfirm').css("display", "block");

              cart.loadJSONData(data);
              cart.showAnywhere();
            }
          } catch (ex) {
            console.warn(ex);
            toggleSubmitButtonState(false);
          }
          //server could not add any more items
          //					if (data.cartData.quantity==0) {
          //						alert(data.cartData.errorMsg);
          //						return;
          //					}

        },
        error: function () {
          toggleSubmitButtonState(false);
        }
      });

      /*
      window.ACC.cartpopup={
      	refreshMiniCart:function(){
      		cart.update();
      	}
      };
      */
    },
    scrollUp: function() {
      var $stage = $('.stage', this.$popup),
        $scroller = $('ul', $stage),
        $active = $('.active', $scroller),
        $next = $active.next(),
        top = Math.abs(parseInt($scroller.css('top'))),
        newTop = parseInt($next.attr('data-top') || 0),
        adj = parseInt(this.$popup.attr('data-stage-height')) - $stage.outerHeight();

      if (adj != top && $next.length == 1) {
        if (newTop > adj)
          newTop = adj;

        $scroller.animate({
            top: -newTop + 'px'
          },
          'fast',
          function() {
            $active.removeClass('active');
            $next.addClass('active');
            $('.prev', cart.$popup).css('visibility', 'visible');
            $('.next', cart.$popup).css('visibility', (newTop == adj || $next.index() == $('li', $scroller).length - 1 ? 'hidden' : 'visible'));
          });
      }
    },
    scrollDown: function() {

      var $stage = $('.stage', this.$popup),
        $scroller = $('ul', $stage),
        $active = $('.active', $scroller),
        $prev = $active.prev(),
        newTop = parseInt($prev.attr('data-top') || 0);

      if ($prev.length == 1) {
        $scroller.animate({
            top: -newTop + 'px'
          },
          'fast',
          function() {
            $active.removeClass('active');
            $prev.addClass('active');
            $('.prev', cart.$popup).css('visibility', $prev.index() == 0 ? 'hidden' : 'visible');
            $('.next', cart.$popup).css('visibility', 'visible');
          });
      }
    },
    setItemsCount: function() {
      var txt = $('.cartItemsText').html().replace('i', 'I'),
        count = parseInt(txt.replace(/.*([0-9]+).*/, '$1'));

      if (isNaN(count))
        txt = '0 ' + $.trim(txt);

      $('.nav_cart_text').html(txt);
    },
    loadJSONData: function(data) {
      var products = data.cartData.products,
        $topCart = $('#minicart_data'),
        $fCartItems = $('#nav_cart .nav_cart_text'),
        $cartItems = $topCart.children('.cartItemsText'),
        $cartTotal = $topCart.children('.cartItemsTotal'),
        $title = $('#basket-title'),
        count = 0,
        i,
        txt = '';
      if (data.cartPopupHtml)
        cart.$popup.html(data.cartPopupHtml);

      if (products.length > 0) {
        for (i = 0; i < products.length; i++)
          count += parseInt(products[i].qty);
      }

      $fCartItems.html($fCartItems.html().replace(/[0-9]+/, count));
      var $cartItemsContent = "";
      if (count == 1) {
        $cartItemsContent = count + "&nbsp;item";
      } else {

        $cartItemsContent = count + "&nbsp;items";
      }

      $cartItems.html($cartItemsContent);

      var cartTotal = data.cartData.total.toString();
      if (cartTotal.indexOf('.') == -1)
        cartTotal += '.';
      var dot = cartTotal.indexOf('.') + 1;
      while (cartTotal.substring(dot, cartTotal.length).length < 2)
        cartTotal += '0';

      if (dot > 4) {
        cartTotal = cartTotal.substring(0, dot - 4) + "," + cartTotal.substring(dot - 4, cartTotal.length)
      }

      if ($.trim($cartTotal.html()).length == 1) {
        $cartTotal.html($cartTotal.html() + ' ' + cartTotal)
      } else {
        $cartTotal.html($cartTotal.html().replace(/[0-9,]*\.[0-9]*/, cartTotal));
      }

      if (count == 0) {
        cart.toggleCart(false);
        $cartItems.hide();
        $cartTotal.hide();
        $title.html($title.attr('data-empty'));
        $('#cart_link').attr('title', 'Your basket is empty');
        $('#cart_link .icon').attr('title', 'Your basket is empty');
        $('#cart_button').attr('title', 'Your basket is empty');
      } else {
        $cartItems.show();
        $cartTotal.show();
        $('#addToCartButton').attr('disabled', false);
      }
      $('#cart_header')[count == 0 ? 'addClass' : 'removeClass']('disabled');
      if (data.tracking) {
        try {
          var track = data.tracking;
          var action = (track.event.event_type == 'scAdd' ? 'AddToCart' : 'RemoveFromCart');
          $(window).trigger(action, track);
        } catch (ex) {}
      }
    },
    reset: function() {
      cart.toggleCart(false);
    },
    reload: function() {
      var $added = this.$popup.children('.cart-updated');
      if ($added.is('.cart-updated')) {
        this.clearTO();
        this.load({
          url: cart.$popup.attr('data-load'),
          method: 'GET',
          fn: function() {
            cart.toggleCart(true);
          }
        });
      } else
        this.toggleCart();
    },

    toggleCartText: function(show) {
      var $title = $('#basket-title');
      $title.html($title.attr(show ? 'data-close' : 'data-open'));
      if ($('#basket-title:contains("View basket")').length > 0) {
        $('#cart_link').attr('title', 'View your basket');
        $('#cart_link .icon').attr('title', 'View your basket');
        $('#cart_button').attr('title', 'Proceed to Checkout');
      } else if ($('#basket-title:contains("Close basket")').length > 0) {
        $('#cart_link').attr('title', 'Close your basket');
        $('#cart_link .icon').attr('title', 'Close your basket');
        $('#cart_button').attr('title', 'Proceed to Checkout');
      };
    },
    toggleScreen: function(show) {

      if (!show)
        return;

      var $scroller = $('ul', this.$popup),
        $items = $('li', $scroller),
        $stage = $('.stage', this.$popup).css('height', 'auto'),
        cartHeight = 0,
        stageHeight = 0,
        activeNodePos = 0,
        diff = 20,
        $floatCart = $('#nav_cart'),
        $staticCart = $('#cart_link');

      if ($items.length < 2)
        return;

      $scroller.css('top', '0px');
      $items.removeClass('active').first().addClass('active');

      this.$popup.addClass('cart-calc-height').removeClass('cart-scrollable');
      cartHeight = this.$popup.outerHeight();
      stageHeight = $stage.outerHeight();
      this.updateLIHeight();
      this.$popup.removeClass('cart-calc-height');

      if ($floatCart.css('display') == 'block')
        activeNodeTop = $floatCart.offset().top + $floatCart.outerHeight();
      else
        activeNodeTop = $staticCart.offset().top + $staticCart.outerHeight();


      var windowHeight = $(window).height(),
        windowTop = $(window).scrollTop(),
        windowBottom = windowTop + windowHeight,
        cartBottom = activeNodeTop + cartHeight;


      if (windowBottom <= cartBottom) {
        diff += (cartBottom - windowBottom);
        $stage.css('height', (stageHeight - diff) + 'px');
        $('.prev', this.$popup).css('visibility', 'hidden');
        $('.next', this.$popup).css('visibility', 'visible');
        this.$popup.addClass('cart-scrollable').attr('data-stage-height', stageHeight).attr('data-stage-mask', $stage.outerHeight());
      } else {
        this.$popup.removeClass('cart-scrollable');
      }

      //$('body').append('<div style="position:absolute;border:solid 1px red;top:'+windowTop+'px;left:0;z-index:9999;width:100%;height:'+windowHeight+'px;"></div>');
      //$('body').append('<div style="position:absolute;border:solid 1px blue;top:'+activeNodeTop+'px;left:0;z-index:9999;width:100%;height:'+cartHeight+'px;"></div>');
    },
    updateLIHeight: function() {
      var dataHeight = 0;
      $('.stage li', this.$popup).each(function() {
        dataHeight += $(this).attr('data-top', dataHeight).outerHeight();
      });
    },
    refreshScreen: function() {
      if (this.$popup.is('.cart-scrollable')) {
        var $scroller = $('ul', this.$popup),
          $items = $('li', $scroller),
          $stage = $('.stage', this.$popup),
          resetHeight = parseInt(this.$popup.attr('data-stage-mask')),
          liHeight = 0;

        if ($items.length < 2) {
          this.$popup.removeClass('cart-scrollable');
          $scroller.css('top', '0px');
          $stage.css('height', 'auto');
        } else {
          this.updateLIHeight();
          liHeight = parseInt($items.last().attr('data-top')) + $items.last().outerHeight();
          if (liHeight < resetHeight)
            resetHeight = liHeight;

          $stage.css('height', resetHeight + 'px');
          $scroller.css('top', '0px');
          $('.prev', this.$popup).css('visibility', 'hidden');
          $('.next', this.$popup).css('visibility', 'visible');
          $items.removeClass('active').first().addClass('active');
        }
      }
    },
    clearTO: function() {
      if (this.to != null) {
        clearTimeout(cart.to);
        cart.to = null;
      }
    },
    toggleCart: function(show) {

      if ($('#cart_header').is('.disabled'))
        return;

      var toggle = function() {};

      //floating cart
      if ($('#nav_cart').css('display') == 'block') {
        $('#nav_cart').parent().append(cart.$popup);
        toggle = function(show) {
          cart.toggleScreen(show);
        };
      }
      //top cart
      else {
        $('#cart_header_box').append(cart.$popup);
        toggle = function(show) {
          cart.toggleScreen(show);
          cart.toggleCartText(show);
        };
      }

      if (typeof show == 'undefined' && cart.$popup.css('display') == 'block' || show === false) {
        toggle(false);
        cart.$popup.fadeOut(function() {
          cart.$popup.css('display', 'none');
          $(window).trigger("CloseCart", {
            event: {
              event_type: 'scClose'
            }
          });
        });
      } else if ((typeof show == 'undefined' && cart.$popup.css('display') != 'block') || show === true) {
        toggle(true);
        if (cart.$popup.css('display') != 'block') {
          cart.$popup.fadeIn(function() {
            cart.$popup.css('display', 'block');
            $(window).trigger("OpenCart", {
              event: {
                event_type: 'scOpen'
              }
            });
          });
        }
      }
    },
    showAnywhere: function() {

      cart.clearTO();
      cart.toggleCart(true);
      cart.to = setTimeout(function() {
        cart.toggleCart(false);
      }, 4000);
    },
    load: function(ob) {
      $.ajax({
        url: ob.url,
        cache: false,
        type: ob.method,
        success: function(result) {
          cart.loadJSONData(result);
          if (typeof ob.fn == 'function')
            ob.fn.call();
        }
      });
    }
  };


  if ($('#basket-title:contains("Your basket is empty")').length > 0) {
    $('#cart_link').attr('title', 'Your basket is empty');
    $('#cart_link .icon').attr('title', 'Your basket is empty');
  } else if ($('#basket-title:contains("View basket")').length > 0) {
    $('#cart_link').attr('title', 'View your basket');
    $('#cart_link .icon').attr('title', 'View your basket');
  } else if ($('#basket-title:contains("Close basket")').length > 0) {
    $('#cart_link').attr('title', 'Close your basketClose your basket');
    $('#cart_link .icon').attr('title', 'Close your basket');
  };

  cart.init();


  /************************************colorbox **************************************************/

  $(".modal").colorbox({
    onComplete: function() {
      ACC.common.refreshScreenReaderBuffer();
    },
    onClosed: function() {
      ACC.common.refreshScreenReaderBuffer();
    }
  });

  /************************************ UI Tabs **************************************************/
  $("#tabs").tabs();
  //$('#checkoutContentPanel .delivery_method_item').tabs(); -- adds tabs to delivery options page

  /************************************ Star ratings **************************************************/
  $('.bv-rating-box').last().each(function() {
    var $marker = $(this);
    var to = 0;
    var listener = setInterval(function() {
      to += 20;
      if (to >= 5000 || $marker.html() != '') {
        clearInterval(listener);
        $('.bv-rating-label').each(function() {
          var $me = $(this);
          if ($me.html().indexOf('(0)') == -1) {
            $me.parents('.bv-rating-box').show();
          } else {
            $me.parents('.bv-rating-box').hide();
          }
        });
      }
    }, 20);
  });

  $('#BVRRSummaryContainer').live('click', function() {
    $('#tab-reviews').removeClass('ui-tabs-hide');
    $('#tab-details').addClass('ui-tabs-hide');
    $('#tab-deliveryTab').addClass('ui-tabs-hide');
    $('#tab_03').addClass('ui-tabs-selected ui-state-active');
    $('#tab_01').removeClass('ui-tabs-selected ui-state-active');
    $('#tab_strip li:nth-child(2)').removeClass('ui-tabs-selected ui-state-active');
    return false;
  });

  /************** Add Accessibility roles to tabs and amend on change ************/

  $('.tab_02').attr('title', 'View information about Delivery & Returns');
  $('#tab_strip li:nth-child(2)').attr('id', 'tab_02');
  $('#tab_02').attr('aria-controls', 'tab-deliveryTab');
  $('#tab_02').attr('aria-selected', 'false');
  $('#tab_02').attr('role', 'tab');
  $('#tab_02').attr('tabindex', '-1');
  $('#tab-deliveryTab').attr('aria-labelledby', 'tab_02');
  $('#tab-deliveryTab').attr('role', 'tabpanel');
  $('#tab-deliveryTab').attr('aria-hidden', 'true');


  $('.tab_01').click(function() {
    $('#tab_01').attr('aria-selected', 'true');
    $('#tab_01').attr('tabindex', '0');
    $('#tab_02').attr('aria-selected', 'false');
    $('#tab_02').attr('tabindex', '-1');
    $('#tab_03').attr('aria-selected', 'false');
    $('#tab_03').attr('tabindex', '-1');
    $('#tab-details').attr('aria-hidden', 'false');
    $('#tab-deliveryTab').attr('aria-hidden', 'true');
    $('#tab-reviews').attr('aria-hidden', 'true');
    $('#tab-deliveryTab').attr('aria-hidden', 'true');
    $('#tab-details').removeAttr('tabindex');
    $('#tab-reviews').removeAttr('tabindex');
    $('#tab-deliveryTab').removeAttr('tabindex');
  });

  $('.tab_02').click(function() {
    $('#tab_01').attr('aria-selected', 'false');
    $('#tab_01').attr('tabindex', '-1');
    $('#tab_02').attr('aria-selected', 'true');
    $('#tab_02').attr('tabindex', '0');
    $('#tab_03').attr('aria-selected', 'false');
    $('#tab_03').attr('tabindex', '-1');
    $('#tab-details').attr('aria-hidden', 'true');
    $('#tab-deliveryTab').attr('aria-hidden', 'false');
    $('#tab-reviews').attr('aria-hidden', 'true');
    $('#tab-details').removeAttr('tabindex');
    $('#tab-reviews').removeAttr('tabindex');
    $('#tab-deliveryTab').removeAttr('tabindex');
  });

  $('.tab_03').click(function() {
    $('#tab_01').attr('aria-selected', 'false');
    $('#tab_01').attr('tabindex', '-1');
    $('#tab_02').attr('aria-selected', 'false');
    $('#tab_02').attr('tabindex', '-1');
    $('#tab_03').attr('aria-selected', 'true');
    $('#tab_03').attr('tabindex', '0');
    $('#tab-details').attr('aria-hidden', 'true');
    $('#tab-deliveryTab').attr('aria-hidden', 'true');
    $('#tab-reviews').attr('aria-hidden', 'false');
    $('#tab-details').removeAttr('tabindex');
    $('#tab-reviews').removeAttr('tabindex');
    $('#tab-deliveryTab').removeAttr('tabindex');
  });

  /************************************ Address Lookup **************************************************/

  var getSelectedOption = function() {
    var context = $('.addressResults').find(':selected');
    var selectedItem = [{
        houseNameOrNumber : context.data('attrHousenameornumber'),
        line1 : context.data('attrLine1'),
        line2 : context.data('attrLine2'),
        town : context.data('attrTown'),
        postalCode : context.data('attrPostalcode')
    }];

   return selectedItem;
  };

  var changeFields = function(result, edit) {
    if(edit) {
     $('#editAddressHouseNameOrNumber').val(result.houseNameOrNumber).trigger('change').focus().blur();
     $('#editAddressHouseNumberOrName').val(result.houseNameOrNumber).trigger('change').focus().blur();
     $('#editAddressLine1').val(result.line1).trigger('change');
     $('#editAddressLine2').val(result.line2).trigger('change');
     $('#editAddressTownCity').val(result.town).trigger('change');
    } else {
     $('#addressDeliveryhouseNameOrNumber').val(result.houseNameOrNumber).trigger('change').focus().blur();
     $('#addressDeliveryhouseNumberOrName').val(result.houseNameOrNumber).trigger('change').focus().blur();
     $('#addressDeliveryLine1').val(result.line1).trigger('change');
     $('#addressDeliveryLine2').val(result.line2).trigger('change');
     $('#addressDeliveryTownCity').val(result.town).trigger('change');
    }
  };

  var singleResult = function(item) {
    var line2 = item.line2 !== null && item.line2.length > 0 ? item.line2 + ',</br>' : '';
    var address = '<p><strong>' + item.houseNameOrNumber + ' ' + item.line1 + '</strong>,</br>' +
                  line2 + item.town + ',</br>' +
                  '<span class=\'text--uppercase\'>' + item.postalCode + '</span></p>';
    return address;
  };

  var multiResult = function(items, myaccount) {
   var options;

   for (i = 0; i < items.length; i++) {
     options += '<option class=\'address-row\'' +
                'data-attr-houseNameorNumber=\'' + items[i].houseNameOrNumber +'\'' +
                'data-attr-line1=\'' + items[i].line1 +'\'' +
                'data-attr-line2=\'' + items[i].line2 +'\'' +
                'data-attr-town=\'' + items[i].town +'\'' +
                'data-attr-postalcode=\'' + items[i].postalCode +'\'>' +
                 items[i].houseNameOrNumber + ' ' + items[i].line1 +
                '</option>';
   };

   var addressOptions = '<div class=\'addressOption ln-c-form-group ln-u-push-bottom\'>' +
                         '<label class=\'ln-c-label\'>Select address <span class=\'ln-c-label__info\' aria-hidden=\'true\'>*</span></label>' +
                         '<select class=\'ln-c-select\' id=\'addressListView\'>' +
                             '<option class=\'address-row\' value=\'\'>Please select</option>' +
                              options +
                         '</select>' +
                       '</div>';

   var addressOptionsMyAccount = '<div class=\'addressBookTitleField ln-c-form-group ln-u-push-bottom\'>' +
                         '<label class=\'ln-c-label\'>Select address <span class=\'ln-c-label__info\' aria-hidden=\'true\'>*</span></label>' +
                         '<select class=\'ln-c-select\' id=\'addressListView\'>' +
                             '<option class=\'address-row\' value=\'\'>Please select</option>' +
                              options +
                         '</select>' +
                       '</div>';

   var optionType = myaccount ? addressOptionsMyAccount : addressOptions;

   return optionType;
 };

 var addressResults = function(results, myaccount) {
   var lth = results.length;
   if (lth === 1){
     changeFields(results[0], false);
     return singleResult(results[0]);
   } else if (lth > 1) {
     return multiResult(results, myaccount);
   } else {
     return '<p class=\'tu-u-color-red\'>Please enter a valid postcode</p>';
   }
 };

 var emptyAddress = function(edit) {
   if (edit) {
     $('#editAddressLine1').val('').trigger('change');
     $('#editAddressLine2').val('').trigger('change');
     $('#editAddressTownCity').val('').trigger('change');
   } else {
     $('#addressDeliveryLine1').val('').trigger('change');
     $('#addressDeliveryLine2').val('').trigger('change');
     $('#addressDeliveryTownCity').val('').trigger('change');
   };
 };

 var getAddresses = function(data, myAccount, buttonNode) {
   var url = '/checkout/multi/home-delivery/find-address-json';
   $('.lookupAddressFields').hide();
   $('.addressResultsSpinner').hide();
   $('.addressResults').hide();
   $('.manual',$('.showHideDiv')).show();
   $('.searchPostcodeLnk',$('.showHideDiv')).hide();
   $.ajax({
      url: url,
      method:'POST',
      dataType:'json',
      data: data,
      beforeSend: function() {
        $('.addressResultsSpinner').show();
        emptyAddress(false);
        buttonNode.disabled = true;
      },
      success: function (response) {
        $('.addressResults').html(addressResults(response, myAccount)).slideDown();
        $('.addressResultsSpinner').hide();
        $('#addressListView').on('change', function() {
            $(this).blur();
            $('.addressResults').html(addressResults(getSelectedOption(this), myAccount));
        });
      },
      error: function(response) {
        $('.addressResults').show().html('<p class="error">unable to find address</p>');
        hideShowManualForm(false);
      },
      complete: function () {
        buttonNode.disabled = false;
      }
    });
 };

 var hideShowManualForm = function(manual) {
   var line1 = $('#addressDeliveryLine1').length > 0 ? $('#addressDeliveryLine1') : $('#editAddressLine1'),
       city = $('#addressDeliveryTownCity').length > 0 ? $('#addressDeliveryTownCity') : $('#editAddressTownCity');

   line1.attr('required', manual);
   city.attr('required', manual);

   if(manual){
     $('.addressLookup .searchPostcodeLnk').show();
     $('.addressLookup .manual').hide();
     $('.lookupAddressFields').slideDown(300);
     $('.addressResults').slideUp(300);
   }else{
     $('.addressLookup .manual').show();
     $('.addressLookup .searchPostcodeLnk').hide();
     $('.lookupAddressFields').slideUp(300);
     $('.addressResults').slideDown(300);
     $('#addressPostcode').focus();
   }
 };

 $('#addEditAddress, #tuPaymentDetailsForm, #tuAddressForm').find('.address-lookup').on('click', function(ev) {
   ev.preventDefault();

    var $target=$(ev.target),
        that=this,
        errorContainer = $('#address_postcode').length > 0 ? $('#address_postcode').closest('.ln-c-form-group') : $('input#addressPostcode').closest('.ln-c-form-group'),
        postcode = $('#address_postcode').length > 0 ? $('#address_postcode').val() : $('input#addressPostcode').val(),
        namenumber = $('#addressDeliveryhouseNumberOrName').length > 0 ? $('#addressDeliveryhouseNumberOrName').val() : $('input#addressDeliveryhouseNameOrNumber').val(),
        myAccount = $('#addressDeliveryhouseNumberOrName').length > 0 ? true : false;

   if (postcode.length > 0) {
     getAddresses({postcode: postcode, houseNameOrNumber: namenumber}, myAccount, $target[0]);
   } else {
     $('.addressResults').html('<p class="error">Please enter a postcode</p>');
     hideShowManualForm(false);
   }
   errorContainer.removeClass('has-error');
 });

 if( $('.information_message.negative','#add-address-content').length ) {
   $(".lookupAddressFields").show();
 };

 $('#tuAddressForm').find('.change_address_button').on('click', function(ev) {

    var $target=$(ev.target),
        postcode = $('#address_postcode').length > 0 ? $('#address_postcode').val() : $('input#addressPostcode').val(),
        line1 = $('#addressDeliveryLine1').length > 0 ? $('#addressDeliveryLine1').val() : $('#editAddressLine1').val(),
        city = $('#addressDeliveryTownCity').length > 0 ? $('#addressDeliveryTownCity').val() : $('#editAddressTownCity').val(),
        addressFields = $('.lookupAddressFields').is(':visible');

   if (postcode.length > 0  && (line1.length === 0 || city === 0) && !addressFields) {
     ev.preventDefault();
     $('#tuAddressForm .address-lookup').trigger('click');
   };
 });

 $('.addressLookup .manual ').on('click', function(e) {
   e.preventDefault();
   hideShowManualForm(true);
   $(this).hide();
 });

 $('.addressLookup .searchPostcodeLnk').on('click', function(e) {
   e.preventDefault();
   hideShowManualForm(false);
   $(this).hide();
 });



  /************************************ Toggle Button **************************************************/

  $('.toggleButton').click(function(ev) {
    ev.preventDefault();
    $(this).next('.toggleBlock').slideToggle();
  });


  /************************************ Checkout Delivery Sections **************************************************/

  $(".radioToggle").removeAttr('checked').click(function() {
    var $activeContent = $(this).parent().find('.toggleBlock').first();

    $('.radioToggle').each(function() {
      $(this).parent().find('.toggleBlock').first().slideUp();
      $(this).removeAttr('checked');
      $(this).next().removeClass('active-label');
    });
    if ($activeContent.is(':hidden')) {
      $(this).attr('checked', 'true');
      $(this).next().addClass('active-label');
      $activeContent.slideDown();
    };

  });

  //error state
  $(".deliveryError, .error").each(function() {
    $(".radioToggle", this).attr('checked', 'true');
    $(".lookupAddressFields", this).show()
    $('body').scrollTo($(".addressform_button_panel", this));
  });

  if ($('.negative').is(':visible')) {
    $('.radioToggle#home-delivery').attr('checked', 'true');
    $(".editAddressBlock").css('display', 'block');
    $(".lookupAddressFields", this).show()
  };

  if ($("#click-and-collect-disabled").length > 0) {
    $('.deliveryOptionLabel').addClass("active-label");
    $('.deliveryContent').show();

  } else {
    $('.deliveryOptionLabel').removeClass("active-label");
    $('.deliveryContent').hide();
  };

  if ($('.negative').is(':visible')) {
    $('.radioToggle#home-delivery').attr('checked', 'true');
    $('#selectHomeDeliveryForm .deliveryOptionLabel').addClass("active-label");
    $('#selectHomeDeliveryForm .deliveryContent').show();
  };

  if ($("form.editexistingaddress").length) {
    $('.editexistingaddress .deliveryOptionLabel').addClass("active-label");
    $('.editexistingaddress .deliveryContent').show();
    $(".lookupAddressFields").show();
    $("span.manual").hide();
    $("span.searchPostcodeLnk").show();

  };

  if ($(".selectexistingaddress").length) {
    $('#selectHomeDeliveryForm .deliveryOptionLabel').addClass("active-label");
    $('#selectHomeDeliveryForm .deliveryContent').show();

  };

  if ($("#selectHomeDeliveryForm").hasClass("saveaddress")) {
    $('#selectHomeDeliveryForm .deliveryOptionLabel').addClass("active-label");
    $('#selectHomeDeliveryForm .deliveryContent').show();
  };

  /************************************ Checkout Billing address **************************************************/

  $('#checkoutBillingAddress').each(function() {


    /** Configure field value validators **/

    function validPostcode(postcode) {
      postcode = postcode.replace(/\s/g, "");
      var regex = /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i;
      return regex.test(postcode);
    }

    function validField(fieldValue) {
      var regex = /^[a-zA-Z0-9._,'\- ]*$/i;
      return regex.test(fieldValue);
    }

    function validNameField(nameFieldValue) {
      var regex = /\D/;
      return regex.test(nameFieldValue);
    }

    function addValidator(name, validator) {
      jQuery.validator.addMethod(name, function(value, element) {
        return validator(value);
      });
    }

    addValidator("validPostcode", validPostcode);
    addValidator("validField", validField);
    addValidator("validNameField", validNameField);


    /** General validation constraints **/

    var maxNameLength = 30;
    var minNameLength = 2;
    var maxFieldLength = 35;
    var minFieldLength = 1;
    var maxHouseNumberLength = 70;
    var maxAddressLine1Length = 30;
    var maxPostCodeLength = 20;
    var genericRequiredFieldOptions = {
      required: true,
      maxlength: maxFieldLength,
      validField: true
    };

    var addressValidationOptions = {

      debug: false,
      onkeyup: false,
      onfocusout: false,
      ignore: [],
      errorClass: "errorNotification",
      errorContainer: "#errorContainer",

      rules: {
        'addBillingAddress.newTitleCode': {
          required: true,
          minlength: 1,
          validField: true
        },

        'addBillingAddress.newFirstName': {
          required: true,
          minlength: minNameLength,
          maxlength: maxNameLength,
          validField: false,
          validNameField: true
        },

        'addBillingAddress.newLastName': {
          required: true,
          minlength: minNameLength,
          maxlength: maxNameLength,
          validField: false,
          validNameField: true
        },

        'addBillingAddress.newPostcode': {
          required: true,
          minlength: 5,
          maxlength: maxPostCodeLength,
          validPostcode: true
        },

        'addBillingAddress.newHouseNameOrNumber': {
          required: true,
          maxlength: maxHouseNumberLength,
          validField: true
        },

        'addBillingAddress.newLine1': {
          required: true,
          maxlength: maxAddressLine1Length,
          validField: true
        },

        'addBillingAddress.newLine2': {
          validField: true
        },

        'addBillingAddress.newTownCity': genericRequiredFieldOptions
      },

      messages: {

        'addBillingAddress.newTitleCode': {
          required: '<div class="errorMessageText errorRight">Please select a title</div>',
          validField: '<div class="errorMessageText">Please enter a valid title</div>',
          minlength: '<div class="errorMessageText errorRight">Please enter more than {0} characters</div>'
        },

        'addBillingAddress.newFirstName': {
          required: '<div class="errorMessageText">Please enter a first name</div>',
          //validField : '<div class="errorMessageText">Please enter a valid first name</div>',
          validNameField: '<div class="errorMessageText">Please enter a valid first name</div>',
          maxlength: '<div class="errorMessageText">Please enter less than {0} characters</div>'
        },

        'addBillingAddress.newLastName': {
          required: '<div class="errorMessageText">Please enter a surname</div>',
          //validField : '<div class="errorMessageText">Please enter a valid surname</div>',
          validNameField: '<div class="errorMessageText">Please enter a valid surname</div>',
          maxlength: '<div class="errorMessageText">Please enter less than {0} characters</div>'
        },

        'addBillingAddress.newPostcode': {
          required: '<div class="errorMessageText">Please enter a postcode</div>',
          validPostcode: '<div class="errorMessageText">Please enter a valid postcode</div>',
          maxlength: '<div class="errorMessageText">Please enter less than {0} characters</div>'
        },

        'addBillingAddress.newHouseNameOrNumber': {
          required: '<div class="errorMessageText">Please enter a  House number/name</div>',
          validField: '<div class="errorMessageText">Please enter a valid House number/name</div>',
          maxlength: '<div class="errorMessageText">Please enter less than 30 characters</div>'
        },

        'addBillingAddress.newLine1': {
          required: '<div class="errorMessageText">Please enter address Line 1</div>',
          validField: '<div class="errorMessageText">Please enter a valid Line 1</div>',
          maxlength: '<div class="errorMessageText">Please enter less than {0} characters</div>'
        },

        'addBillingAddress.newLine2': {
          validField: '<div class="errorMessageText">Please enter a valid Line 2</div>'
        },

        'addBillingAddress.newTownCity': {
          required: '<div class="errorMessageText">Please enter a Town/City</div>',
          validField: '<div class="errorMessageText">Please enter a valid Town/City</div>',
          maxlength: '<div class="errorMessageText">Please enter less than {0} characters</div>'
        }
      }
    };

    /*$("#tuPaymentDetailsForm").validate(addressValidationOptions);*/

    $('#contPayment').click(function() {
      $newAddressRadio = $('#newBillingAddress1');
      /*if (!$newAddressRadio.attr('checked')) {
        $("#tuPaymentDetailsForm").validate().cancelSubmit = true;
      } else {
        $("#tuPaymentDetailsForm").validate().cancelSubmit = false;
      };*/
      if ($('.newBillingTitle .selectBox-dropdown .selectBox-label:contains("Select title")').length > 0) {
        $('.newBillingTitle a.selectBox-dropdown .selectBox-arrow').css({
          'border': '2px solid #C00C0C',
          'top': '-2px'
        });
        $('.newBillingTitle a.selectBox-dropdown').css('border', '2px solid #C00C0C');
      };
    });

    var $radioButtons = $('.radioBillAddressToggle', this),
      $newAdd = $('.newBillingAddress', this),
      $newAddButton = $('#newBillingAddressButton', this),
      $editBlock = $('#editAddressBlock', this),
      $editConfig = $('#editAddressCodeConfig', this),
      setRadioButtons = function($node) {
        var $activeContent = $node.parent().find('.toggleBlock').first();
        $radioButtons.each(function() {
          $(this).parent().find('.toggleBlock').first().slideUp();
          $(this).removeAttr('checked');
        });

        $editConfig.val('');
        if ($activeContent.length == 0) {
          $node.attr('checked', 'true');
          if (!$newAdd.is(':hidden')) {
            $newAdd.slideUp();
            $newAddButton.slideDown();
          }
        } else if ($activeContent.is(':hidden')) {
          $node.attr('checked', 'true');
          $activeContent.slideDown();
        };
      },
      clearEdit = function() {
        $editConfig.val('');
        $editBlock.hide();
      },
      editAddressFields = function(address, name) {
        var $inputs = $('input[type=text]', $editBlock),
          i,
          title = '';

        address = address.replace(/\n*\r*/g, '').split(',');
        if (typeof name == 'string') {
          name = name.replace(/\n*\r*/g, '').split(' ');
        } else
          name = [];

        if (name.length == 3) {
          title = $.trim(name[0]);
          $('#editTitle').val(title);
          $("#editTitle option").each(function() {
            if ($(this).text() == title) {
              $(this).attr("selected", "selected");
              $(".titleSelect").find(".selectBox-label").text(title)
            } else {
              $(this).removeAttr("selected");
            }
          });
          name.splice(0, 1);
        }

        //add first and last name to the start of the address list
        if (name.length == 2) {
          address.splice(0, 0, $.trim(name[1]));
          address.splice(0, 0, $.trim(name[0]));
        } else {
          address.splice(0, 0, null);
          address.splice(0, 0, null);
        }

        //add blank address line2
        if (address.length < $inputs.length)
          address.splice(4, 0, '');
        //remove address line2 and combine with address line2
        else if (address.length > $inputs.length) {
          address[2] = $.trim(address[2]) + ' ' + $.trim(address[3]);
          address.splice(3, 1);
        }

        //update input fields
        for (i = 0; i < $inputs.length; i++) {
          if (typeof address[i] == 'string')
            $inputs[i].value = $.trim(address[i]);
        }
      },
      setEditFields = function($activeRow) {
        var $activeRadio = $('.radioBillAddressToggle', $activeRow);

        editAddressFields($.trim($('.col-billing-add', $activeRow).text()), $.trim($('.col-name', $activeRow).text()));

        setRadioButtons($activeRadio);
        $editBlock.insertAfter($activeRow).show();
        $editConfig.val($activeRadio.val());
      };

    $(this).click(function(ev) {

      var $target = $(ev.target);

      newCard = function() {
        ev.preventDefault();
        clearEdit();
        $radioButtons.removeAttr('checked');
        var $parent = $('.radioBillAddressToggle', $newAdd).first().attr('checked', 'true').parent();
        $('.toggleBlock', $parent).show();
        $target.html('Pay with a saved card');
        $target.addClass('savedCard');
        $target.click(function() {
          $('#submitActionId').attr('value', 'payWithSaved');
          /*$('#tuPaymentDetailsForm').submit();*/
        })
        $newAdd.slideDown();
      }

      //toggle radio buttons
      if ($target.is('.radioBillAddressToggle.card-type')) {
        setRadioButtons($target);
        $editBlock.hide();
        $newAddButton.html('Pay with a different card');
        $newAddButton.off('click');
        $newAddButton.click = newCard;
        $('#newBillingAddressButton').removeClass('savedCard');
      }
      if ($target.is('#existingBillingAddress1.radioBillAddressToggle')) {
        setRadioButtons($target);
        $editBlock.hide();
        $newAddButton.html('Pay with a saved card');
        $newAddButton.off('click');
        $newAddButton.click = newCard;
      }
      if ($target.is('#newBillingAddress1.radioBillAddressToggle')) {
        setRadioButtons($target);
        $editBlock.hide();
        $newAddButton.html('Pay with a saved card');
        $newAddButton.off('click');
        $newAddButton.click = newCard;
      }
      //new billing address button
      else if ($target.is('#newBillingAddressButton')) {
        newCard()
      }
      //edit billing address select button
      else if ($target.is('.selectBillingAddressButton')) {
        ev.preventDefault();
        /*
        var $section=$target.parents('.editAddressBlock');

        $('input',$section).each(function(){

        });
        */
      }
      //edit billing address button
      else {
        if (!$target.is('.editBillingAddressButton'))
          $target = $target.parents('.editBillingAddressButton');
        if ($target.is('.editBillingAddressButton')) {
          ev.preventDefault();
          setEditFields($target.parents('.row'));
          $('.radioBillAddressToggle').addClass('radioActive');
        }
      }

    });
  });

  if ($('.radioBillAddressToggle').hasClass('selectedCard')) {
    $('.radioBillAddressToggle.card-type.selectedCard').attr('checked', 'true');
    $('#paymentId1.radioBillAddressToggle.card-type.selectedCard').attr('checked', 'false');
  } else {
    $('#paymentId1.radioBillAddressToggle.card-type').attr('checked', 'true');
  };

  /************************************ Checkout Delivery **************************************************/

  $('.deliveryContent #tabType').on('click', function(ev) {

    var $target = $(ev.target),
      $tabContent = $('.deliveryContent #tabContent');

    ev.preventDefault();

    $('.active-tab-content', $tabContent).removeClass('active-tab-content');
    var $content = $($target.attr('href'), $tabContent).addClass('active-tab-content');
    $('.active-tab', this).removeClass('active-tab');
    if (!$target.is('li'))
      $target = $target.parents('li');

    $target.addClass('active-tab');

  });

  $('#store_locator_previous_stores .cboxElement').click(function(e) {
    e.preventDefault();
    $.colorbox({
      width: 610,
      href: encodeURI($(this).attr("href")), //escape spaces alternative .replace(/\s/g,'%20')
      onComplete: function() {
        $(this).colorbox.resize();
      }
    });
  });

  var lookupNavigation = $('#lookupNavigation');
  var lookupMapData;
  var searchResult = $('#searchResultContent');

  lookupNavigation.on('click', 'a', function(e) {
    e.preventDefault();
    var currentItem = $(this);
    var lookupType = currentItem.attr('id');

    if (!currentItem.hasClass('active')) {
      lookupNavigation.find('.active').removeClass('active');
      currentItem.addClass('active');
      showHideStoreLookup(lookupType);
    }
  });

  function showHideStoreLookup(lookupType) {
    $(searchResult).toggleClass('lookupMapView');

    if (lookupType === 'lookupMapView') {
      doRenderStoreMap();
    }

    $('html, body').animate({
      scrollTop: $("#searchResultContent").offset().top
    }, 400);
  }

  function doRenderStoreMap() {
    var viewStoreText = $('#viewStoreText').val();
    var viewStoreUrl = $('#viewStoreUrl').val();
    var selectStoreUrl = $('#selectStoreUrl').val();
    var selectButtonText = $('#selectButtonText').val();
    var centerPoint = new google.maps.LatLng(lookupMapData.latitude, lookupMapData.longitude);
    var mapOptions = {
      zoom: 9,
      zoomControl: true,
      panControl: true,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: centerPoint
    };

    ScrollInterceptOverlay.prototype = new google.maps.OverlayView();
    overlay = new ScrollInterceptOverlay(new google.maps.Map(document.getElementById("map_canvas"), mapOptions));

    if (typeof lookupMapData != 'undefined' && lookupMapData.results.length > 0) {
      $('#searchResultContent').removeClass('no-search-results');
      $('#mapCanvas').css('height', 'auto');
      $('#selectStoreBtnId').removeClass('hidden-button');
    } else {
      $('#searchResultContent').addClass('no-search-results');
      $('#mapCanvas').css('height', '0');
      $('#selectStoreBtnId').addClass('hidden-button');
    }

    /* Draw each store marker */
    markers.length = 0;
    $.each(lookupMapData.results, function(i, item) {
      addStore(new google.maps.LatLng(item.geoPoint.latitude, item.geoPoint.longitude), item.storeSearchName, item.formattedDistance, item.address.line1, item.address.town, item.address.postalCode, viewStoreText, viewStoreUrl + item.geoMapUrl, selectStoreUrl, true, CSRFToken, selectButtonText, item.otherName);
    });
  };

  function doGetStoreDetails(url, callback) {
    $.ajax({
      url: url,
      method: 'GET',
      success: function(data) {
        callback(data);
      },
      error: function(data) {
        callback(data);
      }
    });
  };

  $(document).on('click', '.click-collect-show-details', function(e) {
    e.preventDefault();
    var currentItem = $(this);
    var locationData = currentItem.attr('href');
    var detailsLocation = currentItem.parent().next('.click-collect-location-details-container');

    if (currentItem.hasClass('open')) {
      detailsLocation.slideUp(300, function() {
        currentItem.removeClass('open');
      });
    } else {
      if (currentItem.hasClass('loaded')) {
        detailsLocation.slideDown(300, function() {
          currentItem.addClass('open');
        });
      } else {
        doGetStoreDetails(locationData, function(data) {
          currentItem.addClass('loaded');
          detailsLocation.html(data).slideDown(300, function() {
            currentItem.addClass('open');
          });
        });
      }
    }
  });

  function doRenderStoreFinderResults(data) {
    var dataArray = jQuery.parseJSON(data);
    var searchData = dataArray.response[0];
    var storeLocationResults = $('#searchResultContent');
    lookupMapData = searchData;
    storeLocationResults.addClass('show-search-results');

    $('#storeFinder-result').html('').append(dataArray.response[1].storeListHtml);

    $(document).trigger('clickCollectListLoaded');

    doRenderStoreMap();

    $('#storeFinder-result .locationPin').click(function(e) {
      e.preventDefault();
      google.maps.event.trigger(markers[$(this).attr('index')], 'click');
    });

    $('#storeFinder-result .cboxElement').click(function(e) {
      e.preventDefault();
      $.colorbox({
        width: 610,
        href: encodeURI($(this).attr("href")), //escape spaces alternative .replace(/\s/g,'%20')
        onComplete: function() {
          $(this).colorbox.resize();
        }
      });
    });

    $('a.viewstorelink.action.ajax.cboxElement').click(function(e) {
      e.preventDefault();
      $.colorbox({
        iframe: true,
        width: 610,
        href: encodeURI($(this).attr("href")), //escape spaces alternative .replace(/\s/g,'%20')
        onComplete: function() {
          $(this).colorbox.resize();
        }
      });
    });

    $("#storeFinder-result .storeFinderPageLink").bind({
      click: function(data) {
        data.preventDefault();
        var locatorUrl = $('#storelocator-url').val() + data.target.search;
        var longitude = $('#longitude').val();
        var latitude = $('#latitude').val();
        var storeLocatorQuery = escape($('#storelocator-query').val());
        var location = (longitude !== '' && latitude !== '') ? '&q=&longitude=' + longitude + '&latitude=' + latitude : '&q=' + storeLocatorQuery;
        $.ajax({
          url: locatorUrl + location,
          method: 'GET',
          success: function(data) {
            doRenderStoreFinderResults(data);
          },
          error: function(data) {
            $('#storeFinder-result').html('unable to find store');
          }
        });
      }
    });
  }

  $('#selectStoreBtnId').on('click', function() {
    $('#selectStoreFormId').submit();
  });

  /* Delivery address */
  $('#storelocator-query').on("keydown", function(ev) {

      // Anykey here - clear Long & Lat data
      $('#latitude').val('');
      $('#longitude').val('');

      if (ev.keyCode == 13) {
        $('#storeFinder').click();
        return false;
      }
    }),

    $('#storeFinder').click(function(ev) {
      var query = escape($('#storelocator-query').val());
      var longitude = escape($('#longitude').val());
      var latitude = escape($('#latitude').val());

      var url = $('#storelocator-url').val();
      // Query Build

      url += '?q=' + query + "&clickAndCollectOnly=" + $('#storelocator-clickAndCollectOnly').is(':checked');

      if (longitude !== '' && latitude !== '') {
        url += '&longitude=' + longitude;
        url += '&latitude=' + latitude;
      }

      $('#storelocator-query').parent().removeClass("error");
      $('.formErrorIcon').parent().removeClass("text_hide");
      $(".formErrorIcon").remove();
      $(".form_field_error-message").remove();
      $.ajax({
        url: url,
        method: 'GET',
        success: function(data) {
          doRenderStoreFinderResults(data);
        },
        error: function(data) {
          $('#storeFinder-result').html('unable to find store');
        }
      });
    });

  /************************************ PDP scrzoom **************************************************/

  function initWriteReviewAction() {
    $('#write_review_action_main').click(function(e) {
      e.preventDefault();
      $.scrollTo('#prod_tabs', 300, {
        axis: 'y'
      });
      $('#reviews').hide();
      $('#write_reviews').show();
      $("#prod_tabs").tabs("option", "selected", $('#tab_strip').children().size() - 1);
      $('#reviewForm input[name=headline]').focus();
    });
  }

  function initBasedOnReviewsAction() {
    $('#based_on_reviews').click(function(e) {
      e.preventDefault();
      $.scrollTo('#prod_tabs', 300, {
        axis: 'y'
      });
      $("#prod_tabs").tabs("option", "selected", $('#tab_strip').children().size() - 1);
      $('#write_reviews').hide();
      $('#reviews').show();
      $('#read_reviews_action').click();

    });
  }

  function initPageEvents() {

    $(".modal").colorbox({
      onComplete: function() {
        ACC.common.refreshScreenReaderBuffer();
      },
      onClosed: function() {
        ACC.common.refreshScreenReaderBuffer();
      }
    });

    initWriteReviewAction();
    initBasedOnReviewsAction();


    /*$("#Size").change(function () {
    	var url = "";
    	var selectedIndex = 0;
    	$("#Size option:selected").each(function () {
    		url = $(this).attr('value');
    		selectedIndex = $(this).attr("index");
    	});
    	if (selectedIndex != 0) {
    		window.location.href=url;
    	}
    });*/

    $("#variant").change(function() {
      var url = "";
      var selectedIndex = 0;

      $("#variant option:selected").each(function() {
        url = $(this).attr('value');
        selectedIndex = $(this).attr("index");
      });
      if (selectedIndex != 0) {
        window.location.href = url;
      }
    });
  }

  initPageEvents();
  /*
  setTimeout(function() {
  	if($.query.get('tab') == 'writereview') {
  		$('#write_review_action_main').click();
  	}
  	if($.query.get('tab') == 'readreviews') {
  		$('#based_on_reviews').click();
  	}
  }, 100);
  */


  /*************** Login/Register **************************************************/
  $(document).click(function(ev) {
    var $target = $(ev.target);
    if ($target.is('.forgotPasswordModal .tuButton')) {
      var $form = $('#forgottenPwdForm').ajaxForm({
        success: function(data) {
          var $data = $(data);
          if ($(data).closest('#validEmail').length) {
            $form.parents('.item_container_holder').html(data);
          } else
            $('.form_field-elements', $form).html($('.form_field-elements', $data).html());
        }
      });
      ACC.common.refreshScreenReaderBuffer();
    } else if ($target.is('.forgotPasswordModal .resendEmailLink')) {
      ev.preventDefault();
      $.ajax({
        url: $target.attr('href'),
        method: 'GET',
        success: function(data) {
          $('#cboxLoadedContent').html(data);
          $.colorbox.resize({
            height: false,
            width: 575
          });
        },
        error: function(data) {
          $('#cboxLoadedContent').html('An error has occured.  Please try again later');
        }
      });
    }
  });

  $('.password-forgotten').click(function() {
    $.get($(this).data('url')).done(function(data) {
      $.colorbox({
        html: data,
        height: false,
        width: 575,
        overlayClose: true,
        onClosed: function() {
          ACC.common.refreshScreenReaderBuffer();
        }
      });
      $(document).trigger('forgottenPasswordModal');
    });
  });

  $('.tandc_popup').click(function() {
    $.colorbox({
      html: $('#tandc_content').html(),
      height: false,
      width: 575,
      overlayClose: true,
      speed: 100,
      onComplete: function() {
        $.colorbox.position();
      }
    });
  });

  $('.privacy_popup').click(function() {
    $.colorbox({
      html: $('#privacy_content').html(),
      height: false,
      width: 575,
      overlayClose: true,
      speed: 100,
      onComplete: function() {
        $.colorbox.position();
      }
    });
  });


  /************************************ Peerius **************************************************/

  $('#productAside, .upselling').click(function(ev) {
    if (!Peerius)
      return;
    var $target = $(ev.target);
    if (!$target.is('li'))
      $target = $target.parents('li');

    if ($target.is('li')) {
      // extra care to be taken so that the correct recommendation
      // id is used (for reporting purposes)!
      var id = ($target.attr('data-id'));
      if (id) {
        try {
          Peerius.smartRecsClick(id);
        } catch (ex) {
          alert('peerius error!');
        }
      }
    }
  });


  /************************************ Nectar card autotab **************************************************/

  $('#regNectarPointsOne').on("keypress", function() {
    if ($(this).val().length == $(this).attr('maxlength')) {
      $('#regNectarPointsTwo').focus();
    };
  });


  /************************************ registerToggle **************************************************/


  $('.regToggle').click(function() {
    $(this).hide();
    if ($('.registerForm').css('display') == 'none')
      $('.registerForm').css('display', 'block');
    else
      $('.registerForm').css('display', 'none');
  });

  /***********************************  Home Page Scroller      *****************************************/

  function highlight(items) {
    items.filter(":eq(1)").css({
      opacity: 1
    }).addClass("active");
    return items;
  }

  function unhighlight(items) {
    items.css({
      opacity: .4
    }).removeClass("active");
    return items;
  }

  /***********************************  Help      *****************************************/
  $('.helpSection div a').click(function(ev) {
    ev.preventDefault();
    var $parent = $(this).parents('.helpSection');
    if ($('li', $parent).length > 6) {
      if ($(this).html() == 'See all') {
        $parent.children('ul').css('height', 'auto');
        $(this).html('See less');
      } else {
        $parent.children('ul').css('height', '198px');
        $(this).html('See all');
      }
    }
  });

  /*********************************** Disable add to basket button until page load     *****************************************/

  $("#addToCartButton").prop("disabled", false);

  /************************************ Named Day Delivery **************************************************/
  /* Change the button from Grey to Orange */
  $('#standard-delivery ').click(function() {
    $('button#continue').css('background', '#ef7d00');
  });

  $('#namedDeliveryDate').change(function() {
    $('button#continue').css('background', '#ef7d00');
  });
  $('#premium-delivery').click(function() {
    if ($('.selectBox-label:contains("Select date")').length > 0) {
      $('button#continue').css('background', '#cccccc');
    };
  });
  /* Radio Buton Permenance Toggle */
  if ($('#standard-delivery.deliveryMethodToggle').hasClass('checked')) {
    $('#standard-delivery.deliveryMethodToggle').addClass('checkedDot');
    $('.radioToggle#home-delivery').attr('checked', 'true');
    $('#selectHomeDeliveryForm .deliveryOptionLabel').addClass("active-label");
    $('#selectHomeDeliveryForm .deliveryContent').show();
    $('#checkoutContentPanel input[type="radio"]#standard-delivery').prop('checked', true);
    $('#checkoutContentPanel input[type="radio"]#premium-delivery').prop('checked', false);
    $('#premium-delivery.deliveryMethodToggle').removeClass('checkedDot');
    $('#continue').css('background', '#ef7d00');
  } else if ($('#premium-delivery.deliveryMethodToggle').hasClass('checked')) {
    $('#premium-delivery.deliveryMethodToggle').addClass('checkedDot');
    $('.radioToggle#home-delivery').attr('checked', 'true');
    $('#selectHomeDeliveryForm .deliveryOptionLabel').addClass("active-label");
    $('#selectHomeDeliveryForm .deliveryContent').show();
    $('#checkoutContentPanel input[type="radio"]#premium-delivery').prop('checked', true);
    $('#checkoutContentPanel input[type="radio"]#standard-delivery').prop('checked', false);
    $('#standard-delivery.deliveryMethodToggle').removeClass('checkedDot');
    $('#continue').css('background', '#ef7d00');
  };

  /* Radio Button Click Toggle */
  $('#premium-delivery.deliveryMethodToggle').click(function() {
    $('#standard-delivery.deliveryMethodToggle').removeClass('checkedDot');
    $('#premium-delivery.deliveryMethodToggle').addClass('checkedDot');
    $('#checkoutContentPanel input[type="radio"]#premium-delivery').prop('checked', true);
    $('#checkoutContentPanel input[type="radio"]#standard-delivery').prop('checked', false);
  });

  $('#standard-delivery.deliveryMethodToggle').click(function() {
    $('#premium-delivery.deliveryMethodToggle').removeClass('checkedDot');
    $('#standard-delivery.deliveryMethodToggle').addClass('checkedDot');
    $('#checkoutContentPanel input[type="radio"]#standard-delivery').prop('checked', true);
    $('#checkoutContentPanel input[type="radio"]#premium-delivery').prop('checked', false);
  });

  if ($('.deliveryMethodToggle ').hasClass('checkedDot')) {
    $('button#continue').css('background', '#ef7d00', '!important');
  };

  /************************************ Delivery Instructions counter **************************************************/
  var characters = $("#ppp").val();
  $("#counter").append("<p><strong>Character count&nbsp;" + characters + "</strong></p>");
  $("#deliveryInstructions").keyup(function() {
    if ($(this).val().length > characters) {
      $(this).val($(this).val().substr(0, characters));
    }
    var remaining = characters - $(this).val().length;
    $("#counter").html("<p><strong>Character count&nbsp;" + remaining + "</strong></p>");
    /*if(remaining <= 10)
    {
        $("#counter").css("color","red");
    }
    else
    {
        $("#counter").css("color","black");
    }*/
  });

  $('#changeAddress').click(function() {
    $.ajax({
      url: "/checkout/multi/change-payment-address?selectedAddressId=" + escape($("#selectedEditAddressValue").val()) + "&editAddressId=" + escape($("#editAddressCodeConfig").val()),
      method: 'GET',
      dataType: 'html',
      success: function(html) {
        location.reload(true);
      },
      error: function(data) {
        console.log("error");
      }
    });
  })

  /************************************ ST-6038 **************************************************/
  $('#search_form_input').submit(function() {
    var $searchTerm = $("#search_form_input :input");
    $searchTerm = $searchTerm.val().replace("<script>", "").replace("http", "");
  });

  /************************************ PLP Hover images **************************************************/
  $('.thumb.second').hover(function() {
    // in
    $(this).find('.thumbSecondary').show();
    $(this).find('.thumbPrimary').hide();
    $(this).find('.thumbSecondary img').css({
      "position": "absolute",
      "left": "0",
      "top": "0",
      "max-height": "300px"
    });
    $(this).find('.thumbPrimary').fadeOut(100);
    $(this).find('.thumbSecondary').fadeIn(500);
  }, function() {
    // out
    $(this).find('.thumbSecondary').hide();
    $(this).find('.thumbPrimary').show();
    $(this).find('.thumbSecondary').fadeOut(100);
    $(this).find('.thumbPrimary').fadeIn(500);
  });

  /************************************ Text Changes to the Continue Payment Buttons **************************************************/

  $(".existingAddressSelected").click(function() {
    $("#contPayment").html(" Continue to Payment");
  });
  $(".newAddressSelected").click(function() {
    $("#contPayment").html(" Save and Continue");
  });

  /************************************ Force open address fields on Billing details page when T&C error triggered **********************/
  if ($('#checkoutContentPanel').hasClass('newAddress')) {
    $('.newBillingAddress').css('display', 'block');
    $('.editBillingAddress .toggleBlock').css('display', 'block');
    $('.lookupAddressFields ').css('display', 'block');
    $('#newBillingAddress1').attr('checked', true);
    $('#existingBillingAddress1').attr('checked', false);
    $('#paymentId1').attr('checked', false);
  }

  /************************************ Hide Refined by if no Facets selected ***********************************************************/
  if ($('.facetCheckBox').attr('checked')) {
    $('.refineBy').css('display', 'block');
  } else {
    $('.refineBy').css('display', 'none');
  };

  /************************************ Click Reviews Tab and make it go to the Reviews Tab *******************************************/

  $('.bvReviewLink').click(function() {
    $.scrollTo('#tabsContainer', 300, {
      axis: 'y'
    });
    $('#tab_03').addClass('ui-tabs-selected ui-state-active');
    $('#tab_01').removeClass('ui-tabs-selected ui-state-active');
  });

  /************************************ Click on the stars on the PLP and make it go to the Reviews Tab *************************************/

  $(function() {
    if (document.location.href.indexOf('#tabsContainer') > -1) {
      $.scrollTo('#tabsContainer', 300, {
        axis: 'y'
      });
      $('#tab-reviews').removeClass('ui-tabs-hide');
      $('#tab-details').addClass('ui-tabs-hide');
      $('#tab-deliveryTab').addClass('ui-tabs-hide');
      $('#tab_03').addClass('ui-tabs-selected ui-state-active');
      $('#tab_01').removeClass('ui-tabs-selected ui-state-active');
      $('#tab_strip li:nth-child(2)').removeClass('ui-tabs-selected ui-state-active');
    }
  });

  /************************************ Processing Message colours Order page *************************************/

  if ($('#order-status-title:contains("Processing")').css('color', '#ef7d00'));
  if ($('#order-status-title:contains("Shipped")').css('color', '#13eb03'));
  if ($('#order-status-title:contains("Collected")').css('color', '#13eb03'));

  /************************************ T&C error state use exisiting address force open *************************************/

  if ($('.errorSign').attr('value') > 0) {
    $('.newBillingAddress').css('display', 'block');
    $('.card-type').removeClass('selectedCard');
    $('.card-type').attr('checked', false);
    $('#existingBillingAddress1').attr('checked', true);
  };


  /************************************ Show Top button on Pagination show 100 Items *************************************/

  if ($('#showAllButton2 .prodFoundShowAll:contains("Show 12 per page")').length > 0) {
    $('#showAllButton2 .prodFoundShowAll').after('<a class="prodFoundShowAll" href="#top">Back to top</a>');
  };


  /************************************ Add style to the Removed from basket text *************************************/

  if ($('.information_message p:contains("Unfortunately")').length > 0) {
    $('.information_message p').addClass('itemsRemoved');
    $('.information_message p').prepend('<span class="itemsRemoved icon"></span>');
  };


  /************************************ Add style to the Removed from basket text *************************************/
  $('#continue .disabled').click(function() {
    if ($("#namedDeliveryDate option:selected").text == "Select date") {
      $('.namedDeliveryDate').after('<p>Warning</p>');
    }
  });

  /************************************ Algin vouncher text for smaller voucher amount than basket amount warning ******/
  if ($('#tuApplyVoucherForm .form_field_error .form_field_error-message .error:contains("full use of your voucher")').length > 0) {
    $('#tuApplyVoucherForm .form_field_error').css('right', '165px');
  };

  /************************************ Force open the billinage address form in event of errror  **********************/
  /*$('#contPayment').click(function() {
    if ($('#tuPaymentDetailsForm .addressLineOne .form_field-input  input#newLine1').hasClass('text')) {
      $('.lookupAddressFields').css('display', 'block');
    }
  });*/

  /************************************ Nectar Card Error messaging margin - Registration  *******************************/
  if ($('.page-login .nectarErrorCode div').hasClass('errorMessagePosition')) {
    $('.page-login .nectarPointsDescr').css('margin', '-20px 0 0');
  };

  if ($('.page-login .nectar_one').is(':visible')) {
    $('.page-login #nectarTooltip').css({
      'position': 'relative',
      'left': '5px'
    });
    $('.page-login #regNectarPointsOne').css('border', '1px solid #C00C0C');
    $('.page-login #regNectarPointsTwo').css('border', '1px solid #C00C0C');
    $('.page-login .nectar_two').css('display', 'none');
  } else if ($('.page-login .nectar_two').is(':visible')) {
    $('.page-login #nectarTooltip').css({
      'position': 'relative',
      'left': '30px'
    });
    $('.page-login #regNectarPointsOne').css('border', '1px solid #C00C0C');
    $('.page-login #regNectarPointsTwo').css('border', '1px solid #C00C0C');
    $('.page-login .nectar_one').css('display', 'none');
  };
  /************************************ Nectar Card Error messaging margin - My Account  *******************************/
  if ($('.page-payment-details .nectar_one div').hasClass('errorMessagePosition')) {
    $('.page-payment-details #nectarTooltip').css({
      'position': 'relative',
      'left': '5px'
    });
    $('.page-payment-details .nectar_one .errorMessagePosition .formErrorIcon').css({
      'position': 'relative',
      'left': '258px',
      'bottom': '32px',
      'margin': '0 0 15px'
    });
    $('.page-payment-details .nectar_one .errorMessagePosition .form_field_error .form_field_error-message').css({
      'left': '82px',
      'top': '5px',
      'background': '#fff'
    });
    $('.page-payment-details #regNectarPointsOne').css('border', '1px solid #C00C0C');
    $('.page-payment-details #regNectarPointsTwo').css('border', '1px solid #C00C0C');
    $('.page-payment-details .nectar_two').css('display', 'none');
  } else if ($('.page-payment-details .nectar_two div').hasClass('errorMessagePosition')) {
    $('.page-payment-details #nectarTooltip').css({
      'position': 'relative',
      'left': '30px'
    });
    $('.page-payment-details .nectar_two .errorMessagePosition .formErrorIcon').css({
      'position': 'relative',
      'left': '258px',
      'bottom': '32px',
      'margin': '0 0 15px'
    });
    $('.page-payment-details .nectar_two .errorMessagePosition .form_field_error .form_field_error-message').css({
      'left': '82px',
      'top': '5px',
      'background': '#fff'
    });
    $('.page-payment-details #regNectarPointsOne').css('border', '1px solid #C00C0C');
    $('.page-payment-details #regNectarPointsTwo').css('border', '1px solid #C00C0C');
    $('.page-payment-details .nectar_one').css('display', 'none');
  };
  if ($('.page-payment-details .nectarErrorCode div').hasClass('errorMessagePosition')) {
    $('.page-payment-details .nectarPointsDescr').css('margin', '20px 0 0');
  };

  /************************************ Nectar Card Error messaging margin - Payment page  *******************************/
  if ($('.page-multiStepCheckoutSummaryPage .nectar_one div').hasClass('errorMessagePosition')) {
    $('.page-multiStepCheckoutSummaryPage #nectarTooltip').css({
      'position': 'relative',
      'left': '30px'
    });
    $('.page-multiStepCheckoutSummaryPage .nectar_one .errorMessagePosition .formErrorIcon').css({
      'position': 'relative',
      'left': '143px',
      'bottom': '42px',
      'margin': '0 0 -25px'
    });
    $('.page-multiStepCheckoutSummaryPage .nectar_one .errorMessagePosition .form_field_error .form_field_error-message').css({
      'left': '115px',
      'background': '#fff'
    });
    $('.page-multiStepCheckoutSummaryPage #regNectarPointsOne').css('border', '1px solid #C00C0C');
    $('.page-multiStepCheckoutSummaryPage #regNectarPointsTwo').css('border', '1px solid #C00C0C');
    $('.page-multiStepCheckoutSummaryPage .nectar_two').css('display', 'none');
  } else if ($('.page-multiStepCheckoutSummaryPage .nectar_two div').hasClass('errorMessagePosition')) {
    $('.page-multiStepCheckoutSummaryPage #nectarTooltip').css({
      'position': 'relative',
      'left': '30px'
    });
    $('.page-multiStepCheckoutSummaryPage .nectar_two .errorMessagePosition .formErrorIcon').css({
      'position': 'relative',
      'left': '258px',
      'bottom': '32px',
      'margin': '0 0 15px'
    });
    $('.page-multiStepCheckoutSummaryPage .nectar_two .errorMessagePosition .form_field_error .form_field_error-message').css({
      'left': '82px',
      'background': '#fff'
    });
    $('.page-multiStepCheckoutSummaryPage #regNectarPointsOne').css('border', '1px solid #C00C0C');
    $('.page-multiStepCheckoutSummaryPage #regNectarPointsTwo').css('border', '1px solid #C00C0C');
    $('.page-multiStepCheckoutSummaryPage .nectar_one').css('display', 'none');
  };
  if ($('.page-multiStepCheckoutSummaryPage .nectarErrorCode div').hasClass('errorMessagePosition')) {
    $('.page-multiStepCheckoutSummaryPage .nectarPointsDescr').css('margin', '0');
  };



  /************************************ Position Error Icons and Tooltip icons when errors shown ***********************/
  if ($('#tuUpdateProfileForm .profileContactNumber .errorMessagePosition .formErrorIcon').is(':visible')) {
    $('#tuUpdateProfileForm .profileContactNumber .tuToolTip').css('left', '40px');
  };
  if ($('#tuUpdateProfileForm .profileMobileNumber .errorMessagePosition .formErrorIcon').is(':visible')) {
    $('#tuUpdateProfileForm .profileMobileNumber .tuToolTip').css('left', '40px');

  };

  /************************************ Error Icon and red border on title drop down for registration page *************/
  if ($('.titleBox .form_field-input').hasClass('errorSelectBox')) {
    $('.titleBox .selectBox-arrow').css('border', '1px solid #C00C0C');
    $('.titleBox .formErrorIcon').css({
      'position': 'relative',
      'left': '35px'
    });
  };


  /************************************ Error if no size is chosen on add to cart PDP  ***********************************/
  /*	$('.disabledAddToCart' ).click(function() {
  	  $('.pdp-add-to-cart-error-message').show();
  	  $('.sizeBox #size').css('border', '1px solid #C00C0C');
  	 // $('.sizeBox .selectBox-arrow').css('border', '1px solid #C00C0C');
  	  $('.sizeBox .formErrorIcon').show();
  	});*/

  /************************************ Error Icon and red boarder on title drop down for registration page *************/
  if ($('.addressform_button_panel .form_field-input').hasClass('errorSelectBox')) {
    $('.addressform_button_panel .selectBox-arrow').css('border', '1px solid #C00C0C');
    //$('.addressform_button_panel .formErrorIcon').css({'position' : 'relative' , 'left' : '35px'});
  };

  /************************************ Error Icon and tool tip for change password page  My Account  *******************/
  if ($('.page-profile .newPassword div').hasClass('errorMessagePosition')) {
    $('.page-profile .tuToolTip').css({
      'top': '2px',
      'left': '30px'
    });
  };


  /************************************ Hide C&C unavailable for Staff discount  **************************************/
  if ($('#selectCandCForm').is(':visible')) {
    $('.disabledcandc').css('display', 'none');
  };

  /************************************ Staff discount £15 remove active label fix  **************************************/
  if ($('.disabledcandc').css('display') == 'none') {
    $('.deliveryOptionLabel').removeClass('active-label');
    $('.deliveryContent').css('display', 'none');
  };
  if ($('#selectHomeDeliveryForm #tuAddressForm .addressList .selected').hasClass('showThisButton')) {
    $('#selectHomeDeliveryForm .deliveryOptionLabel').addClass('active-label');
    $('#selectHomeDeliveryForm .deliveryContent').css('display', 'block');
  };

  /************************************ Postcode not available during trial  **************************************/
  if ($('#tuAddressForm .findAddressField .form_field_error .form_field_error-message .error:contains("unable to deliver to this postcode during the trial period")').length > 0) {
    $('#tuAddressForm .findAddressField .form_field_error .form_field_error-message .error').css({
      'position': 'relative',
      'top': '20px'
    });
    $('#tuAddressForm .addressList .addressform_button_panel .save_address_button').css({
      'position': 'relative',
      'top': '50px'
    });
    $('#tuAddressForm .editAddressButton').css({
      'position': 'relative',
      'top': '70px'
    });
    $('#tuAddressForm .addressList').css('margin-bottom', '80px');
  };


  /************************************ Add padding when the user is locked out ************************************/

  if ($('#globalMessages .information_message .icon:contains("For security reasons your account has been locked")').length > 0) {
    $('#globalMessages div').css('height', '55px');
    $('#globalMessages .icon').css({
      'line-height': '20px',
      'top': '10px'
    });
  };

  /************************************* Change the Mini basket icon title text when adding item to the basket **********/
  if ($('#Size').find('option').length <= 1) {
    $('#qty').removeAttr('disabled');
  } else if ($('#isSizeVariant').val() != 'true') {
    $('#qty').append("<option value='1' selected='selected' disabled='disabled'>1</option>");
    //$('#qty').attr('disabled', 'disabled');
  };
  $('#addToCartButton').click(function() {
    $('#cart_link').attr('title', 'View your basket');
    $('#cart_link .icon').attr('title', 'View your basket');
  });
  $('#Size').change(function() {
    var option = $(this).find('option:selected').val();
    if (option === 'pickSize') {
      $('#jsonProductCodePost').val('');
      alert("Please select size");
      $('.sizeBox #Size').css('border', '2px solid #C00C0C');
      $('.sizeBox .formErrorIcon').show();
      // $('#qty').attr('disabled', 'disabled');
    } else {

      $.get("/cart/jsonProductRequest", {
          skusize: this.value,
        },
        function(data, status) {

          var isColourVariant = "false";
          if (data == '') {
            var elements = $(".selectBox.selectBox-dropdown");
            var size = $(elements).length;
            for (var i = 0; i < elements.length; i++) {
              if (i == 1) {
                var element = elements[i];
                $(element).addClass("selectBox-disabled");
              }
            }
            return;
          }
          if (data.variantType == 'ApparelColourVariantProduct') {
            isColourVariant = "true";
          }
          if (isColourVariant == "true") {


          } else {
            $("#qty option").attr("selected", "selected");
            $("#qty").removeAttr('disabled');
            var element = $(".selectBox.selectBox-disabled.selectBox-dropdown");
            $(element).removeClass('selectBox-disabled');
            var qb = $(".selectBox.selectBox-dropdown");
            // $(qb).addClass("selectBox-menuShowing selectBox-menuShowing-bottom")
            var quantity = data.productDropdownQuantity;
            $("#qty").empty();
            for (i = 1; i < quantity + 1; i++) {
              $("#qty").append($("<option></option>").val(i).html(i));
            }

          };

          $('#jsonProductCodePost').val($('#Size').val());

          var potentialPromotions = data.potentialPromotions;

          if (potentialPromotions != '' && potentialPromotions != null) {
            if (potentialPromotions[0].couldFireMessages != null) {
              $(".jsonPotentialCouldPromotion").text(data.potentialPromotions[0].couldFireMessages[0]);
            } else if (potentialPromotions[0].description != null) {
              $(".jsonPotentialPromotion").text(data.potentialPromotions[0].description);
            }
          }

          //data.potentialPromotions[0].couldFireMessages
          $(".jsonNowPrice").text(data.price.formattedPromotionPrice);
          if (data.price.formattedWasPrice != null) {
            $(".wasprice .jsonformattedWasPrice").text(data.price.formattedWasPrice);
          } else {
            $(".wasprice .jsonformattedWasPrice").text('');
          }
          if (data.price.formattedWasWasPrice != null) {
            $(".wasprice .jsonformattedWasWasPrice").text(data.price.formattedWasWasPrice);
          } else {
            $(".wasprice .jsonformattedWasWasPrice").text('');
          }


          //stock related
          if (data.stock.stockLevelStatus.code == 'outOfStock' && data.expectedSoon == "true") {
            $(".jsonBackInStockMessage").text("Back in stock soon");
            $('#addToCartButton').attr('disabled', 'disabled');
            $('#qty').attr('disabled', 'disabled');
            $('.backInStockMessage').css('display', 'block');
            $('.outOfStockMessage').css('display', 'none');
            $('#qty').append("<option value='1' selected='selected' disabled='disabled'>1</option>");
            $('.qtyBox').show();
            $(".tuButton").css('background-color', '#ccc');
          }

          if (isColourVariant == 'false' && data.stock.stockLevelStatus.code == 'outOfStock' && data.expectedSoon == 0) {
            $("#addToCartButton").hide();
            //$('#qty').attr('disabled', 'disabled');
            $(".jsonoutOfStockMessage").text('This product is out of stock or may no longer be available');
            $('.backInStockMessage').css('display', 'none');
            $('.outOfStockMessage').css('display', 'block');
            $('#qty').append("<option value='1' selected='selected' disabled='disabled'>1</option>");
            $('.qtyBox').hide();
          } else if (isColourVariant == 'false' && data.stock.stockLevelStatus.code == 'outOfStock' && data.expectedSoon == 1) {
            $('#addToCartButton').attr('disabled', 'disabled');
            $("#addToCartButton").show();
            $(".jsonBackInStockMessage").text("Back in stock soon");
            $(".jsonoutOfStockMessage").text('');
            $('.backInStockMessage').css('display', 'block');
            $('.outOfStockMessage').css('display', 'none');
            $('#qty').append("<option value='1' selected='selected' disabled='disabled'>1</option>");
            $('.qtyBox').show();
            $(".tuButton").css('background-color', '#ccc');
          } else {
            $("#addToCartButton").show();
            $(".jsonBackInStockMessage").text("Add to basket");
            $('#addToCartButton').removeAttr('disabled');
            $('.backInStockMessage').css('display', 'none');
            $('.outOfStockMessage').css('display', 'none');
            $('.qtyBox').show();
          }


        }
      )
    }
  });

  // Clear Error State
  $('#Size').change(function() {
    $('.sizeBox').removeClass('errorState');
    $('#Size').removeAttr('style');
    $('.pdp-add-to-cart-error-message').hide();
    $('.sizeBox .formErrorIcon').hide();
    if ($('#maxQntyExceeded').is(':visible')) {
      $('#maxQntyExceeded').hide();
    };
    $(".tuButton").removeAttr('style');
    if ($('#Size option').hasClass('itemSelected')) {
      $('#Size option').removeClass('itemSelected');
    }
    if ($('#Size option:selected').length) {
      $('#Size option:selected').addClass('itemSelected');
    };

    /* 	if($('#Size option:contains("Out of Stock")').length)  {
							$('#addToCartButton').attr('disabled','disabled');
							$('#qty').attr('disabled','disabled');
							$('.qtyBox').hide();
							$('.backInStockMessage').css('display', 'none');
							$('.outOfStockMessage').css('display', 'block');
						} else if($('#Size option:contains("Back in stock soon")').length) {
							$('#addToCartButton').attr('disabled','disabled');
							$("#addToCartButton").show();
							$(".jsonBackInStockMessage").text("Back in stock soon");
							$(".jsonoutOfStockMessage").text('');
							$(".tuButton").css('background-color', '#ccc');
							$('.backInStockMessage').css('display', 'block');
							$('.outOfStockMessage').css('display', 'none');
							$('.qtyBox').show();
							$('#qty').append("<option value='1' selected='selected' disabled='disabled'>1</option>");
						} else {
							$("#addToCartButton").show();
							$(".jsonBackInStockMessage").text("Add to basket");
							$('#addToCartButton').removeAttr('disabled');
							$('.backInStockMessage').css('display', 'none');
							$('.outOfStockMessage').css('display', 'none');
							$('.qtyBox').show();
							$(".tuButton").removeAttr('style');
						};*/
  });

  if ($('.jsonoutOfStockMessage:contains("out of stock")').length) {
    $('#addToCartButton').attr('disabled', 'disabled');
    //$('#qty').attr('disabled', 'disabled');
    $('.qtyBox').hide();
    $('.backInStockMessage').css('display', 'none');
    $('.outOfStockMessage').css('display', 'block');
  } else if ($('.jsonoutOfStockMessage:contains("Back in stock soon")').length) {
    $('#addToCartButton').attr('disabled', 'disabled');
    $("#addToCartButton").show();
    $(".jsonBackInStockMessage").text("Back in stock soon");
    $(".jsonoutOfStockMessage").text('');
    $(".tuButton").css('background-color', '#ccc');
    $('.backInStockMessage').css('display', 'block');
    $('.outOfStockMessage').css('display', 'none');
    $('.qtyBox').show();
    $('#qty').append("<option value='1' selected='selected' disabled='disabled'>1</option>");
  } else {
    $("#addToCartButton").show();
    $(".jsonBackInStockMessage").text("Add to basket");
    $('#addToCartButton').removeAttr('disabled');
    $('.backInStockMessage').css('display', 'none');
    $('.outOfStockMessage').css('display', 'none');
    $('.qtyBox').show();
    $(".tuButton").removeAttr('style');
  };

  if ($('#Size option').hasClass('itemSelected')) {
    $('#Size option').removeClass('itemSelected');
  }
  if ($('#Size option:selected').length) {
    $('#Size option:selected').addClass('itemSelected');
  };

  if ($('#Size option:selected').hasClass('itemSelected')) {
    $('#qty').removeAttr('disabled');
    $('#addToCartButton').removeAttr('disabled');
  };

  var optionPickSize = $(this).find('option:selected').val();
  if (optionPickSize === 'pickSize') {
    $('.backInStockMessage').css('display', 'none');
    $('.outOfStockMessage').css('display', 'none');
    $('.qtyBox').show();
    //$('#qty').attr('disabled', 'disabled');
  }

  /******************************** Add title text on check out button ********************************************************/

  if ($('#basket-title:contains("View basket")').length > 0) {
    $('#cart_button').attr('title', 'Proceed to Checkout');
  } else if ($('#basket-title:contains("Close basket")').length > 0) {
    $('#cart_button').attr('title', 'Proceed to Checkout');
  } else {
    $('#cart_button').attr('title', 'Your Basket is empty');
  };


  /********************************  Add to cart disable on submit function ********************************************************/
  $('#addToCartForm').submit(function() {
    $('#addToCartButton').attr('disabled', true);
  });


  /********************************* New Billing address show ***************************************************/

  if ($('.billingUnavailable').val() === 'true') {
    $('#existingBillingAddress1').removeAttr('checked');
    $('#newBillingAddress1').attr('checked', 'checked');
    $('.editBillingAddress .toggleBlock').show();
  }


  /********************************* Postcode Black List Error  ***************************************************/
  if ($('.form_field_error .form_field_error-message div:contains("Unfortunately we currently do not deliver to your postcode")').length > 0) {
    $('.save_address_button').css('margin-top', '25px');
    $('.postCodeSearch .form_field_error .form_field_error-message div').css({
      'position': 'relative',
      'top': '20px'
    });
    $('.showHideDiv').css({
      'position': 'relative',
      'z-index': '999'
    });
  }

  /********************************* Error Message triggered on Guest Checkout preventing Guest Checkout Fix  ****/

  if ($('.guestCheckoutButton').hasClass('guestSelected')) {
    $('.checkoutRegClick').removeAttr('checked');
    $('.checkoutGuestClick').attr('checked', 'checked');
    $('.regCheckoutButton').css('display', 'none');
    $('.guestCheckoutButton').css('display', 'block');
  }

  /********************************* Add active state to first li on colour varients on search page  *************/
  $('.page-search .colour').find('li:nth-child(1)').addClass("active");
  $('.page-productGrid .colour').find('li:nth-child(1)').addClass("active");

  /********************************  Login disable on submit function ********************************************************/
  $('#loginForm').submit(function() {
    $('.loginButtonMain').attr('disabled', true);
  });

  function validPostcode(postcode) {
    postcode = postcode.replace(/\s/g, "");
    var regex = /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i;
    return regex.test(postcode);
  }

  function addValidator(name, validator) {
    jQuery.validator.addMethod(name, function(value, element) {
      return validator(value);
    });
  }

  addValidator("validPostcode", validPostcode);



  /******************************** IE Cart Position Fix ********************************************************/
  /******************************** DO NOT PUT CODE BELOW THIS LINE *********************************************/

  function GetBrowser() {
    var ua = window.navigator.userAgent
    var msie = ua.indexOf("MSIE ")

    // If Internet Explorer, return version number
    if (msie > 0)
      return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)))

    // If Internet Explorer 11 handling differently becaue UserAgent string updated by Microsoft
    else if (!!navigator.userAgent.match(/Trident\/7\./))
      return 11;
    else
    //If another browser just returning  0
      return 0
  }
  if (GetBrowser() > 0)
  // alert("IE Version No: " + GetBrowser());

    $('#nav_cart').click(function(event) {
    // Calculate pageX/Y if missing and clientX/Y available
    if (event.pageX == null && event.clientX != null) {
      var doc = document.documentElement,
        body = document.body;
      event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
      event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
    }
    $('#hdnCR').val(event.target.id);

    $('#rollover_cart_popup').css({
      'left': event.pageX - 550,
      'top': event.pageY - 15,
      'display': 'inline',
      "position": "absolute"
    }).toggle();
  });
  //  else
  //  alert("Not IE");

}); //end of $.ready()
