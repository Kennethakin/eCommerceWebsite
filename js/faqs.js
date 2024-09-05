const faqsWrapper = document.querySelectorAll(".js-faqsWrapper");
window.addEventListener("DOMContentLoaded", () => {
  faqsWrapper.forEach((e) => {
    e.querySelector(".js-faqsQuestion").addEventListener("click", () => {
      e.classList.toggle("is-show"),
        faqsWrapper.forEach((s) => {
          s !== e && s.classList.remove("is-show");
        });
    });
  });
});
