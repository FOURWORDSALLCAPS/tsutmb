//@prepros-append start.js
//@prepros-append script.js
//@prepros-append end.js

var dateSelected = null;
const url_announce  = window.location.href;
const isAnnounceType = (url, date) => (url.includes("/events/")) 
											? date 
											: null;
const currPath = window.location.href;

if(currPath.includes('sveden/grants/')) {
	$(document).ready(function() {
  // Выполняем скроллинг к элементу аккордеона
	  $("#4893").get(0).scrollIntoView({ behavior: "smooth" });
	
	  // Раскрываем элемент аккордеона
	   $("#4893 > div.docs-card__wrap-body").removeClass('docs-card__wrap-body--close');
	});
}



function getDataFromInfoblock() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var url = '/events/eventsHandler.php'; 

    // Открываем соединение
    xhr.open('GET', url, true);
    // Устанавливаем обработчик события загрузки

    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        resolve(response);
      } else {
        reject('Ошибка запроса: ' + xhr.status);
      }
    };
    xhr.send();
  });
}
const initActiveEventsDates = (dates) => {
	Array.from(document.querySelectorAll(".datepicker--cell.datepicker--cell-day")).forEach((cell) => {
		let {date, month, year} = cell.dataset;
	
		day = (Number(date) < 10) ? "0" + date : date;
		month = ((Number(month) + 1) < 10) ? "0" + (Number(month) + 1) : (Number(month) + 1);
		const dmy = day + '.' + month + '.' + year;

		if (dates?.length > 0 && dates?.indexOf(dmy) !== -1) {
			cell.classList.add("date-highlight");
		}
	})
};


async function initDatePicker(isAjax = false) {
	var myDatePicker = null;
	let highligthedDates = null;

	if(url_announce.includes("/events/")) {
		// Вызываем функцию для получения данных из инфоблока
		highligthedDates = (await getDataFromInfoblock())?.map(date => date.DATE_ACTIVE_FROM);
	}


	if ($('#custom-cells').length) {
		var isClick = true,
			today = new Date(),
			select = true;

		myDatePicker = $('#custom-cells').datepicker(
		{	
			//minDate: isAnnounceType(url_announce, today)
			onSelect(date, datepicker) {
				if(date != "") {
					let arrDate = date.split(".");
					dateSelected = new Date(arrDate[2],arrDate[1]-1,arrDate[0]);
				} else {
					dateSelected = today;
					select = false;
				}
				
				if(isClick){
					$('.bottom.calendar .datepicker-date-value-start').val(date);
					$('.bottom.calendar .datepicker-date-value-end').val(date);
					$('.filter__control .set__filter').trigger('click');
				}
				isClick = true;
				initActiveEventsDates();
			},
		}).data('datepicker');

		$('#custom-cells').on('click', () => {
			initActiveEventsDates(highligthedDates);
		});

		if(isAjax == false) {
			myDatePicker.date = today;

		} else {
			myDatePicker.date = dateSelected;
			isClick = false;
			if(dateSelected != null && dateSelected.toDateString() != today.toDateString()) {
				myDatePicker.selectDate(dateSelected);
			}

		}

		let selDay = $('.datepicker--cell.-selected-');
		if(selDay.length > 0) {
			let dateMonth = String(Number(selDay.attr('data-month'))+1);
			if(dateMonth.length == 1) {
				dateMonth = '0' + dateMonth;
			}
			let dateInp = selDay.attr('data-date')+'.'+dateMonth+'.'+selDay.attr('data-year');
			$('.bottom.calendar .datepicker-date-value-start').val(dateInp);
			$('.bottom.calendar .datepicker-date-value-end').val(dateInp);
		};
		initActiveEventsDates(highligthedDates);
		// myDatePicker.ready(() => {
		// 	document.querySelector('div[data-date="2"][data-month="4"]').classList.add('calendar_red_mark')
		// 	document.querySelector('div[data-date="12"][data-month="4"]').classList.add('calendar_green_mark')
		// 	document.querySelector('div[data-date="23"][data-month="4"]').classList.add('calendar_green')
		// })

	}
}
BX.addCustomEvent('onAjaxSuccess', () => {
    initDatePicker(true);
});



