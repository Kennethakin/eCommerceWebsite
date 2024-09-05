fetch("data/products.json")
  .then((t) => t.json())
  .then((t) => {
    (productsDOM.products = JSON.parse(t).map((t) => new Product(t))),
      productsDOM.showProducts(),
      cart.showLocalStorage();
  }),
  fetch("data/categories.json")
    .then((t) => t.json())
    .then((t) => {
      (productsDOM.categories = JSON.parse(t).map((t) => new Category(t))),
        productsDOM.showCategoryButtons();
    });
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});
class Product {
  #t = ["id", "title", "desc", "img", "price", "category"];
  domEl;
  constructor(t) {
    this.#t.forEach((e) => {
      this[e] = t[e];
    });
  }
  formatedPrice() {
    return formatter.format(this.price);
  }
}
class Category {
  constructor(t) {
    this.name = t;
  }
}
class ProductsDOM {
  products = [];
  categories = [];
  constructor() {
    (this.productContainerEl = document.querySelector(".js-productContainer")),
      (this.categoryContainerEl = document.querySelector(
        ".js-productCategoryContainer"
      ));
  }
  showCategoryButtons() {
    let t = this.categories
      .map(
        (t) =>
          `<button type="button" class="product__category js-productCategory${
            "all" == t.name ? " is-active" : ""
          }" aria-label="${t.name}" data-name="${t.name}">${t.name}</button>`
      )
      .join("");
    (this.categoryContainerEl.innerHTML = t),
      this.setCategoryButtonsClickEvent();
  }
  setCategoryButtonsClickEvent() {
    const t = this.categoryContainerEl.querySelectorAll(".js-productCategory");
    t.forEach((e) => {
      e.addEventListener("click", (e) => {
        this.changeStyleOfActiveCategory(t, e), this.showActiveCategory(e);
      });
    });
  }
  showActiveCategory(t) {
    const e = this.productContainerEl.querySelectorAll(".js-productItem"),
      r = t.currentTarget.dataset.name;
    "all" !== r
      ? e.forEach((t) => {
          this.products.find((e) => e.id == t.dataset.id).category != r
            ? (t.style.display = "none")
            : (t.style.display = "grid");
        })
      : e.forEach((t) => (t.style.display = "grid"));
  }
  changeStyleOfActiveCategory(t, e) {
    t.forEach((t) => {
      t == e.currentTarget
        ? t.classList.add("is-active")
        : t.classList.remove("is-active");
    });
  }
  showProducts() {
    let t = this.products
      .map(
        (t) =>
          `<div class="product__item js-productItem" data-id="${
            t.id
          }">\n            <img class="product__item__image" src="${
            t.img
          }" alt="${
            t.title
          }">\n            <div class="product__item__detail">\n                <div class="product__item__detail__title">${
            t.title
          }</div>\n                <div class="product__item__detail__desc">${
            t.desc
          }</div>\n                <div class="product__item__detail__price js-productItemPrice">${t.formatedPrice()}</div>\n            </div>\n            <button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>\n        </div>`
      )
      .join("");
    this.productContainerEl.innerHTML = t;
    this.productContainerEl
      .querySelectorAll(".js-productItemButton")
      .forEach((t) => {
        const e = t.parentElement,
          r = this.products.find((t) => t.id == e.dataset.id);
        (r.domEl = new ProductDOM(r, e, t)), r.domEl.setClickEvent();
      });
  }
}
const productsDOM = new ProductsDOM();
class ProductDOM {
  constructor(t, e, r) {
    (this.product = t), (this.productEl = e), (this.buttonEl = r);
  }
  setClickEvent() {
    this.buttonEl.addEventListener("click", () => {
      this.transformAddToCartButtonIntoQuantityButton(),
        this.addToCart(),
        sweetAlert.showAlert("Your shopping cart updated!", "update");
    });
  }
  addToCart() {
    cart.addProduct(this.product);
  }
  removeFromCart() {
    cart.removeProduct(this.product);
  }
  updateCartQuantity(t) {
    cart.updateQuantity(this.product, t);
  }
  transformAddToCartButtonIntoQuantityButton() {
    this.buttonEl.outerHTML =
      '<div class="product__quantity js-quantity">\n        <button class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton" type="button" aria-label="Product Decrease">\n        <svg class="icon icon-minus">\n            <use xlink:href="#icon-minus"></use>\n        </svg>\n    </button>\n    <input class="product__quantity__item product__quantity__item--input js-quantityInput" type="number" max="7" value="1">\n    <button class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton" type="button" aria-label="Product Increase"><svg class="icon icon-plus">\n            <use xlink:href="#icon-plus"></use>\n        </svg></button>\n    </div>';
    const t = this.productEl.querySelector(".js-quantityIncreaseButton"),
      e = this.productEl.querySelector(".js-quantityDecreaseButton");
    this.increaseQuantityButton(t), this.decreaseQuantityButton(e);
  }
  increaseQuantityButton(t) {
    t.addEventListener("click", () => {
      let t = this.getQuantityInputValue(),
        e = this.getQuantityInputLimit();
      e && t >= e
        ? (this.setQuantityInputValue(e),
          sweetAlert.showAlert(`Only ${e} left!`, "warning"))
        : (this.setQuantityInputValue(t + 1),
          this.updateCartQuantity(1),
          sweetAlert.showAlert("Added to your cart!"));
    });
  }
  decreaseQuantityButton(t) {
    t.addEventListener("click", () => {
      let e = this.getQuantityInputValue();
      1 == e
        ? ((t.parentElement.outerHTML =
            '<button class="button button--primary js-productItemButton" type="button" aria-label="Add to Cart">Add to Cart</button>'),
          (this.buttonEl = this.productEl.querySelector(
            ".js-productItemButton"
          )),
          this.setClickEvent(),
          this.removeFromCart(),
          sweetAlert.showAlert("Removed from your cart!", "danger"))
        : (this.setQuantityInputValue(e - 1),
          this.updateCartQuantity(-1),
          sweetAlert.showAlert(
            "Number of products has been decreased!",
            "warning"
          ));
    });
  }
  getQuantityInputValue() {
    return parseInt(this.productEl.querySelector(".js-quantityInput").value);
  }
  getQuantityInputLimit() {
    return parseInt(
      this.productEl.querySelector(".js-quantityInput").getAttribute("max")
    );
  }
  setQuantityInputValue(t) {
    this.productEl.querySelector(".js-quantityInput").value = t;
  }
}
class CartDOM {
  constructor(t) {
    (this.cart = t),
      (this.cartEmptyEl = document.querySelector(".js-cartEmpty")),
      (this.cartTotalEl = document.querySelector(".js-cartTotal")),
      (this.cartQuantityEl = document.querySelector(".js-cartQuantity")),
      (this.cartProductContainerEl = document.querySelector(
        ".js-cartProductContainer"
      ));
  }
  renderCart() {
    (document.querySelector(
      ".js-headerCartTitle"
    ).textContent = `Cart(${this.cart.totalCount()})`),
      this.checkIsEmpty() ||
        (this.showCartProducts(),
        this.dispatchQuantityButton(),
        (this.cartTotalEl.innerHTML = `<div class="cart__total__title">Total Price: </div>\n        <div class="cart__total__price">${formatter.format(
          this.cart.totalPrice()
        )}</div>`),
        (this.cartQuantityEl.innerHTML = `<div class="cart__total__title">Product Quantity: </div>\n        <div class="cart__total__quantity">${this.cart.totalQuantity()} products</div>`));
  }
  checkIsEmpty() {
    return this.cart.isEmpty()
      ? ((this.cartEmptyEl.style.display = "block"),
        (this.cartTotalEl.innerHTML = ""),
        (this.cartQuantityEl.innerHTML = ""),
        (this.cartProductContainerEl.innerHTML = ""),
        !0)
      : ((this.cartEmptyEl.style.display = "none"), !1);
  }
  showCartProducts() {
    this.cartProductContainerEl.innerHTML = this.cart.products
      .map(
        (t) =>
          `<div class="cart__product js-cartProduct" data-id="${
            t.id
          }">\n            <div class="cart__product-top-wrapper">\n                    <figure>\n                        <img src="${
            t.img
          }" alt="Product Image" class="cart__product__image">\n                    </figure>\n                    <div class="cart__product__content">\n                    <div class="cart__product__content__title">${
            t.title
          }</div>\n                    <div class="cart__product__content__desc">${
            t.desc
          }</div>\n                    <div class="product__quantity">\n                        <button type="button" aria-label="Product Decrease" class=" product__quantity__item product__quantity__item--decrease js-quantityButton js-quantityDecreaseButton">\n                            <svg class="icon icon-minus">\n                                <use xlink:href="#icon-minus"></use>\n                            </svg>\n                        </button>\n                        <input type="number" class="product__quantity__item product__quantity__item--input js-quantityInput" max="7" value="${
            t.quantity
          }">\n                        <button type="button" aria-label="Product Increase" class="product__quantity__item product__quantity__item--increase js-quantityButton js-quantityIncreaseButton"><svg class="icon icon-plus">\n                                <use xlink:href="#icon-plus"></use>\n                            </svg></button>\n                    </div>\n                </div>\n            </div>\n            <div class="cart__product__price js-cartProductPrice">${formatter.format(
            t.price
          )}</div>\n        </div>`
      )
      .join("");
  }
  dispatchQuantityButton() {
    this.cartProductContainerEl
      .querySelectorAll(".js-cartProduct")
      .forEach((t) => {
        const e = t.querySelector(".js-quantityIncreaseButton"),
          r = t.querySelector(".js-quantityDecreaseButton"),
          a = document.querySelector(
            `.js-productItem[data-id="${t.dataset.id}"]`
          );
        r.addEventListener("click", () => {
          a.querySelector(".js-quantityDecreaseButton").dispatchEvent(
            new Event("click")
          );
        }),
          e.addEventListener("click", () => {
            a.querySelector(".js-quantityIncreaseButton").dispatchEvent(
              new Event("click")
            );
          });
      });
  }
}
class Cart {
  products = [];
  LOCAL_STORAGE_KEY = "cart";
  constructor() {
    this.dom = new CartDOM(this);
  }
  addProduct(t) {
    (t.quantity = 1),
      this.products.push(t),
      this.dom.renderCart(),
      this.saveLocalStorage();
  }
  removeProduct(t) {
    this.products.splice(this.findProductIndex(t), 1),
      this.dom.renderCart(),
      this.saveLocalStorage();
  }
  findProductIndex(t) {
    return this.products.findIndex((e) => e.id == t.id);
  }
  updateQuantity(t, e) {
    ((t = this.products.find((e) => e.id == t.id)).quantity += e),
      this.dom.renderCart(),
      this.saveLocalStorage();
  }
  isEmpty() {
    return !this.products.length;
  }
  totalCount() {
    return this.products.length;
  }
  totalQuantity() {
    return this.products.reduce((t, e) => t + e.quantity, 0);
  }
  totalPrice() {
    return this.products.reduce((t, e) => t + e.price * e.quantity, 0);
  }
  saveLocalStorage() {
    localStorage.setItem(
      this.LOCAL_STORAGE_KEY,
      JSON.stringify(
        this.products.map((t) => ({ id: t.id, quantity: t.quantity }))
      )
    );
  }
  showLocalStorage() {
    JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_KEY)).forEach((t) => {
      const e = productsDOM.products.find((e) => e.id == t.id);
      e.domEl.transformAddToCartButtonIntoQuantityButton(),
        e.domEl.addToCart(),
        t.quantity < 2 ||
          (e.domEl.setQuantityInputValue(t.quantity),
          this.updateQuantity(e, t.quantity - 1));
    });
  }
}
const cart = new Cart();
class SweetAlert {
  #e;
  #r;
  set status(t) {
    ["success", "warning", "danger", "update"].includes(t)
      ? (this.#e = t)
      : (this.#e = "success");
  }
  get status() {
    return this.#e;
  }
  set icon(t) {
    if (!t)
      switch (this.status) {
        case "warning":
          t = "warning";
          break;
        case "danger":
          t = "remove";
          break;
        case "update":
          t = "update";
          break;
        default:
          t = "tick";
      }
    this.#r = t;
  }
  get icon() {
    return this.#r;
  }
  showAlert(t, e = "success", r = null) {
    (this.message = t), (this.status = e), (this.icon = r);
    let a = document.querySelector(".js-alertContainer");
    a ||
      ((a = document.createElement("div")),
      (a.className = "alert-container js-alertContainer"),
      document.body.appendChild(a));
    const s = document.createElement("div");
    (s.className = `alert alert--${this.status} js-alert`),
      (s.innerHTML = `<svg class="icon icon-${this.icon} alert__icon"><use xlink:href="#icon-${this.icon}"></use></svg>\n        <div class="alert__message">${this.message}</div>`),
      a.appendChild(s),
      setTimeout(() => {
        a.removeChild(s),
          !document.querySelector(".js-alert") &&
            document.body.contains(a) &&
            document.body.removeChild(a);
      }, 2e3);
  }
}
const sweetAlert = new SweetAlert();
