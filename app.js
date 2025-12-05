const menu_constructor = (MENU) => {
    const $categories_container = $('#categories');
    const $menu_container = $('#catalog');

    // construct categories
    $.each(MENU, function (cat, obj) {
        const $button = $('<button></button>').text(obj.category).attr('data-target', cat);

        $button.on('click', function () {
            $('#' + cat)[0].scrollIntoView({ behavior: 'smooth' });
        });

        $categories_container.append($button);
    });

    // construct menu items
    $.each(MENU, function (cat, obj) {
        const $section = $('<section></section>').attr('id', cat).addClass('category-section');
        const $h2 = $('<h2></h2>').text(obj.category);
        $section.append($h2);



        $.each(obj.items, function (i, item) {
            const $item_div = $('<div></div>').addClass('item');
            const $item_header = $('<div></div>').addClass('item-header');
            const $title_span = $('<span></span>').addClass('item-title').text(item.title);
            const $price_span = $('<span></span>').addClass('item-price').text(item.price + "€");
            
            $item_header.append($title_span, $price_span);


            const $item_desc = $('<div></div>').addClass('item-desc').html(item.desc);


            $item_div.append($item_header, $item_desc);
            $section.append($item_div);
        });


        $menu_container.append($section);
    });
};


$(document).on('click', '.r_menu', function () {
    window.location.href = 'menu.html'
});

$(document).on('click', '.not_found_home', function () {
    window.location.href = '/'
});

$(document).ready(async function () {

    // preload menu images
    const images = [
        "https://raw.githubusercontent.com/whiskakii/kaif_oc/refs/heads/main/images/back.jpg",
        "https://raw.githubusercontent.com/whiskakii/kaif_oc/refs/heads/main/images/hbgr.png",
        "https://raw.githubusercontent.com/whiskakii/kaif_oc/55210e34a66a1be953f4b2be1a96d0b53ffd19ef/images/kaif_vec.svg"
    ];

    let loaded = 0;

    $.each(images, function (i, src) {
        $('<img/>')
            .attr('src', src)
            .on('load', function () {
                loaded++;

                if (loaded === images.length) {
                    $('#loading').html('<button class="r_menu button_1">ΤΙΜΟΚΑΤΑΛΟΓΟΣ</button>');
                }
            });
    });

    // load menu
    
    try {
        const res = await fetch('./items.json');
        const data = await res.json();

        menu_constructor(data.menu);
    } catch (err) {
        console.error('JSON load error:', err);
    }

    // menu constructor
    

    // scroll shit
    const scroll_btn = $('<button id="scroll_to_top_btn">↑</button>');
    $('body').append(scroll_btn);

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $('#scroll_to_top_btn').fadeIn();
        } else {
            $('#scroll_to_top_btn').fadeOut();
        }

        // google rate promo
        let scroll_top = $(this).scrollTop();
        let doc_height = $(document).height();
        let win_height = $(window).height();
        let dist_from_bottom = doc_height - (scroll_top + win_height);

        if (scroll_top > 150 && dist_from_bottom > 200) {
            $('#rate_banner').fadeIn(300);
        } else {
            $('#rate_banner').fadeOut(300);
        }

        let pos = $(window).scrollTop();

        $('.category-section').each(function () {
            let top = $(this).offset().top - 120;
            let bottom = top + $(this).outerHeight();
            let id = $(this).attr('id');


            if (pos >= top && pos <= bottom) {
                // Old shit
                // $(".categories button").removeClass("active");
                // $(`.categories button[data-target='${id}']`).addClass("active");

                $(".categories button").removeClass("active");
                let $button = $(`.categories button[data-target='${id}']`);
                $button.addClass("active");

                let $container = $('.categories');

                let button_absolute = $button.offset().left + $container.scrollLeft();
                let container_absolute = $container.offset().left;
                let inside = button_absolute - container_absolute;
                let target_scroll = inside - ($container.width() / 2) + ($button.outerWidth() / 2);

                // mounaki apalo san to cajoline
                $container[0].scrollTo({
                    left: target_scroll,
                    behavior: 'smooth'
                });
            }
        });
    });

    // google rate promo button
    $("#rate_banner").on("click", function() {
        window.open("https://search.google.com/local/writereview?placeid=ChIJNx0QS2J7VxMRBgbs8Gz5zQI", "_blank");
    });

    $('#scroll_to_top_btn').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 400);
    });

    const scroll_style = $(`
        <style>
            #scroll_to_top_btn {
                display: none;
                position: fixed;
                right: 18px;
                bottom: 100px;
                width: 44px;
                height: 44px;
                border-radius: 5px;
                border: none;
                background: #EFE7D2;
                color: #111;
                font-size: 20px;
                cursor: pointer;
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                z-index: 2000;
            }
        </style>
    `);

    $('head').append(scroll_style);
});