$(document).ready(function () {
	if ($('.btn-menu').length) {
		$(document).ready(function () {
			$('.btn-menu').click(function (event) {
				$('body').toggleClass('lock');
			});
		});
	}

	initDatePicker();

	if ($('.content_toggle').length) {
		$('.content_toggle').click(function (event) {
			let parent = $(this).parents('.right')
			let btn = $(this)
			$(parent).find('.content_block').slideToggle(300, function () {
				if ($(this).is(':hidden')) {
					btn.html('Читать полностью');
				} else {
					btn.html('Скрыть текст');
				}
			});
			return false;
		});
	}

	if ($('.read__completely').length) {
		$('.text__toggle').click(function (event) {
			let parent = $(this).parents('.history')
			let btn = $(this)
			$(parent).find('.read__completely').slideToggle(300, function () {
				if ($(this).is(':hidden')) {
					btn.html('Читать полностью');
				} else {
					btn.html('Скрыть ответ');
				}
			});
			return false;
		});
	}

});



$(document).ready(function () {
	if ($('.slider2').length) {
		$('.slider2').slick({
			arrows: true,
			// dots: true,
			slidesToShow: 4,
			// autoplay: true,
			speed: 1000,
			variableWidth: true,
			autoplaySpeed: 800,
			responsive: [
				{
					breakpoint: 1500,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 1380,
					settings: {
						dots: true,
						arrows: false,
						slidesToShow: 3
					}
				},
				{
					breakpoint: 1240,
					settings: {
						slidesToShow: 2,
						dots: true,
						arrows: false
					}
				},
				{
					breakpoint: 560,
					settings: {
						slidesToShow: 1,
						dots: true,
						arrows: false
					}
				}
			]
		});
	}

	if ($('.slider').length) {
		$('.slider').slick({
			arrows: true,
			dots: true,
			slidesToShow: 1,
			// autoplay: true,
			speed: 1000,
			variableWidth: true,
			autoplaySpeed: 800,
			responsive: [
				{
					breakpoint: 1240,
					settings: {
						arrows: false
					}
				}, {
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 550,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}
			]
		});
	}

	if ($('.slider3').length) {
		$('.slider3').slick({
			arrows: true,
			// dots: true,
			slidesToShow: 3,
			// autoplay: true,
			speed: 1000,
			variableWidth: false,
			autoplaySpeed: 800,
			responsive: [
				{
					breakpoint: 1240,
					// settings: "unslick"
					settings: {
						slidesToShow: 2,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 760,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}

			]
		});
	}


	if ($('.slider4').length) {
		$('.slider4').slick({
			responsive: [
				{
					breakpoint: 2500,
					settings: "unslick"
				},
				{
					breakpoint: 1240,
					settings: {
						slidesToShow: 2,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 760,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}

			]
		});
	}

	if ($('.slider5').length) {
		$('.slider5').slick({
			responsive: [
				{
					breakpoint: 2500,
					settings: "unslick"
				},
				{
					breakpoint: 1240,
					settings: {
						slidesToShow: 2,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}, {
					breakpoint: 760,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}

			]
		});
	}

	if ($('.slider6').length) {
		$('.slider6').slick({
			arrows: true,
			// dots: true,
			slidesToShow: 3,
			// autoplay: true,
			speed: 1000,
			variableWidth: false,
			autoplaySpeed: 800,
			responsive: [
				{
					breakpoint: 1240,
					settings: "unslick"
				}
			]
		});
	}

	if ($('.slider7').length) {
		$('.slider7').slick({
			arrows: true,
			// dots: true,
			slidesToShow: 4,
			// autoplay: true,
			speed: 1000,
			variableWidth: true,
			autoplaySpeed: 800,
			responsive: [
				{
					breakpoint: 1500,
					settings: {
						// variableWidth: false,
						slidesToShow: 3
					}
				},
				{
					breakpoint: 1380,
					settings: {
						dots: true,
						arrows: false,
						// variableWidth: false,
						slidesToShow: 3
					}
				},
				{
					breakpoint: 1240,
					settings: {
						slidesToShow: 2,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				},
				{
					breakpoint: 560,
					settings: {
						slidesToShow: 1,
						variableWidth: false,
						dots: true,
						arrows: false
					}
				}
			]
		});
	}

	if ($('#phone1').length) {
		$('#phone1').mask('+7 (999) 999-99-99');
	}
	if ($('.phone-mask').length) {
		$('.phone-mask').mask('+7 (999) 999-99-99');
	}
	if ($('#phone2').length) {
		$('#phone2').mask('+7 (999) 999-99-99');
	}
	if ($('.tab__header__item').length) {
		$('.tab__header__item').click(function () {
			var id = $(this).attr('data-tab'),
				content = $('.tab__content__item[data-tab="' + id + '"]');

			$('.tab__header__item.active').removeClass('active'); // 1
			$(this).addClass('active'); // 2

			$('.tab__content__item.active').removeClass('active'); // 3
			content.addClass('active'); // 4
		});
	}

	if ($('.numb').length) {
		$('.numb').val('0')

		$('.numb').number_plugin({
			width: '86px',
			height: '46px',
			step: 1,
			max: 100,
			min: 0
		})
	}
});
(function ($) {
	$(function () {

		$('ul.tabs__caption').on('click', 'li:not(.active)', function () {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');

			$('.slider2').slick('refresh')
		});

	});
})(jQuery);

/*(function ($) {
	$(function () {

		$('ul.tab__titl').on('click', 'li:not(.active)', function () {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('div.tabs').find('div.tab__content').removeClass('active').eq($(this).index()).addClass('active');
		});

	});
})(jQuery);*/


$(function () {
	$(".menu-close").click(function () {
		$('.menu__sub').removeClass('active');
		document.querySelector('.hidden-menu').style.overflow = "auto";
		return false;
	});
});


if ($('.mycustom-scroll').length) {
	(function ($) {
		$(window).on('load', function () {
			$('.mycustom-scroll').mCustomScrollbar();
		});
	})(jQuery);
	$('.mycustom-scroll').mCustomScrollbar({
		axis: 'x',
		theme: 'dark-thin',
		scrollInertia: '230',
		setHeight: '100%',
		mouseWheel: {
			deltaFactor: 300
		}
	});
}

if ($('.sections__burger').length) {
	$(document).ready(function () {
		$('.sections__burger').click(function (event) {
			$('.sections__burger,.sections__menu').toggleClass('active');
			$('.sections').toggleClass('lock');
		});
	});
}


if (document.querySelector(".accordion")) {
  
  document.querySelectorAll('.accordion').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      let target = e.currentTarget

      if (document.querySelector('.accordion.active') !== null &&
        document.querySelector('.panel.active') !== null && document.querySelector('.accordion.active') !== target) {
        document.querySelector('.accordion.active').classList.remove('active')
		document.querySelector('.panel.active').style.maxHeight = ''
        document.querySelector('.panel.active').classList.remove('active')
      }

      target.classList.toggle('active')
      target.nextElementSibling.classList.toggle('active')

      if (target.classList.contains('active')) {
        target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + 'px'
      } else {
        target.nextElementSibling.style.maxHeight = ''
      }
    })
  })
  
}



