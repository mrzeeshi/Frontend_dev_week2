const root = $("#product-root");
const p = productById(new URLSearchParams(location.search).get("id"));

if (!p) {
  document.title = "Product not found | Glaze Lab";
  root.innerHTML = `<div class="empty"><h1>We couldn't find that product</h1>
    <p>The link may be old or mistyped.</p><a class="btn" href="shop.html">Back to the shop</a></div>`;
} else {
  document.title = `${p.name} | Glaze Lab`;
  root.innerHTML = `
  <nav class="crumbs" aria-label="Breadcrumb"><a href="shop.html">Shop</a> / <span>${esc(p.name)}</span></nav>
  <div class="pd">
    <div class="pd-art" style="background:${p.bg}" role="img" aria-label="${esc(p.name)}">${artSvg(p)}</div>
    <div class="pd-info">
      <p class="card-cat">${esc(p.category)}</p>
      <h1>${esc(p.name)}</h1>
      <p class="pd-price">${money(p.price)}</p>
      <p class="lead">${esc(p.desc)}</p>
      <div class="buy">
        <div class="qty" role="group" aria-label="Quantity">
          <button type="button" id="dec" aria-label="Decrease quantity">&minus;</button>
          <input id="qty" type="number" min="1" max="${MAX_QTY}" value="1" inputmode="numeric" aria-label="Quantity">
          <button type="button" id="inc" aria-label="Increase quantity">+</button>
        </div>
        <button class="btn" type="button" id="add">Add to cart</button>
      </div>
      <dl class="specs">${Object.entries(p.details).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    </div>
  </div>
  <section class="related"><h2>More to browse</h2><div class="grid" id="related"></div></section>`;

  const qty = $("#qty");
  const clamp = () => { let n = parseInt(qty.value, 10); if (isNaN(n) || n < 1) n = 1; qty.value = Math.min(MAX_QTY, n); return +qty.value; };
  $("#dec").addEventListener("click", () => { qty.value = Math.max(1, clamp() - 1); });
  $("#inc").addEventListener("click", () => { qty.value = Math.min(MAX_QTY, clamp() + 1); });
  qty.addEventListener("change", clamp);
  $("#add").addEventListener("click", () => {
    const n = clamp(); Cart.add(p.id, n);
    toast(`${n} × ${p.name} added to cart`);
  });

  const others = PRODUCTS.filter(x => x.id !== p.id);
  const related = [...others.filter(x => x.category === p.category), ...others.filter(x => x.category !== p.category)].slice(0, 3);
  $("#related").innerHTML = related.map(productCard).join("");
}
