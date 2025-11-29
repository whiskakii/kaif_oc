const items = {
    coffee: {
        category: 'Coffee And More...',
        items: [
            { title: 'ESPRESSO', price: '2', desc: 'Διπλός +0,50€' },
            { title: 'ESPRESSO LUNGO', price: '2', desc: 'Διπλός +0,50€' },
            { title: 'CAPPUCCINO', price: '2', desc: 'Διπλός +0,50€' },
            { title: 'AMERICANO', price: '2', desc: 'Διπλός +0,50€' },
            { title: 'FREDDO CAPPUCINO', price: '2,5', desc: 'Κρύος cappuccino' },
            { title: 'FREDDO ESPRESSO', price: '2,5', desc: 'Κρύος espresso' },
            { title: 'FRAPPE', price: '2', desc: 'Κρύος καφές' },
            { title: 'NES', price: '2', desc: 'Nescafe' },
            { title: 'ΦΙΛΤΡΟΥ', price: '2,5', desc: 'Καφές φίλτρου' },
            { title: 'ΕΛΛΗΝΙΚΟΣ', price: '1,5', desc: 'Διπλός +0,50€' },
            { title: 'ΣΟΚΟΛΆΤΑ', price: '2,5', desc: 'Σπέσιαλ +0,50€' },
        ]
    },

    iced_tea: {
        category: 'ICED TEA',
        items: [
            { title: 'ΠΡΑΣΙΝΟ ΤΣΑΙ', price: '2,5', desc: 'Διπλός +0,50€' },
            { title: 'ΛΕΜΟΝΙ', price: '2,5', desc: 'Διπλός +0,50€' },
            { title: 'ΡΟΔΑΚΙΝΟ', price: '2,5', desc: 'Διπλός +0,50€' },
        ]
    },

    beers: {
        category: 'Μπυρες',
        items: [
            { title: 'DRAFT KAISER', price: '4', desc: 'Μεγάλη 5,5€' },
            { title: 'ΑΛΦΑ', price: '3,5', desc: 'Φιάλη 500ml' },
            { title: 'ΦΙΞ', price: '3,5', desc: 'Φιάλη 500ml' },
            { title: 'AMSTEL', price: '3,5', desc: 'Φιάλη 500ml' },
            { title: 'MYTHOS RADLER', price: '3,5', desc: 'Φιάλη 330ml' },
            { title: 'ΦΙΞ ΑΝΕΥ', price: '3', desc: 'Φιάλη 330ml' },
            { title: 'CORONA', price: '5', desc: 'Φιάλη 330ml' },
        ]
    },

    soft: {
        category: 'Αναψυκτικα',
        items: [
            { title: 'Coca-Cola', price: '2,5', desc: 'Regular, Zero 250ml' },
            { title: 'Fanta', price: '2,5', desc: 'Πορτοκάλι, Λεμόνι 250ml' },
            { title: 'Sprite', price: '2,5', desc: '250ml' },
            { title: 'Tuborg', price: '2,5', desc: 'Club Soda, Pink Grapefruit, Στυμμένο Λεμόνι' },
            { title: 'Red Bull', price: '5', desc: '' },
        ]
    },

    juice: {
        category: 'Χυμοι',
        items: [
            { title: 'VIVA', price: '2,5', desc: 'Πορτοκάλι, Ροδάκινο, Μπανάνα, Βύσσινο, Κοκτέιλ' },
            { title: 'Φρέσκος Πορτοκαλιού', price: '3,5', desc: '' },
        ]
    },

    water: {
        category: 'Νερο',
        items: [
            { title: 'Σέλι Φυσικό Μεταλλικό Νερό', price: '0,50', desc: '1 Λίτρο +1.00€' },
        ]
    },

    drinks: {
        category: 'Ποτά',
        items: [
            { title: 'Απλό', price: '6', desc: '' },
            { title: 'Special', price: '8', desc: '' },
            { title: 'Premium', price: '10', desc: '' },
        ]
    },

    burgers: {
        category: 'Μπιφτεκοψωμα',
        items: [
            { title: 'Απλό & Λιτό', price: '4,5', desc: 'Μπιφτέκι με κέτσαπ και μουστάρδα.' },
            { title: 'Cheeseburger', price: '5', desc: 'Μπιφτέκι με τσένταρ, σος πίκλας και σος μουστάρδας.' },
            { title: 'ΜΠΙ-ΜΠΙ-ΚΙΟΥ', price: '5,5', desc: 'Μπιφτέκι με τσένταρ, BBQ σος, μπέικον, μαρούλι και ντομάτα..' },
        ]
    },

    clubs: {
        category: 'Τριγωνοψωμα',
        items: [
            { title: 'Αλλαντικών', price: '5', desc: 'Ψωμί του τοστ με γκούντα, ζαμπόν, μπέικον, μαγιονέζα, μαρούλι και ντομάτα.' },
            { title: 'Αλά Γκρέκο', price: '6,5', desc: 'Πίτα Σιδέρη με σος μουστάρδας, γύρο χοιρινό, γκούντα, μπέικον, μαρούλι και ντομάτα.' },
        ]
    },

    plates: {
        category: 'Πιατέλες',
        items: [
            { title: 'Αλλαντικών', price: '5', desc: 'Ψωμί του τοστ με γκούντα, ζαμπόν, μπέικον, μαγιονέζα, μαρούλι και ντομάτα.' },
            { title: 'Αλά Γκρέκο', price: '6,5', desc: 'Πίτα Σιδέρη με σος μουστάρδας, γύρο χοιρινό, γκούντα, μπέικον, μαρούλι και ντομάτα.' },
        ]
    },
};


