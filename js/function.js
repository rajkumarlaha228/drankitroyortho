(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 

	/* Preloader Effect */
	$window.on('load', function(){
		$(".preloader").fadeOut(600);
	});

	/* Sticky Header */	
	if($('.active-sticky-header').length){
		$window.on('resize', function(){
			setHeaderHeight();
		});

		function setHeaderHeight(){
	 		$("header.main-header").css("height", $('header .header-sticky').outerHeight());
		}	
	
		$(window).on("scroll", function() {
			var fromTop = $(window).scrollTop();
			setHeaderHeight();
			var headerHeight = $('header .header-sticky').outerHeight()
			$("header .header-sticky").toggleClass("hide", (fromTop > headerHeight + 100));
			$("header .header-sticky").toggleClass("active", (fromTop > 600));
		});
	}	
	
	/* Slick Menu JS */
	$('#menu').slicknav({
		label : '',
		prependTo : '.responsive-menu'
	});

	if($("a[href='#top']").length){
		$("a[href='#top']").click(function() {
			$("html, body").animate({ scrollTop: 0 }, "slow");
			return false;
		});
	}

	/* Hero Slider Layout JS */
	const hero_slider_layout = new Swiper('.hero-slider-layout .swiper', {
		slidesPerView : 1,
		speed: 1000,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 4000,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});

	/* testimonial Slider JS */
	if ($('.testimonial-slider').length) {
		const testimonial_slider = new Swiper('.testimonial-slider .swiper', {
			slidesPerView : 1,
			speed: 1000,
			spaceBetween: 30,
			loop: true,
			autoplay: {
				delay: 3000,
			},
			navigation: {
				nextEl: '.testimonial-button-next',
				prevEl: '.testimonial-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			breakpoints: {
				768:{
				  	slidesPerView: 2,
				},
				991:{
				  	slidesPerView: 3,
				}
			}
		});
	}

	/* Skill Bar */
	if ($('.skills-progress-bar').length) {
		$('.skills-progress-bar').waypoint(function() {
			$('.skillbar').each(function() {
				$(this).find('.count-bar').animate({
				width:$(this).attr('data-percent')
				},2000);
			});
		},{
			offset: '50%'
		});
	}

	/* Youtube Background Video JS */
	if ($('#herovideo').length) {
		var myPlayer = $("#herovideo").YTPlayer();
	}

	/* Init Counter */
	if ($('.counter').length) {
		$('.counter').counterUp({ delay: 6, time: 3000 });
	}

	/* Image Reveal Animation */
	if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }

	/* Text Effect Animation */
	if ($('.text-anime-style-1').length) {
		let staggerAmount 	= 0.05,
			translateXValue = 0,
			delayValue 		= 0.5,
		   animatedTextElements = document.querySelectorAll('.text-anime-style-1');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.words, {
				duration: 1,
				delay: delayValue,
				x: 20,
				autoAlpha: 0,
				stagger: staggerAmount,
				scrollTrigger: { trigger: element, start: "top 85%" },
				});
		});		
	}
	
	if ($('.text-anime-style-2').length) {				
		let	 staggerAmount 		= 0.03,
			 translateXValue	= 20,
			 delayValue 		= 0.1,
			 easeType 			= "power2.out",
			 animatedTextElements = document.querySelectorAll('.text-anime-style-2');
		
		animatedTextElements.forEach((element) => {
			let animationSplitText = new SplitText(element, { type: "chars, words" });
				gsap.from(animationSplitText.chars, {
					duration: 1,
					delay: delayValue,
					x: translateXValue,
					autoAlpha: 0,
					stagger: staggerAmount,
					ease: easeType,
					scrollTrigger: { trigger: element, start: "top 85%"},
				});
		});		
	}
	
	if ($('.text-anime-style-3').length) {		
		let	animatedTextElements = document.querySelectorAll('.text-anime-style-3');
		
		 animatedTextElements.forEach((element) => {
			//Reset if needed
			if (element.animation) {
				element.animation.progress(1).kill();
				element.split.revert();
			}

			element.split = new SplitText(element, {
				type: "lines,words,chars",
				linesClass: "split-line",
			});
			gsap.set(element, { perspective: 400 });

			gsap.set(element.split.chars, {
				opacity: 0,
				x: "50",
			});

			element.animation = gsap.to(element.split.chars, {
				scrollTrigger: { trigger: element,	start: "top 90%" },
				x: "0",
				y: "0",
				rotateX: "0",
				opacity: 1,
				duration: 1,
				ease: Back.easeOut,
				stagger: 0.02,
			});
		});		
	}

	/* Parallaxie js */
	var $parallaxie = $('.parallaxie');
	if($parallaxie.length && ($window.width() > 991))
	{
		if ($window.width() > 768) {
			$parallaxie.parallaxie({
				speed: 0.55,
				offset: 0,
			});
		}
	}

	/* Contact form validation */
	var $contactform = $("#contactForm");
	$contactform.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitForm();
		}
	});

	function submitForm(){
		/* Initiate Variables With Form Content*/
		var fullname = $("#fullname").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var subject = $("#subject").val();
		var message = $("#msg").val();

		$.ajax({
			type: "POST",
			url: "form-process.php",
			data: "fullname=" + fullname + "&name=" + "&email=" + email + "&phone=" + phone + "&subject=" + subject + "&message=" + message,
			success : function(text){
				if (text == "success"){
					formSuccess();
				} else {
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$contactform[0].reset();
		submitMSG(true, "Message Sent Successfully!")
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-success";
		} else {
			var msgClasses = "h3 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Contact form validation end */

	/* Appointment form validation */
	var $appointmentForm = $("#appointmentForm");
	$appointmentForm.validator({focus: false}).on("submit", function (event) {
		if (!event.isDefaultPrevented()) {
			event.preventDefault();
			submitappointmentForm();
		}
	});

	function submitappointmentForm(){
		/* Initiate Variables With Form Content*/
		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var phone = $("#services").val();
		var date = $("#date").val();

		$.ajax({
			type: "POST",
			url: "form-appointment.php",
			data: "name=" + name + "&email=" + email + "&phone=" + phone + "&services=" + services + "&date=" + date,
			success : function(text){
				if (text == "success"){
					appointmentformSuccess();
				} else {
					appointmentsubmitMSG(false,text);
				}
			}
		});
	}

	function appointmentformSuccess(){
		$appointmentForm[0].reset();
		appointmentsubmitMSG(true, "Message Sent Successfully!")
	}

	function appointmentsubmitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-success";
		} else {
			var msgClasses = "h3 text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
	/* Appointment form validation end */

	/* Animated Wow Js */	
	new WOW().init();

	/* Popup Video */
	if ($('.popup-video').length) {
		$('.popup-video').magnificPopup({
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: true
		});
	}
	
})(jQuery);


// partical 

 (function () {
            "use strict";

            var hero = document.querySelector(".hero");
            var canvas = document.querySelector(".hero-particles");
            if (!hero || !canvas || !canvas.getContext) {
                return;
            }

            var context = canvas.getContext("2d");
            if (!context) {
                return;
            }

            var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            var particles = [];
            var width = 0;
            var height = 0;
            var frame = 0;
            var visible = true;
            var pointer = {
                x: -1000,
                y: -1000,
                targetX: -1000,
                targetY: -1000,
                strength: 0,
                targetStrength: 0
            };
            var pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

            function resize() {
                var bounds = hero.getBoundingClientRect();
                width = bounds.width;
                height = bounds.height;
                pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = Math.round(width * pixelRatio);
                canvas.height = Math.round(height * pixelRatio);
                context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

                var count = Math.max(32, Math.min(105, Math.round(width * height / 8500)));
                if (window.innerWidth < 600) {
                    count = Math.min(count, 48);
                }
                particles = Array.from({ length: count }, function () {
                    var depth = 0.35 + Math.random() * 0.65;
                    return {
                        x: Math.random() * width,
                        y: Math.random() * height,
                        depth: depth,
                        radius: 1 + depth * 1.5,
                        vx: (Math.random() - 0.5) * (0.14 + depth * 0.2),
                        vy: (Math.random() - 0.5) * (0.14 + depth * 0.2)
                    };
                });
                draw();
            }

            function draw() {
                context.clearRect(0, 0, width, height);
                var tiltX = (pointer.x / width - 0.5) * 14 * pointer.strength;
                var tiltY = (pointer.y / height - 0.5) * 14 * pointer.strength;

                for (var i = 0; i < particles.length; i++) {
                    var particle = particles[i];
                    var x = particle.x + tiltX * particle.depth;
                    var y = particle.y + tiltY * particle.depth;
                    var dx = pointer.x - x;
                    var dy = pointer.y - y;
                    var distance = Math.sqrt(dx * dx + dy * dy);
                    var influence = distance < 150 ? (1 - distance / 150) * particle.depth * pointer.strength : 0;
                    if (influence) {
                        x -= dx * influence * 0.16;
                        y -= dy * influence * 0.16;
                    }

                    for (var j = i + 1; j < particles.length; j++) {
                        var other = particles[j];
                        var otherX = other.x + tiltX * other.depth;
                        var otherY = other.y + tiltY * other.depth;
                        var lineX = x - otherX;
                        var lineY = y - otherY;
                        var lineDistance = Math.sqrt(lineX * lineX + lineY * lineY);
                        if (lineDistance < 112) {
                            var lineAlpha = (1 - lineDistance / 112) * 0.2 * Math.min(particle.depth, other.depth);
                            if (pointer.strength > 0.01 && (distance < 150 || Math.sqrt((pointer.x - otherX) * (pointer.x - otherX) + (pointer.y - otherY) * (pointer.y - otherY)) < 150)) {
                                lineAlpha += 0.13 * pointer.strength;
                            }
                            context.strokeStyle = "rgba(97, 158, 144, " + lineAlpha + ")";
                            context.lineWidth = 0.7 + Math.min(particle.depth, other.depth) * 0.5;
                            context.beginPath();
                            context.moveTo(x, y);
                            context.lineTo(otherX, otherY);
                            context.stroke();
                        }
                    }

                    context.beginPath();
                    context.arc(x, y, particle.radius, 0, Math.PI * 2);
                    context.fillStyle = "rgba(97, 158, 144, " + (0.2 + particle.depth * 0.42) + ")";
                    context.fill();
                }
            }

            function animate(timestamp) {
                if (!visible || document.hidden) {
                    frame = 0;
                    return;
                }
                var delta = Math.min((timestamp - (animate.lastTimestamp || timestamp - 16.67)) / 16.67, 2);
                animate.lastTimestamp = timestamp;
                pointer.x += (pointer.targetX - pointer.x) * 0.12;
                pointer.y += (pointer.targetY - pointer.y) * 0.12;
                pointer.strength += (pointer.targetStrength - pointer.strength) * 0.12;
                for (var i = 0; i < particles.length; i++) {
                    var particle = particles[i];
                    particle.x += particle.vx * delta;
                    particle.y += particle.vy * delta;
                    if (particle.x < -20) particle.x = width + 20;
                    if (particle.x > width + 20) particle.x = -20;
                    if (particle.y < -20) particle.y = height + 20;
                    if (particle.y > height + 20) particle.y = -20;
                }
                draw();
                frame = window.requestAnimationFrame(animate);
            }

            function start() {
                if (!reducedMotion && visible && !document.hidden && !frame) {
                    frame = window.requestAnimationFrame(animate);
                }
            }

            function stop() {
                if (frame) {
                    window.cancelAnimationFrame(frame);
                    frame = 0;
                }
            }

            hero.addEventListener("pointermove", function (event) {
                var bounds = hero.getBoundingClientRect();
                pointer.targetX = event.clientX - bounds.left;
                pointer.targetY = event.clientY - bounds.top;
                pointer.targetStrength = 1;
                if (reducedMotion) draw();
            }, { passive: true });
            hero.addEventListener("pointerleave", function () {
                pointer.targetStrength = 0;
                if (reducedMotion) draw();
            });
            window.addEventListener("resize", resize, { passive: true });
            document.addEventListener("visibilitychange", function () {
                if (document.hidden) {
                    stop();
                } else {
                    start();
                }
            });

            if ("IntersectionObserver" in window) {
                new IntersectionObserver(function (entries) {
                    visible = entries[0].isIntersecting;
                    if (visible) start();
                    else stop();
                }).observe(hero);
            }

            resize();
            start();
        }());