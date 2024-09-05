const headerButtonMenu = document.querySelector(".js-headerButtonMenu"),
  header = document.querySelector(".js-header");
headerButtonMenu.addEventListener("click", () =>
  header.classList.toggle("is-show")
);
const headerButtonCart = document.querySelector(".js-headerButtonCart"),
  cartCloseButton = document.querySelector(".js-cartCloseButton"),
  headerCart = document.querySelector(".js-cart");
headerButtonCart.addEventListener("click", () =>
  headerCart.classList.add("is-show")
),
  cartCloseButton.addEventListener("click", () =>
    headerCart.classList.remove("is-show")
  );
let navItemsList = [
  {
    title: "products",
    link: "products",
    dropdownItems: [
      { title: "camera", link: "camera" },
      { title: "wrist-watch", link: "wrist-watch" },
      { title: "headset", link: "headset" },
    ],
  },
  { title: "faq's", link: "faqs" },
  {
    title: "contact",
    link: "contact",
    dropdownItems: [
      { title: "reach us", link: "reach-us" },
      { title: "about us", link: "about-us" },
      { title: "find us", link: "find-us" },
    ],
  },
];
class NavItem {
  constructor(e, t, s) {
    (this.title = e), (this.link = t), (this.dropdownItems = s);
  }
  toHTML() {
    let e = `<div class="header__nav-wrapper js-headerNavWrapper"><div class="header__nav__item-wrapper">\n            <a href="/#${this.link}" class="header__nav__item link js-headerNavItem" title="${this.title}">${this.title}</a>`;
    return (
      this.dropdownItems &&
        (e +=
          '<button class="header__nav__button js-headerNavButton" type="button">\n                <svg class="icon icon-down">\n                    <use xlink:href="#icon-down"></use>\n                </svg>\n            </button>'),
      (e += "</div>"),
      this.dropdownItems &&
        ((e += '<div class="header__nav__dropdown">'),
        this.dropdownItems.forEach((t) => {
          e += `<a class="header__nav__dropdown__item link js-headerNavDropdownItem" href="/#${t.link}" title="${t.title}">${t.title}</a>`;
        }),
        (e += "</div>")),
      (e += "</div>"),
      e
    );
  }
}
(navItemsList = navItemsList.map(
  (e) => new NavItem(e.title, e.link, e.dropdownItems)
)),
  window.addEventListener("DOMContentLoaded", () =>
    navDOM.showNavItems(navItemsList)
  );
class NavDOM {
  showNavItems(e) {
    let t = e.map((e) => e.toHTML()).join("");
    (document.querySelector(".js-headerNav").innerHTML = t),
      this.navButtonClickEvents(),
      this.scrollDropdownItems();
  }
  navButtonClickEvents() {
    const e = document.querySelectorAll(".js-headerNavButton");
    e.forEach((t) => {
      t.addEventListener("click", () => {
        t.parentElement.parentElement.classList.toggle("is-show"),
          e.forEach((e) => {
            e !== t &&
              e.parentElement.parentElement.classList.remove("is-show");
          });
      });
    });
  }
  scrollDropdownItems() {
    document.querySelectorAll(".js-headerNavDropdownItem").forEach((e) => {
      e.addEventListener("click", (t) => {
        t.preventDefault();
        const s = document.getElementById(
          e
            .closest(".js-headerNavWrapper")
            .querySelector(".js-headerNavItem")
            .getAttribute("href")
            .slice(2)
        );
        if (!s) return !0;
        const n = e.getAttribute("href").slice(2),
          a = s.querySelector(`[data-name="${n}"]`);
        a && a.dispatchEvent(new Event("click")),
          s.scrollIntoView({ behavior: "smooth" });
      });
    }),
      document.querySelectorAll('a[href="/#products"]').forEach((e) => {
        e.addEventListener("click", (e) => {
          document
            .querySelector('.js-productCategory[data-name="all"]')
            .dispatchEvent(new Event("click"));
        });
      });
  }
}
const navDOM = new NavDOM();
