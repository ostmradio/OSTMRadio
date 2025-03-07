/* =================================
------------------------------------
	88.0 - Radio Station Template
	Version: 1.0
 ------------------------------------ 
 ====================================*/


'use strict';


$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");

});

(function($) {
	/*------------------
		Navigation
	--------------------*/
	$('.nav-switch').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});

	/*------------------
		Submenu
	
	$('.sub-menu').hide();
	$('li').on("mouseenter", function () {
		$(this).find(".sub-menu").stop(true, true).show();
	});
	$('li').on("mouseleave", function () {
		$(this).find(".sub-menu").stop(true, true).hide();
	});

	/*------------------
		Background Set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		Hero Slider
	--------------------*/
	$('.hero-slider').owlCarousel({
		loop: true,
		nav: true,
		dots: true,
		mouseDrag: false,
		navText:['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		items: 1,
		autoplay: true
	});

	
	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').removeClass('active');
		var $this = $(this);
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});


	/*------------------
		Circle progress
	--------------------*/
	$('.circle-progress').each(function() {
		var cpvalue = $(this).data("cpvalue");
		var cpcolor = $(this).data("cpcolor");
		var cptitle = $(this).data("cptitle");
		var cpid 	= $(this).data("cpid");

		$(this).append('<div class="'+ cpid +'"></div><div class="progress-info"><h2>'+ cpvalue +'%</h2><p>'+ cptitle +'</p></div>');

		if (cpvalue < 100) {

			$('.' + cpid).circleProgress({
				value: '0.' + cpvalue,
				size: 181,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		} else {
			$('.' + cpid).circleProgress({
				value: 1,
				size: 181,
				thickness: 3,
				fill: cpcolor,
				emptyFill: "rgba(0, 0, 0, 0)"
			});
		}

	});

	//Press on presenter
	$(document).ready(function () {
		$(".dj-single").click(function () {
			var link = $(this).data("link");
			window.location.href = link;
			console.log("Pressed the presenter");
		});

		$(".dj-social-links a").click(function (event) {
			event.stopPropagation();
		});
	});


	//Audio play/pause button
	// Get a reference to the audio element, the play/pause button, and the icon element
	const audioElement = document.getElementById('live-audio');
	const playPauseButton = document.getElementById('live-play-button');
	const iconElement = playPauseButton.querySelector('i');

	// Add an event listener to the play/pause button
	playPauseButton.addEventListener('click', () => {
		// Toggle the playback of the audio
		if (audioElement.paused) {
			audioElement.load(); // reload the audio
			audioElement.play();
			iconElement.classList.remove('fa-play');
			iconElement.classList.add('fa-pause');
		} else {
			audioElement.pause();
			iconElement.classList.remove('fa-pause');
			iconElement.classList.add('fa-play');
		}
	});


	//Timer
	// Get a reference to the audio element and the timer element
	const timerElement = document.getElementById('time-elapsed');
	let timer = 0;
	let timerInterval;

	// Add an event listener to the audio element
	audioElement.addEventListener('play', () => {
		// Start the timer when the audio starts playing
		timerInterval = setInterval(() => {
			// Increment the timer by 1 second
			timer += 1;

			// Calculate the minutes and seconds
			const minutes = Math.floor(timer / 60);
			const seconds = timer % 60;

			// Format the timer string
			const timerString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

			// Update the timer element with the new timer value
			timerElement.textContent = `${timerString}`;
		}, 1000); // update the timer every 1 second
	});

	// Add an event listener to the audio element
	audioElement.addEventListener('pause', () => {
		// Stop the timer when the audio is paused
		clearInterval(timerInterval);
	});

	//Audio volume

	const volumeRange = document.getElementById('volume-slider');

	// Set the initial volume of the audio element
	audioElement.volume = volumeRange.value;

	// Add an event listener to the volume range input
	volumeRange.addEventListener('input', function () {
		// Update the volume of the audio element
		audioElement.volume = this.value;
	});

	// making the audioPlayer iframe not refresh
	window.onload = function () {
		var iframe = document.getElementById('audio-player-iframe');
		var currentSrc = iframe.src;
		iframe.src = currentSrc;
	};



})(jQuery);