if (document.querySelector(".column__h")) {

	document.querySelectorAll('.column__h').forEach((div) => {
		div.addEventListener('click', (e) => {
			let target = e.currentTarget

			if (document.querySelector('.column__h.active') !== null &&
				document.querySelector('.footer__ul.active') !== null && document.querySelector('.column__h.active') !== target) {
				document.querySelector('.column__h.active').classList.remove('active')
				document.querySelector('.footer__ul.active').classList.remove('active')
			}

			target.classList.toggle('active')
			target.nextElementSibling.classList.toggle('active')
		})
	})

}

/*
if (document.querySelector(".tab")) {
	var currentTab = 0;
	showTab(currentTab);

	function showTab(n) {
		var tab = document.getElementsByClassName("tab");
		tab[n].style.display = "block";

		if (n == (tab.length - 1)) {
			document.getElementById("nextBtn").innerHTML = "Submit";
			document.querySelector(".result__test").style.display = "block";
			document.querySelector(".test2").style.display = "none";
		} else {
			document.getElementById("nextBtn").innerHTML = "Следующий";
		}
		fixStepIndicator(n)
	};

	function nextPrev(n) {
		var x = document.getElementsByClassName("tab");
		if (n == 1 && !validateForm()) return false;
		x[currentTab].style.display = "none";
		currentTab = currentTab + n;
		if (currentTab >= x.length) {
			document.getElementById("regForm").submit();
			return false;
		}
		showTab(currentTab);
	};

	function validateForm() {
		var x, y, i, valid = true;
		x = document.getElementsByClassName("tab");
		y = x[currentTab].getElementsByTagName("input");
		for (i = 0; i < y.length; i++) {
			if (y[i].value == "") {
				y[i].className += " invalid";
				valid = false;
			}
		}
		if (valid) {
			document.getElementsByClassName("step")[currentTab].className += " finish";
		}
		return valid;
	};

	function fixStepIndicator(n) {
		var i, x = document.getElementsByClassName("step");
		for (i = 0; i < x.length; i++) {
			x[i].className = x[i].className.replace(" active", "");
		}
		x[n].className += " active";
	};
}
*/

if (document.querySelector("#filter")) {
	function hideFilter() {
		if (document.getElementById('filter').style.display == 'none') {
			document.getElementById('filter').style.display = "block";
			document.getElementById('titl').classList.add('active');
		} else {
			document.getElementById('filter').style.display = "none";
			document.getElementById('titl').classList.remove('active');
		}
	}
}

