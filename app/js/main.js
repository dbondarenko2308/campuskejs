$(document).ready(function() {
	let dp = new AirDatepicker('.calendar-input', {
		range: true,
		// inline: true,
		multipleDatesSeparator: ' - ',
		dateFormat: 'dd.MM.yyyy',
		// autoClose: true,
		onSelect({ datepicker }) {
			if (datepicker.selectedDates.length === 2) {
				datepicker.hide()
			}
		}
	})

	$('.field input, .field-area textarea').keyup(function() {
		const label = $(this).parent().find('.field__label')
		const span = $(this).parent().find('.field__error')
		if ($(this).val().length > 0) {
			$(label).addClass('top')
			$(this).removeClass('error')
			$(span).hide()
		} else {
			$(label).removeClass('top')
		}
	})

	$('[data-fancybox]').fancybox({
		touch: false
	})

	$(function() {
		const inputs = document.querySelectorAll('.form-control.tel')

		$('.iti.iti--allow-dropdown.iti--separate-dial-code').each(function() {
			const itiInstance = $(this).data('intlTelInput')
			if (itiInstance) {
				itiInstance.destroy()
			}
		})

		inputs.forEach(input => {
			const iti = intlTelInput(input, {
				initialCountry: 'ru',
				separateDialCode: true,
				formatOnDisplay: false,
				utilsScript:
					'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js'
			})

			// Сохраняем предыдущее значение (при необходимости)
			let lastCleanNumber = ''

			input.addEventListener('input', function() {
				const countryCode = iti.getSelectedCountryData().iso2
				let phoneNumber = this.value.replace(/\D/g, '')

				// Ограничиваем длину номера в зависимости от страны
				if (countryCode === 'ru' || countryCode === 'kz') {
					phoneNumber = phoneNumber.substring(0, 10)
					this.value = formatPhoneNumber(phoneNumber, '(XXX) XXX-XX-XX')
				} else if (countryCode === 'uz' || countryCode === 'by') {
					phoneNumber = phoneNumber.substring(0, 9)
					this.value = formatPhoneNumber(phoneNumber, '(XX) XXX-XX-XX')
				} else {
					this.value = phoneNumber
				}

				lastCleanNumber = phoneNumber
			})

			input.addEventListener('beforeinput', function(e) {
				if (e.inputType === 'deleteContentBackward') {
					let raw = this.value.replace(/\D/g, '')
					raw = raw.slice(0, -1)

					const countryCode = iti.getSelectedCountryData().iso2

					if (raw.length === 0) {
						this.value = '' // очищаем поле полностью
					} else if (countryCode === 'ru' || countryCode === 'kz') {
						this.value = formatPhoneNumber(raw, '(XXX) XXX-XX-XX')
					} else if (countryCode === 'uz' || countryCode === 'by') {
						this.value = formatPhoneNumber(raw, '(XX) XXX-XX-XX')
					} else {
						this.value = raw
					}

					e.preventDefault() // не даём браузеру самому удалять
				}
			})
		})

		// Функция форматирования номера по шаблону
		function formatPhoneNumber(number, pattern) {
			let i = 0
			return pattern
				.replace(/X/g, () => (i < number.length ? number[i++] : ''))
				.replace(/[-()\s]+$/, '') // убираем хвост, если недозаполнено
		}
	})

	const input = document.querySelector('input[type=number]')

	input.addEventListener('input', () => {
		input.value = input.value.replace(/[^0-9]/g, '')
	})
})
