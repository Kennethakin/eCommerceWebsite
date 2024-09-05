const contactButtons = document.querySelectorAll(".js-contactButton"),
  contactContents = document.querySelectorAll(".js-contactContent"),
  contactWrapper = document.querySelector(".js-contactWrapper");
window.addEventListener("DOMContentLoaded", () => {
  contactButtons.forEach((t) => {
    t.addEventListener("click", (t) => {
      const o = t.target.dataset.name;
      contactButtons.forEach((o) => {
        o.classList.remove("is-show"), t.target.classList.add("is-show");
      }),
        contactContents.forEach((t) => {
          t.classList.remove("is-show"),
            t.dataset.name == o && t.classList.add("is-show");
        });
    });
  });
});
