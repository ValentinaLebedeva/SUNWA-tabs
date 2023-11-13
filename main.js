const links = document.querySelectorAll("a");
links.forEach(function (item) {
    item.setAttribute(
        "target",
        "_blank");
});


/* search within website input */

/* the look of search btn */

const searchForm = document.querySelector(".search");
const searchBtn = document.querySelector(".search__button");

searchBtn.addEventListener("click", openSearchInput);

function openSearchInput(e) {
    e.preventDefault();
    if (!searchForm.classList.contains("search--visible")) {
        searchForm.classList.add("search--visible");
    } else {
        searchForm.classList.remove("search--visible");

    }
};


/* mobile menu */

const mobileNavBtn = document.querySelector('.mobile-nav-icon');
const mobileNav = document.querySelector('.mobile-nav');

mobileNavBtn.addEventListener("click", openMenu);

function openMenu() {
    mobileNav.classList.toggle("mobile-nav--active");
    mobileNavBtn.classList.toggle("mobile-nav-icon-close");
}

/* pop up menu */

const categoryBtn = document.querySelector(".category");
const popUpMenu = document.querySelector(".category-popup-menu");

categoryBtn.addEventListener("click", openCategoryMenu);

function openCategoryMenu(e) {
    e.preventDefault();
    popUpMenu.classList.toggle("category-popup-menu--active");
}

/* language */

const langBtn = document.querySelector(".language");
const dropDownMenu = document.querySelector(".drop-down-menu-list");
const langItems = document.querySelectorAll(".lang-item");
const currentLang = document.querySelector(".current-lang");


langBtn.addEventListener("click", chooseLangBtn);

function chooseLangBtn() {
    dropDownMenu.classList.toggle("drop-down-menu-list--active");
    for (i = 0; i < langItems.length; i++) {
        langItems[i].addEventListener("click", function () {
            currentLang.innerHTML = this.innerHTML;
        });
    };
};

/* email validation */

const inputSubscribe = document.querySelector(".input-subscribe");
const subscribeBtn = document.querySelector(".subscribe_btn");

function validateEmail(email) {
    const emailLowCase = email.toLowerCase();
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    return pattern.test(emailLowCase);
}


/* creating default message if subscribe email is invalid */

subscribeBtn.addEventListener("click", subscribeEmail);

function subscribeEmail(e) {
    e.preventDefault();

    if (!validateEmail(inputSubscribe.value)) {
        inputSubscribe.value = "Please write your email";
        inputSubscribe.classList.add("input-subscribe--active")
    } else {
        inputSubscribe.value = "";

    }

}

/* upload number in cart and qoute from localStorage */

const cartNumber = document.querySelector(".cart-number");
let cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber"))) || 0;
cartNumber.innerText = cartNumberAmount || "";

const quoteNumber = document.querySelector(".quote-number");
let quoteNumberAmount = parseInt(JSON.parse(localStorage.getItem("requestItemNumber"))) || 0;
quoteNumber.innerText = quoteNumberAmount || "";



const productRow = document.querySelector("[data-target=productRow]");
const productSlider = document.querySelector("[data-slider=slider");
const productItemsLinks = document.querySelectorAll(".product-item-link");
const productItems = document.querySelectorAll("[data-product=item]");
const productItem = document.querySelector("[data-product=item]");

/* moving item sliders by clicking */

function moveSlider() {
    const btnLeft = document.querySelector("[data-arrow=btnLeft]");
    const btnRight = document.querySelector("[data-arrow=btnRight]");

    const productSliderWidth = productSlider.offsetWidth;
    const itemStyle = productItem.currentStyle || window.getComputedStyle(productItem);
    const itemMarginRight = Number(itemStyle.marginRight.match(/\d+/g)[0]);
    const itemWidth = Number(itemStyle.width.match(/\d+/g)[0]);

    const itemCount = productSlider.querySelectorAll("[data-product=item]").length;
    const itemWidthT = productSlider.querySelector("[data-product=item]").offsetWidth;

    let offset = 0;

    const check = Math.round(productSliderWidth / (itemWidthT + itemMarginRight)); // how many items in a row
    const maxX = -((itemCount / check) * productSliderWidth + (itemMarginRight * (itemCount / check)) - productSliderWidth - itemMarginRight);

    btnLeft.addEventListener("click", function () {
        if (offset !== 0) {
            offset += itemWidthT + itemMarginRight;

            productSlider.style.transform = `translateX(${offset}px)`;
        }
    });

    btnRight.addEventListener("click", function () {
        if (offset >= maxX) {
            offset -= itemWidthT + itemMarginRight;

            productSlider.style.transform = `translateX(${offset}px)`;
        }
    })
}

if (productSlider) {
    moveSlider()
}

/* opening item link on click */

const productRowAll = document.querySelectorAll("[data-target=productRow]");

productRowAll.forEach(function (item) {

    for (i = 0; i < productItemsLinks.length; i++) {
        productItemsLinks[i].setAttribute(
            "href",
            `./item${i}.html`);
    };
});


/* opening news links index.html news.html */
const newsRow = document.querySelector(".section-news-row");
if (newsRow) {
    const newsItemLinks = document.querySelectorAll(".news-item-link");

    newsRow.addEventListener("click", openNews);

    function openNews() {
        for (i = 0; i < newsItemLinks.length; i++) {
            newsItemLinks[i].setAttribute("href", `events${i}.html`);
        }
    };
}


/* article style on hover index.html news.html  */

/*
const newsItems = document.querySelectorAll(".news-item")

for (i = 0; i < newsItems.length; i++) {
    let itemText = newsItems[i].querySelector(".news-item-text");
    newsItems[i].addEventListener("mouseover", function () {
        itemText.classList.add("news-item-text-active");
    })
}
*/

const newsItems = document.querySelectorAll(".news-item");

newsItems.forEach(function (item) {
    const itemText = item.querySelector(".news-item-text");
    const readBtn = item.querySelector(".read-more-btn");

    item.addEventListener("mouseover", function () {
        itemText.classList.add("news-item-text-active");
        if (readBtn) {
            readBtn.classList.add("read-more-btn--active");
        }
    })

    item.addEventListener("mouseout", function () {
        itemText.classList.remove("news-item-text-active");
        if (readBtn) {
            readBtn.classList.remove("read-more-btn--active");
        }
    })
})


/// ADD HOVER ON READ-BTN ON OTHER PAGES ????????

/* contact.html, documents.html, news.html, about.html tabs */



const tabButtons = document.querySelectorAll(".tab-link");
const tabColumn = document.querySelector(".tab-column");
const columnItems = document.querySelectorAll(".column-item");

tabColumn.addEventListener("click", choseTab);

function choseTab(e) {
    const sectionTitle = document.querySelector(".section-title");

    tabButtons.forEach(function (item) {
        item.classList.remove("tab-link-active");
    });

    if (e.target.dataset.tab) {
        e.target.classList.add("tab-link-active");
    }
    /* filter documents by tab */
    columnItems.forEach(function (item) {
        item.classList.remove("hidden")
        if (e.target.dataset.tab != item.dataset.tab) {
            item.classList.add("hidden")
        }
    })
    /* chaning title depends on a chosen tab */
    if (e.target.classList.contains("tab-link-active") && sectionTitle) {
        sectionTitle.innerText = e.target.dataset.tab.toUpperCase();
    }
}