if (document.querySelector(".hidden-menu")) {

	document.querySelectorAll('.has-children').forEach((li) => {
		li.addEventListener('click', (e) => {
			let target = e.currentTarget

			if (document.querySelector('.menu__sub.active') !== null) {
				document.querySelector('.menu__sub.active').classList.remove('active');
			}
			document.querySelector('.hidden-menu').style.overflow = "hidden";

			target.children[0].classList.toggle('active');
		})
	});


}


scrollTop()
function scrollTop () {
	if (document.querySelector('.icon-up-scroll') == null) return

	const iconUpScroll = document.querySelector('.icon-up-scroll')
	const clientHeight = document.documentElement.clientHeight

	iconUpScroll.addEventListener('click', () => {
		$('body, html').animate({scrollTop: 0}, 800)
	})

	onScroll()
	window.addEventListener('scroll', onScroll)

	function onScroll (event) {
		if (window.pageYOffset >= clientHeight) {
			iconUpScroll.classList.add('icon-up-scroll--show')
		} else {
			iconUpScroll.classList.remove('icon-up-scroll--show')
		}
	}
}

document.addEventListener('click', collapseDocsCard)
function collapseDocsCard ({target}) {
	const docsCardTop = target.closest('.docs-card__top')

	if (docsCardTop === null) return

	const docsCard = docsCardTop.closest('.docs-card')
	const docsCardTopSvg = docsCard.querySelector('.docs-card__top-svg')
	const docsCardWrapBody = docsCard.querySelector('.docs-card__wrap-body')

	if (docsCardWrapBody.dataset.isAnimation === 'true') return;
	docsCardWrapBody.dataset.isAnimation = 'true'

	const scrollHeight = docsCardWrapBody.scrollHeight
	const domHeight = docsCardWrapBody.getBoundingClientRect().height
	const isOpen = domHeight !== 0

	if (!isOpen) closeAll()

	if (isOpen) docsCardTopSvg.classList.remove('docs-card__top-svg--active')
	else docsCardTopSvg.classList.add('docs-card__top-svg--active')

	const height = (isOpen) ? [domHeight, 0] : [domHeight, scrollHeight]

	anime({
		targets: docsCardWrapBody,
		height: height,
		duration: 250,
		easing: 'linear',
		complete () {
			if (!isOpen) {
				docsCardWrapBody.style.height = ''
				docsCardWrapBody.classList.remove('docs-card__wrap-body--close')
			}

			docsCardWrapBody.dataset.isAnimation = 'false'
		}
	})

	function closeAll () {
		const allDocsCardWrapBody = document.querySelectorAll('.docs-card__wrap-body')
		const allDocsCardTopSvg = document.querySelectorAll('.docs-card__top-svg')

		allDocsCardWrapBody.forEach(docsCardWrapBody => {
			const domHeight = docsCardWrapBody.getBoundingClientRect().height

			anime({
				targets: docsCardWrapBody,
				height: [domHeight, 0],
				duration: 250,
				easing: 'linear'
			})
		})

		allDocsCardTopSvg.forEach(docsCardTopSvg => {
			docsCardTopSvg.classList.remove('docs-card__top-svg--active')
		})
	}
}

