$("#hero-art").innerHTML = ["mint-vase", "sulfur-bowl", "blush-plates"]
  .map((id, i) => `<div class="piece piece-${i + 1}">${artSvg(productById(id))}</div>`).join("");

$("#category-grid").innerHTML = CATEGORIES.map(c => {
  const p = productById(c.rep);
  return `<a class="cat-tile" href="shop.html?category=${encodeURIComponent(c.name)}" style="background:${p.bg}">
    <span>${esc(c.name)}</span>${artSvg(p)}</a>`;
}).join("");

$("#featured-grid").innerHTML = PRODUCTS.filter(p => p.featured).map(productCard).join("");
