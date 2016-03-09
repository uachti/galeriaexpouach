$(document).ready(function($){
    /******************** VERTICAL FIXED NAVIGATION ********************/
    var scrolling = false;
    var contentSections = $('.cd-section'),
            verticalNavigation = $('.cd-vertical-nav'),
            navigationItems = verticalNavigation.find('a'),
            navTrigger = $('.cd-nav-trigger'),
            scrollArrow = $('.cd-scroll-down');

    $(window).on('scroll', checkScroll);

    //smooth scroll to the selected section
    verticalNavigation.on('click', 'a', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
        verticalNavigation.removeClass('open');
    });

    //smooth scroll to the second section
    scrollArrow.on('click', function (event) {
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    // open navigation if user clicks the .cd-nav-trigger - small devices only
    navTrigger.on('click', function (event) {
        event.preventDefault();
        verticalNavigation.toggleClass('open');
    });

    function checkScroll() {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame) ? setTimeout(updateSections, 300) : window.requestAnimationFrame(updateSections);
        }
    }

    function updateSections() {
        var halfWindowHeight = $(window).height() / 2,
                scrollTop = $(window).scrollTop();
        contentSections.each(function () {
            var section = $(this),
                    sectionId = section.attr('id'),
                    navigationItem = navigationItems.filter('[href^="#' + sectionId + '"]');
            ((section.offset().top - halfWindowHeight < scrollTop) && (section.offset().top + section.height() - halfWindowHeight > scrollTop))
                    ? navigationItem.addClass('active')
                    : navigationItem.removeClass('active');
        });
        scrolling = false;
    }

    function smoothScroll(target) {
        $('body,html').animate(
                {'scrollTop': target.offset().top},
        300
                );
    }

    /******************** END VERTICAL FIXED NAVIGATION ********************/
    
    
    /******************** LOGIN MODAL WINDOW ********************/
    var formModal = $('.cd-user-modal'),
        formLogin = formModal.find('#cd-login'),
        formSignup = formModal.find('#cd-signup'),
        formForgotPassword = formModal.find('#cd-reset-password'),
        formModalTab = $('.cd-switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        forgotPasswordLink = formLogin.find('.cd-form-bottom-message a'),
        backToLoginLink = formForgotPassword.find('.cd-form-bottom-message a'),
        mainNav = $('.main-nav');

    //open modal
    mainNav.on('click', function (event) {
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-visible');
    });

    //open login-form form
    mainNav.on('click', '.cd-signin', login_selected);

    //close modal
    formModal.on('click', function (event) {
        if ($(event.target).is(formModal) || $(event.target).is('.cd-close-form')) {
            formModal.removeClass('is-visible');
        }
    });
    
    //close modal when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            formModal.removeClass('is-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function (event) {
        event.preventDefault();
        ($(event.target).is(tabLogin)) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function () {
        var togglePass = $(this),
                passwordField = togglePass.prev('input');

        ('password' == passwordField.attr('type')) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
        ('Hide' == togglePass.text()) ? togglePass.text('Show') : togglePass.text('Hide');
        //focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    });

    //show forgot-password form 
    forgotPasswordLink.on('click', function (event) {
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function (event) {
        event.preventDefault();
        login_selected();
    });

    function login_selected() {
        mainNav.children('ul').removeClass('is-visible');
        formModal.addClass('is-visible');
        formLogin.addClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.removeClass('is-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function forgot_password_selected() {
        formLogin.removeClass('is-selected');
        formSignup.removeClass('is-selected');
        formForgotPassword.addClass('is-selected');
    }

    //REMOVE THIS - it's just to show error messages 
    formLogin.find('input[type="submit"]').on('click', function (event) {
        event.preventDefault();
        formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });
    formSignup.find('input[type="submit"]').on('click', function (event) {
        event.preventDefault();
        formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-visible');
    });


    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if (!Modernizr.input.placeholder) {
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function () {
            $(this).find('[placeholder]').each(function () {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }
    /******************** END LOGIN MODAL WINDOW ********************/
    
    var duration = 250,
            epsilon = (1000 / 60 / duration) / 4,
            firstCustomMinaAnimation = bezier(.42, .03, .77, .63, epsilon),
            secondCustomMinaAnimation = bezier(.27, .5, .6, .99, epsilon),
            animating = false;

    //initialize the slider
    $('.cd-slider-wrapper').each(function () {
        initSlider($(this));
    });

    function initSlider(sliderWrapper) {
        //cache jQuery objects
        var slider = sliderWrapper.find('.cd-slider'),
                sliderNav = sliderWrapper.find('.cd-slider-navigation'),
                sliderControls = sliderWrapper.find('.cd-slider-controls').find('li');

        //store path 'd' attribute values	
        var pathArray = [];
        pathArray[0] = slider.data('step1');
        pathArray[1] = slider.data('step4');
        pathArray[2] = slider.data('step2');
        pathArray[3] = slider.data('step5');
        pathArray[4] = slider.data('step3');
        pathArray[5] = slider.data('step6');

        //update visible slide when user clicks next/prev arrows
        sliderNav.on('click', '.next-slide', function (event) {
            event.preventDefault();
            nextSlide(slider, sliderControls, pathArray);
        });
        sliderNav.on('click', '.prev-slide', function (event) {
            event.preventDefault();
            prevSlide(slider, sliderControls, pathArray);
        });

        //detect swipe event on mobile - update visible slide
        slider.on('swipeleft', function (event) {
            nextSlide(slider, sliderControls, pathArray);
        });
        slider.on('swiperight', function (event) {
            prevSlide(slider, sliderControls, pathArray);
        });

        //update visible slide when user clicks .cd-slider-controls buttons
        sliderControls.on('click', function (event) {
            event.preventDefault();
            var selectedItem = $(this);
            if (!selectedItem.hasClass('selected')) {
                // if it's not already selected
                var selectedSlidePosition = selectedItem.index(),
                        selectedSlide = slider.children('li').eq(selectedSlidePosition),
                        visibleSlide = retrieveVisibleSlide(slider),
                        visibleSlidePosition = visibleSlide.index(),
                        direction = '';
                direction = (visibleSlidePosition < selectedSlidePosition) ? 'next' : 'prev';
                updateSlide(visibleSlide, selectedSlide, direction, sliderControls, pathArray);
            }
        });

        //keyboard slider navigation
        $(document).keyup(function (event) {
            if (event.which == '37' && elementInViewport(slider.get(0))) {
                prevSlide(slider, sliderControls, pathArray);
            } else if (event.which == '39' && elementInViewport(slider.get(0))) {
                nextSlide(slider, sliderControls, pathArray);
            }
        });
    }

    function retrieveVisibleSlide(slider, sliderControls, pathArray) {
        return slider.find('.visible');
    }
    function nextSlide(slider, sliderControls, pathArray) {
        var visibleSlide = retrieveVisibleSlide(slider),
                nextSlide = (visibleSlide.next('li').length > 0) ? visibleSlide.next('li') : slider.find('li').eq(0);
        updateSlide(visibleSlide, nextSlide, 'next', sliderControls, pathArray);
    }
    function prevSlide(slider, sliderControls, pathArray) {
        var visibleSlide = retrieveVisibleSlide(slider),
                prevSlide = (visibleSlide.prev('li').length > 0) ? visibleSlide.prev('li') : slider.find('li').last();
        updateSlide(visibleSlide, prevSlide, 'prev', sliderControls, pathArray);
    }
    function updateSlide(oldSlide, newSlide, direction, controls, paths) {
        if (!animating) {
            //don't animate if already animating
            animating = true;
            var clipPathId = newSlide.find('path').attr('id'),
                    clipPath = Snap('#' + clipPathId);

            if (direction == 'next') {
                var path1 = paths[0],
                        path2 = paths[2],
                        path3 = paths[4];
            } else {
                var path1 = paths[1],
                        path2 = paths[3],
                        path3 = paths[5];
            }

            updateNavSlide(newSlide, controls);
            newSlide.addClass('is-animating');
            clipPath.attr('d', path1).animate({'d': path2}, duration, firstCustomMinaAnimation, function () {
                clipPath.animate({'d': path3}, duration, secondCustomMinaAnimation, function () {
                    oldSlide.removeClass('visible');
                    newSlide.addClass('visible').removeClass('is-animating');
                    animating = false;
                });
            });
        }
    }

    function updateNavSlide(actualSlide, controls) {
        var position = actualSlide.index();
        controls.removeClass('selected').eq(position).addClass('selected');
    }

    function bezier(x1, y1, x2, y2, epsilon) {
        //https://github.com/arian/cubic-bezier
        var curveX = function (t) {
            var v = 1 - t;
            return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
        };

        var curveY = function (t) {
            var v = 1 - t;
            return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
        };

        var derivativeCurveX = function (t) {
            var v = 1 - t;
            return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
        };

        return function (t) {

            var x = t, t0, t1, t2, x2, d2, i;

            // First try a few iterations of Newton's method -- normally very fast.
            for (t2 = x, i = 0; i < 8; i++) {
                x2 = curveX(t2) - x;
                if (Math.abs(x2) < epsilon)
                    return curveY(t2);
                d2 = derivativeCurveX(t2);
                if (Math.abs(d2) < 1e-6)
                    break;
                t2 = t2 - x2 / d2;
            }

            t0 = 0, t1 = 1, t2 = x;

            if (t2 < t0)
                return curveY(t0);
            if (t2 > t1)
                return curveY(t1);

            // Fallback to the bisection method for reliability.
            while (t0 < t1) {
                x2 = curveX(t2);
                if (Math.abs(x2 - x) < epsilon)
                    return curveY(t2);
                if (x > x2)
                    t0 = t2;
                else
                    t1 = t2;
                t2 = (t1 - t0) * .5 + t0;
            }

            // Failure
            return curveY(t2);

        };
    }
    ;

    /*
     How to tell if a DOM element is visible in the current viewport?
     http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
     */
    function elementInViewport(el) {
        var top = el.offsetTop;
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        var height = el.offsetHeight;

        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop;
            left += el.offsetLeft;
        }

        return (
                top < (window.pageYOffset + window.innerHeight) &&
                left < (window.pageXOffset + window.innerWidth) &&
                (top + height) > window.pageYOffset &&
                (left + width) > window.pageXOffset
                );
    }
    
    $('.cd-vertical-nav').mouseover(function(){ 
        $('.main-nav').css('margin-right', '9%');
        $('.cd-vertical-nav').mouseleave(function() {
           $('.main-nav').css('margin-right', '1%'); 
        });
    });
    
    
    
});

//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function () {
    return this.each(function () {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.focus();
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
};
