const params = new URLSearchParams(location.search);
const names = ["All", ...CATEGORIES.map(c => c.name)];
const state = { q: "", cat: names.includes(params.get("category")) ? params.get("category") : "All", sort: "featured" };

$("#chips").innerHTML = names.map(n => `<button type="button" class="chip" data-cat="${esc(n)}">${esc(n)}</button>`).join("");

function render() {
  $$(".chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.cat === state.cat));
  let list = PRODUCTS.filter(p =>
    (state.cat === "All" || p.category === state.cat) &&
    `${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(state.q));
  const sorts = {
    "price-asc": (a, b) => a.price - b.price,
    "price-desc": (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name)
  };
  if (sorts[state.sort]) list = [...list].sort(sorts[state.sort]);
  $("#count").textContent = `${list.length} ${list.length === 1 ? "product" : "products"}`;
  $("#shop-grid").innerHTML = list.map(productCard).join("");
  $("#shop-empty").hidden = list.length > 0;
}

$("#chips").addEventListener("click", e => {
  const b = e.target.closest(".chip"); if (!b) return;
  state.cat = b.dataset.cat; render();
});
$("#search").addEventListener("input", e => { state.q = e.target.value.trim().toLowerCase(); render(); });
$("#sort").addEventListener("change", e => { state.sort = e.target.value; render(); });
$("#reset").addEventListener("click", () => {
  state.q = ""; state.cat = "All"; state.sort = "featured";
  $("#search").value = ""; $("#sort").value = "featured"; render();
});
render();
