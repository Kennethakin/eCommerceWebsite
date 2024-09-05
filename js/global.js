const showcase = document.querySelector(".js-showcase"),
  showcaseTop = showcase.getBoundingClientRect().top,
  scrollTop = document.querySelector(".js-scrollTop");
window.addEventListener("scroll", () => {
  window.pageYOffset > showcaseTop
    ? scrollTop.classList.add("is-show")
    : scrollTop.classList.remove("is-show");
});
const footerDate = document.querySelector(".js-footerDate");
footerDate.innerHTML = new Date().getFullYear();