gallery()
function gallery() {
	if (document.querySelector('.gallery') === null) return

	new Swiper('.gallery', {
		pagination: {
			el: '.gallery-pagination',
			type: 'fraction',
			renderFraction (currentClass, totalClass) {
				return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`
			}
		},
		navigation: {
			nextEl: '.gallery-button-next',
			prevEl: '.gallery-button-prev',
		},
		breakpoints: {
			0: {
				spaceBetween: 12,
				slidesPerView: 1,
			},
			740: {
				spaceBetween: 12,
				slidesPerView: 2
			},
			1241: {
				spaceBetween: 0,
				slidesPerView: 3
			}
		}
	})
}

newsSlider()
function newsSlider () {
	if (document.querySelector('.news-slider') === null) return

	new Swiper('.news-slider', {
		slidesPerView: 1,
		navigation: {
			nextEl: '.news-slider__next',
			prevEl: '.news-slider__prev',
		}
	})
}

brands()
function brands () {
	if (document.querySelector('.biblioteka-brands') === null) return

	new Swiper('.biblioteka-brands__slider', {
		slidesPerView: 'auto',
		spaceBetween: 68,
		navigation: {
			nextEl: '.swiper-button-next-brands',
			prevEl: '.swiper-button-prev-brands',
		}
	})
}

searchTable()
function searchTable() {
	if (document.querySelector('#search-table-input') === null) return

	const input = document.querySelector('#search-table-input')
	const table = document.querySelector('#search-table')

	input.addEventListener('input', event => {
		let flag
		const regPhrase = new RegExp(input.value, 'i')

		for (let i = 0; i < table.rows.length; i++) {
			const isHeader = table.rows[i].classList.contains('custom-table__header')
			const isLineHeader = table.rows[i].classList.contains('custom-table__line-header')

			if (isHeader || isLineHeader) continue

			for (let j = 0; j < table.rows[i].cells.length; j++) {
				flag = regPhrase.test(table.rows[i].cells[j].innerHTML)

				if (flag) break
			}

			if (flag) table.rows[i].style.display = ''
			else table.rows[i].style.display = 'none'
		}
	})
}

hoverQueryPopupSearch()
function hoverQueryPopupSearch () {
	if (document.querySelector('.search-popup__query') === null) return

	const listQuery = document.querySelectorAll('.search-popup__query')

	for (const query of listQuery) {
		query.addEventListener('mouseenter', event => {
			listQuery.forEach(q => {
				if (q !== query) q.classList.add('search-popup__query--disabled')
			})
		})

		query.addEventListener('mouseleave', event => {
			listQuery.forEach(q => q.classList.remove('search-popup__query--disabled'))
		})
	}
}

openSearchPopup()
function openSearchPopup () {
	if (document.querySelector('.search-popup') === null) return

	const search = document.querySelector('.search')
	const searchPopup = document.querySelector('.search-popup')
	const close = document.querySelector('.search-popup__close')

	search.addEventListener('click', openPopup)
	close.addEventListener('click', closePopup)

	function openPopup (event) {
		searchPopup.classList.remove('search-popup--close')
		hiddenScrollBody()

		anime({
			targets: searchPopup,
			translateY: [-240, 0],
			opacity: [0, 1],
			easing: 'easeOutQuad',
			duration: 400,
		})
	}

	function closePopup () {
		searchPopup.classList.add('search-popup--close')
		showScrollBody()
	}

	function hiddenScrollBody () {
		document.body.style.overflow = 'hidden'
	}

	function showScrollBody () {
		document.body.style.overflow = ''
	}
}

selectFilePopupForm()
function selectFilePopupForm () {
	const input = document.querySelector('.modal-question__file-input')

	if (input === null) return

	const fileText = document.querySelector('.modal-question__text-file')

	input.addEventListener('input', event => {
		if (input.files.length !== 0) fileText.innerHTML = input.files[0].name
	})
}

toggleDropDownVersion()
function toggleDropDownVersion () {
	const eye = document.querySelector('.toggle-drop-down-version')
	const dropDownMenu = document.querySelector('.drop-down-version--desktop')

	if (eye === null || dropDownMenu === null) return

	eye.addEventListener('click', event => {
		dropDownMenu.classList.toggle('drop-down-version--open')
	})
}

toggleMobileVersion()
function toggleMobileVersion () {
	const toggleMobileVersion = document.querySelector('.toggle-mobile-version')
	const menu = document.querySelector('.drop-down-version--mobile')

	if (toggleMobileVersion === null || menu === null) return

	toggleMobileVersion.addEventListener('click', event => {
		menu.classList.toggle('drop-down-version--open')
	})
}

editorVersionColor()
function editorVersionColor () {
	setPageTheme()

	function onClick (controlColor) {
		const type = controlColor.dataset.controlColor

		setStorageColorTheme(type)
		setPageTheme()
	}

	function setStorageColorTheme (type) {
		localStorage.setItem('color-theme', type)
	}

	function setPageTheme () {
		let type = localStorage.getItem('color-theme')

		if (type === null) type = 'light'

		if (type === 'light') document.documentElement.classList.remove('control-color-dark')
		else document.documentElement.classList.add('control-color-dark')

		removeActiveClassAllControlColor()
		addActiveClassAllActiveControlColor(type)
	}

	function removeActiveClassAllControlColor () {
		const listControlColor = document.querySelectorAll('[data-control-color]')

		for (const el of listControlColor) {
			el.classList.remove('drop-down-version__wrap-item--active')
		}
	}

	function addActiveClassAllActiveControlColor (type) {
		const listActoveControls = document.querySelectorAll(`[data-control-color='${type}']`)

		for (const el of listActoveControls) {
			el.classList.add('drop-down-version__wrap-item--active')
		}
	}

	document.addEventListener('click', ({target}) => {
		const controlColor = target.closest('[data-control-color]')

		if (controlColor) onClick(controlColor)
	})
}

editorVersionImage()
function editorVersionImage () {
	setPageTheme()

	function onClick (controlImage) {
		const type = controlImage.dataset.controlImage

		setStorageColorTheme(type)
		setPageTheme()
	}

	function setStorageColorTheme (type) {
		localStorage.setItem('image-theme', type)
	}

	function setPageTheme () {
		let type = localStorage.getItem('image-theme')

		if (type === null) type = 'image'

		if (type === 'image') document.documentElement.classList.remove('not-image')
		else document.documentElement.classList.add('not-image')

		removeActiveClassAllControlImage()
		addActiveClassAllActiveControlImage(type)
	}

	function removeActiveClassAllControlImage () {
		const listControlImage = document.querySelectorAll('[data-control-image]')

		for (const el of listControlImage) {
			el.classList.remove('drop-down-version__wrap-item--active')
		}
	}

	function addActiveClassAllActiveControlImage (type) {
		const listActoveControls = document.querySelectorAll(`[data-control-image='${type}']`)

		for (const el of listActoveControls) {
			el.classList.add('drop-down-version__wrap-item--active')
		}
	}

	document.addEventListener('click', ({target}) => {
		const controlImage = target.closest('[data-control-image]')

		if (controlImage) onClick(controlImage)
	})
}

editorVersionSize()
function editorVersionSize () {
	setPageTheme()

	function onClick (controlImage) {
		const type = controlImage.dataset.controlSize

		setStorageSizeTheme(type)
		setPageTheme()
	}

	function setStorageSizeTheme (type) {
		localStorage.setItem('size-theme', type)
	}

	function setPageTheme () {
		let type = localStorage.getItem('size-theme')

		if (type === null) type = 'def'

		if (type === 'def') document.documentElement.classList.remove('big-size')
		else document.documentElement.classList.add('big-size')

		removeActiveClassAllControlSize()
		addActiveClassAllActiveControlSize(type)
	}

	function removeActiveClassAllControlSize () {
		const listControlImage = document.querySelectorAll('[data-control-size]')

		for (const el of listControlImage) {
			el.classList.remove('drop-down-version__wrap-item--active')
		}
	}

	function addActiveClassAllActiveControlSize (type) {
		const listActoveControls = document.querySelectorAll(`[data-control-size='${type}']`)

		for (const el of listActoveControls) {
			el.classList.add('drop-down-version__wrap-item--active')
		}
	}

	document.addEventListener('click', ({target}) => {
		const controlImage = target.closest('[data-control-size]')

		if (controlImage) onClick(controlImage)
	})
}

inputNumber()
function inputNumber () {
	document.addEventListener('click', ({target}) => {
		const arrow = target.closest('.input-number__arrow')
		if (!arrow) return

		const input = arrow.closest('.input-number').querySelector('.input-number__input')

		const isUp = arrow.classList.contains('input-number__arrow--up')
		const isDown = arrow.classList.contains('input-number__arrow--down')

		const value = Number(input.value)
		const min = input.min
		const max = input.max

		if (isUp && value < max) {
			input.value = value + 1
			dispathChange(input)
		}

		if (isDown && value > min) {
			input.value = value - 1
			dispathChange(input)
		}

		function dispathChange (el) {
			const event = new Event('updateValue')

			el.dispatchEvent(event)
		}
	})

	document.addEventListener('change', ({target}) => {
		if (target.closest('.input-number__input')) {
			const min = target.min
			const max = target.max

			const clearNumber = parseInt(target.value, 10)

			if (!clearNumber || clearNumber < min) {
				target.value = min
				return duspatchUpdateValue(target)
			}
			if (clearNumber > max) {
				target.value = max
				return duspatchUpdateValue(target)
			}

			target.value = clearNumber
			duspatchUpdateValue(target)

			function duspatchUpdateValue (el) {
				el.dispatchEvent(new Event('updateValue'))
			}
		}
	})

	// Запрещаем нажатие клафиш [-,e]
	document.addEventListener('keydown', (event) => {
		if (event.target.closest('.input-number__input')) {
			if (event.code === 'Minus' || event.code === 'KeyE') event.preventDefault()
		}
	})
}

animationNumberCircle()
function animationNumberCircle () {
	const allNumberText = document.querySelectorAll('.circle__counter')

	for (const text of allNumberText) {
		const endValue = text.dataset.endValue

		numberAnimation(text, endValue)
	}

	function numberAnimation (el, endValue) {
		anime({
			targets: el,
			textContent: endValue,
			round: 1,
			easing: 'easeInOutQuad',
			duration: 2000
		})
	}
}

sendFormCalculator()
function sendFormCalculator () {
	const button = $('.count__btn');
	if (button === null) return

	button.on("click", function (e){
		e.preventDefault();
		BX.ajax({
		  url: "/ajax/calculator_ege.php",
		  method: 'POST',
		  dataType: 'html',
		  data: $('.calculator-form').serialize(),
		  onsuccess: function (result){
		    console.log('ajax success', result);
		    $('html, body').animate({
				scrollTop: $('.left__bottom').offset().top + 12
			});
		    check = setTimeout(function(){
		    	$('.list-offers').html(result);
		    	$('.list-offers').fadeIn('400');
		    }, 350);
		  },
		  onfailure: function(result){
		    console.log('ajax error', result);
		  }
		});
	});
}


sumCalculator()
function sumCalculator () {
	const listInputClalculator = document.querySelectorAll('.input-number__input')
	const totalDom = document.querySelector('.calc-total')

	function setTotal () {
		let totalValue = 0

		listInputClalculator.forEach(input => {
			totalValue = totalValue + Number(input.value)
		})

		totalDom.innerHTML = totalValue
	}

	listInputClalculator.forEach(input => {
		input.addEventListener('updateValue', event => {
			setTotal()
		})
	})
}

resetCalculator()
function resetCalculator () {
	const btn = document.querySelector('.reset-calculator')
	const totalDom = document.querySelector('.calc-total')

	if (btn === null || totalDom === null) return

	btn.addEventListener('click', event => {
		totalDom.innerHTML = '0'
	})
}

test()
function test () {
	if (document.querySelector('.test-next') === null) return

	let countStep = 16
	let currentStep = 1

	let answers = {
		1: 0,
		2: 0,
		3: 0,
		4: 0,
		5: 0,
		6: 0,
		7: 0,
		8: 0
	}

	const buttonNext = document.querySelector('.test-next')
	const allTitle = document.querySelectorAll('.list-title-question__title')
	const allWrapAnswer = document.querySelectorAll('.list-answer__wrap-answer')
	const stepBarTrack = document.querySelector('.step-bar__track')
	const testCountCurrent = document.querySelector('.test-count-current')
	const resultDom = document.querySelector('.result__test')
	const testDom = document.querySelector('.start__test')

	function next (event) {
		currentStep++

		if (currentStep > countStep) return result()

		showActiveTitle()
		showActiveWrapAnswer()
		updateBarTrack()
		updateCountCurrent()
		disabledButton()
	}

	function disabledButton () {
		buttonNext.setAttribute('disabled', 'true')
	}

	function result () {
		calcCountAnswer()
		setValueStat()
		animateValue()
		showResult()
		showDomResult()
	}

	function showResult () {
		const arrTopAnswer = findBig3(answers)

		for (let resKey of arrTopAnswer) {
			document.querySelector(`[data-result="${resKey}"]`).classList.remove('result-card-hidden')
		}

		function findBig3 (obj) {
			return Object.keys(obj).sort((a,b) =>  obj[b]-obj[a]).slice(0, 3)
		}
	}

	function animateValue () {
		const allStat = document.querySelectorAll('[data-stat]')

		for (let stat of allStat) {
			anime({
				targets: stat,
				textContent: stat.dataset.value,
				round: 1,
				easing: 'easeInOutQuad',
				duration: 800
			})
		}
	}

	function calcCountAnswer () {
		const allInputChecked = document.querySelectorAll('.answer input:checked')

		allInputChecked.forEach(input => {
			const key = input.closest('label').dataset.key

			answers[key] = answers[key] + 1
		})
	}

	function setValueStat () {
		for (let key in answers) {
			const domStat = document.querySelector(`[data-stat="${key}"]`)
			const itogValue = answers[key] / 16  * 100

			domStat.dataset.value = `${itogValue}`
		}
	}

	function showDomResult () {
		testDom.style.display = 'none'
		resultDom.style.display = 'block'
	}

	function updateBarTrack () {
		stepBarTrack.style.width = `${currentStep / countStep * 100}%`
	}

	function updateCountCurrent () {
		testCountCurrent.innerHTML = currentStep.toString()
	}

	function showActiveTitle () {
		allTitle.forEach(title => title.classList.remove('list-title-question__title--active'))

		allTitle[currentStep - 1].classList.add('list-title-question__title--active')
	}

	function showActiveWrapAnswer () {
		allWrapAnswer.forEach(wrapAnswer => wrapAnswer.classList.remove('list-answer__wrap-answer--active'))

		allWrapAnswer[currentStep - 1].classList.add('list-answer__wrap-answer--active')
	}

	function toggleDisabledButton (event) {
		if (event.target.closest('.answer') === null) return

		buttonNext.removeAttribute('disabled')
	}

	document.addEventListener('change', toggleDisabledButton)
	buttonNext.addEventListener('click', next)
}

swiperAdditionalEducation()
function swiperAdditionalEducation () {
	if (document.querySelector('.slider-dop-obr') === null) return

	const swiper = new Swiper('.slider-dop-obr', {
		autoplay: {
		   delay: 4000,
		 },
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.slider-dop-obr__nav-button--next',
			prevEl: '.slider-dop-obr__nav-button--prev',
		}
	})
}

togglerLanguage()
function togglerLanguage () {
    const btnList = document.querySelectorAll('.select-language__result')
    const modalList = document.querySelectorAll('.select-language__modal')

    document.addEventListener('click', ({ target }) => {
        if (target.closest('.select-language__result')) {
            const selectLanguage = target.closest('.select-language')
            const result = target.closest('.select-language__result')
            const modal = selectLanguage.querySelector('.select-language__modal')

            result.classList.toggle('select-language__result--active')
            modal.classList.toggle('select-language__modal--close')

            return
        }

        if (target.closest('.select-language__value')) {
            const selectLanguage = target.closest('.select-language')

            const result = selectLanguage.querySelector('.select-language__result')
            const modal = selectLanguage.querySelector('.select-language__modal')

            result.classList.remove('select-language__result--active')
            modal.classList.add('select-language__modal--close')
        }
    })

    document.addEventListener('click', ({ target }) => {
        if (!target.closest('.select-language')) {
            for (const modal of modalList) {
                modal.classList.add('select-language__modal--close')
            }

            for (const btn of btnList) {
                btn.classList.remove('select-language__result--active')
            }
        }
    })
}
new Swiper('.swiper-index-module', {
  autoplay: {
    delay: 3500,
  },
  pagination: {
    el: '.swiper-index-module__pagination'
  },
  navigation: {
    nextEl: '.swiper-index-module__btn--next',
    prevEl: '.swiper-index-module__btn--prev'
  }
})

// Dragabble scroll table
const listDragabbleScrollElement = [
  ...document.querySelectorAll('.docs-card__body--inner-table'),
  ...document.querySelectorAll('.wrap-table')
]
listDragabbleScrollElement.forEach(dragScroll => setDraggable(dragScroll))


function setDraggable (ele) {
  ele.style.cursor = 'grab';

  let pos = { top: 0, left: 0, x: 0, y: 0 };

  const mouseDownHandler = function (e) {
    if (e.target.closest('a')) return console.log('Mouse down in <a></a>. Draggable disabled')

    console.log('Draggable')

    ele.style.cursor = 'grabbing'
    ele.style.userSelect = 'none'

    pos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  const mouseMoveHandler = function (e) {
    const dx = e.clientX - pos.x
    const dy = e.clientY - pos.y

    ele.scrollTop = pos.top - dy
    ele.scrollLeft = pos.left - dx
  }

  const mouseUpHandler = function () {
    ele.style.cursor = 'grab'
    ele.style.removeProperty('user-select')

    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
  }

  ele.addEventListener('mousedown', mouseDownHandler)
}
// ---

// Тогглер для олимпиады
togglerOlimpiada()
function togglerOlimpiada () {
  function onCLick ({ target }) {
    const panel = target.closest('.dd__panel')
    const item = target.closest('.dd__item')

    if (panel) {
      const dd = panel.closest('.dd')

      const arrow = dd.querySelector('.dd__arrow')
      const menu = dd.querySelector('.dd__menu')

      arrow.classList.toggle('dd__arrow--open')
      menu.classList.toggle('dd__menu--open')
    }

    if (item) {
      if (item.classList.contains('dd__item--active')) return

      const dd = target.closest('.dd')

      const listItem = dd.querySelectorAll('.dd__item')
      const input = dd.querySelector('.dd__input')
      const value = dd.querySelector('.dd__value')

      listItem.forEach(item => item.classList.remove('dd__item--active'))
      item.classList.add('dd__item--active')
      input.value = item.innerHTML
      value.innerHTML = item.innerHTML

      const arrow = dd.querySelector('.dd__arrow')
      const menu = dd.querySelector('.dd__menu')

      arrow.classList.remove('dd__arrow--open')
      menu.classList.remove('dd__menu--open')
    }

    if (!panel && !item) {
      const arrow = document.querySelector('.dd__arrow')
      const menu = document.querySelector('.dd__menu')

      if (arrow && menu) {
        arrow.classList.remove('dd__arrow--open')
        menu.classList.remove('dd__menu--open')
      }
    }
  }

  document.addEventListener('click', onCLick)
}
// ---