$(function () {
    let header = $("#header");
    let intro = $("#intro");
    let introH = intro.innerHeight();
    let scrollPos = $(window).scrollTop();
    let navToggle = $("#navToggle");
    let nav = $("#nav");
    var scrollPoint = 1;

    checkScroll(scrollPos, scrollPoint);

    $(window).on("scroll load resize", function () {
        scrollPos = $(this).scrollTop();
        checkScroll(scrollPos, scrollPoint);
    });
    function checkScroll(scrollPos, scrollPoint) {
        if (scrollPos > scrollPoint) {
            header.addClass("header__pages-fixed");
        } else {
            header.removeClass("header__pages-fixed");
        }
    }
    /* Smooth Scroll */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        let elementId = $(this).data("scroll");
        let elementOffset = $(elementId).offset().top;

        nav.removeClass("show");

        $("html, body").animate(
        {
            scrollTop: elementOffset - 70,
        },
            700
        );
    });
    // NavToggle
    $(document).ready(function() {
        $(navToggle).click(function(event) {
            $(navToggle).toggleClass('active');
            $(header).toggleClass('header__active');
            $(body).toggleClass('lock');
        });
        $('.header__menu-link').click(function(event) {
            $(navToggle).toggleClass('active');
            $(header).toggleClass('header__active');
            $(body).toggleClass('lock');
        });
        // $(nav).click(function(event) {
        //     nav.removeClass("active");
        //     navToggle.removeClass("active");
        //     body.classList.remove('lock');
        // });
    });
    /* Modal */
    const modalBTN = document.querySelectorAll('[data-modal]');
    const body = document.body;
    const modalClose = document.querySelectorAll('.modal__close');
    const modal = document.querySelectorAll('.modal');

    modalBTN.forEach(item => {
        item.addEventListener('click', event => {
            let $this = event.currentTarget;
            let modalID = $this.getAttribute('data-modal');
            let modal = document.getElementById(modalID);
            let modalContent = modal.querySelector('.modal__content');

            modalContent.addEventListener('click', event => {
                event.stopPropagation();
            });

            modal.classList.add('show');
            $(body).toggleClass('lock');

            setTimeout(() => {
                modalContent.style.transform = 'none';
                modalContent.style.opacity = '1';
            });
        }, 1);
    });
    modalClose.forEach(item => {
        item.addEventListener('click', event => {
            let currentModal = event.currentTarget.closest('.modal');

            closeModal(currentModal);
        });
    });
    modal.forEach(item => {
        item.addEventListener('click', event => {
            let currentModal = event.currentTarget;

            closeModal(currentModal);
        });
    });
    function closeModal(currentModal) {
        let modalContent = currentModal.querySelector('.modal__content');
        modalContent.removeAttribute('style');

        setTimeout(() => {
            currentModal.classList.remove('show');
            body.classList.remove('lock');
        }, 200);
    }
    /* Textarea Auto-Resize */
    let textareas = document.querySelectorAll('.txta'),
    hiddenDiv = document.createElement('div'),
    content = null;

    for (let j of textareas) {
    j.classList.add('txtstuff');
    }

    hiddenDiv.classList.add('txta');
    hiddenDiv.style.display = 'none';
    hiddenDiv.style.whiteSpace = 'pre-wrap';
    hiddenDiv.style.wordWrap = 'break-word';
    for(let i of textareas) {
        (function(i) {
            i.addEventListener('input', function() {
                i.parentNode.appendChild(hiddenDiv);
                i.style.overflow = 'auto';
                content = i.value;
                content = content.replace(/\n/g, '<br>');
                hiddenDiv.innerHTML = content + '<br style="line-height: 3px;">';
                hiddenDiv.style.visibility = 'hidden';
                hiddenDiv.style.display = 'block';
                i.style.height = hiddenDiv.offsetHeight + 'px';
                hiddenDiv.style.visibility = 'visible';
                hiddenDiv.style.display = 'none';
            });
        }) (i);
    }
});