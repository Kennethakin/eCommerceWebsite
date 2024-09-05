const slideItems = [
  { img: "Images/Image-1.jpg", content: "Sale of the year!" },
  { img: "Images/product 2.jpg", content: "Discover new product for summer!" },
  { img: "Images/Image-25.jpg", content: "More than expected!" },
];

class Slide {
  constructor(e, t) {
    (this.img = e), (this.content = t);
  }
}

const slides = slideItems.map((e) => new Slide(e.img, e.content));

class Slider {
  constructor(e) {
    (this.slides = e),
      (this.slideItemContainer = document.querySelector(".js-sliderItemContainer"));
  }

  init() {
    let e = this.slides
      .map((e, t) => {
        let s = "next";
        return (
          0 === t && (s = "active"),
          t == this.slides.length - 1 && (s = "last"),
          this.slides.length <= 1 && (s = "active"),
          `<a href="#" class="slider__item js-sliderItem ${s}">
            <img class="slider__item__image" src="${e.img}" alt="Shopping">
            <div class="slider__item__content">
                ${e.content}
            </div>
          </a>`
        );
      })
      .join("");
    this.slideItemContainer.innerHTML = e;
    const t = document.querySelector(".js-btnPrev");
    document.querySelector(".js-btnNext").addEventListener("click", () => {
      this.changeSlider();
    });
    t.addEventListener("click", () => {
      this.changeSlider("prev");
    });
  }

  changeSlider(e) {
    const t = document.querySelector(".active"),
      s = document.querySelector(".last");
    let i = t.nextElementSibling;
    if (
      (i || (i = this.slideItemContainer.firstElementChild),
      t.classList.remove("active"),
      s.classList.remove("last"),
      i.classList.remove("next"),
      "prev" === e)
    ) {
      return (
        t.classList.add("next"),
        s.classList.add("active"),
        (i = s.previousElementSibling),
        i || (i = this.slideItemContainer.lastElementChild),
        i.classList.remove("next"),
        void i.classList.add("last")
      );
    }
    t.classList.add("last"), s.classList.add("next"), i.classList.add("active");
  }
}

const slider = new Slider(slides);
slider.init();
