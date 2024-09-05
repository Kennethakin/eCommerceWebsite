const featuredItemButtons = document.querySelectorAll(".js-featuredItemButton");
featuredItemButtons.forEach((t) => {
  t.addEventListener("click", () => {
    const e = document.getElementById("products"),
      o = t.getAttribute("data-name"),
      n = e.querySelector(`.js-productCategory[data-name="${o}"]`);
    n &&
      (n.dispatchEvent(new Event("click")),
      e.scrollIntoView({ behavior: "smooth" }));
  });
});