const menu_constructor = () => {
    const $categories_container = $('#categories');
    const $menu_container = $('#catalog');

    // construct categories
    $.each(items, function (cat, obj) {
        const $button = $('<button></button>').text(obj.category).attr('data-target', cat);

        $button.on('click', function () {
            $('#' + cat)[0].scrollIntoView({ behavior: 'smooth' });
        });

        $categories_container.append($button);
    });

    // construct menu items
    $.each(items, function (cat, obj) {
        const $section = $('<section></section>').attr('id', cat).addClass('category-section');
        const $h2 = $('<h2></h2>').text(obj.category);
        $section.append($h2);


        $.each(obj.items, function (i, item) {
            const $item_div = $('<div></div>').addClass('item');
            const $item_header = $('<div></div>').addClass('item-header');
            const $title_span = $('<span></span>').addClass('item-title').text(item.title);
            const $price_span = $('<span></span>').addClass('item-price').text(item.price + "€");
            $item_header.append($title_span, $price_span);


            const $item_desc = $('<div></div>').addClass('item-desc').text(item.desc);


            $item_div.append($item_header, $item_desc);
            $section.append($item_div);
        });


        $menu_container.append($section);
    });
};


$(document).on('click', '.r_menu', function () {
    window.location.href = 'menu.html'
});

$(document).ready(function () {

    // preload menu images
    const images = [
        "https://raw.githubusercontent.com/whiskakii/kaif_oc/refs/heads/main/images/back.jpg",
        "https://raw.githubusercontent.com/whiskakii/kaif_oc/refs/heads/main/images/hbgr.png",
        "https://raw.githubusercontent.com/whiskakii/kaif_oc/55210e34a66a1be953f4b2be1a96d0b53ffd19ef/images/kaif_vec.svg"
    ];

    let loaded = 0;

    /* $.each(images, function (i, src) {
        $('<img/>')
            .attr('src', src)
            .on('load', function () {
                loaded++;

                if (loaded === images.length) {
                    $('#loading').html('<button class="r_menu">ΤΙΜΟΚΑΤΑΛΟΓΟΣ</button>');
                    console.log('loaded:', loaded);
                }
            });
    }); */

    // menu constructor
    menu_constructor();

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
            $('#rate-banner').fadeIn(300);
        } else {
            $('#rate-banner').fadeOut(300);
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
    $("#rate-banner").on("click", function() {
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