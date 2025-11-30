$(document).ready(function() {
	// $('.showcase__btn').on('click', function(e) {
	// 	e.preventDefault()

	// 	const target = $($(this).attr('href') || $(this).data('target'))
	// 	if (target.length) {
	// 		$('html, body').animate(
	// 			{
	// 				scrollTop: target.offset().top
	// 			},
	// 			600 // длительность прокрутки (в мс)
	// 		)
	// 	}
	// })

	const work = new Swiper('.work__slider', {
		slidesPerView: 1,
		loop: true,

		navigation: {
			nextEl: '.work__next',
			prevEl: '.work__prev'
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	})


		const arch = new Swiper('.arch__container', {
		slidesPerView: 1,
		loop: true,

		navigation: {
			nextEl: '.arch__next',
			prevEl: '.arch__prev',
		},
	
		
	})
})
