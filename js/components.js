/* Shared UI: header, footer, product card, toast, form validation. */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => "$" + n.toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const NAV = [["index", "Home"], ["shop", "Shop"], ["about", "About"], ["contact", "Contact"]];
const SECTION_OF = { product: "shop", checkout: "cart" };

function currentPage() {
  const seg = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") || "index";
  return SECTION_OF[seg] || seg;
}

function renderHeader() {
  const page = currentPage();
  const links = NAV.map(([k, label]) => `<a href="${k}.html"${page === k ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  $("#site-header").innerHTML = `
  <header class="site-header"><div class="wrap bar">
    <a class="brand" href="index.html" aria-label="Glaze Lab home">
      <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3c6 7 10 11 10 16a10 10 0 0 1-20 0c0-5 4-9 10-16z" fill="#2547D0"/><path d="M11 20a5 5 0 0 0 5 5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".7"/></svg>
      <span>Glaze Lab</span></a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    <nav id="nav" class="nav" aria-label="Main">${links}
      <a class="cart-link" href="cart.html"${page === "cart" ? ' aria-current="page"' : ""}>Cart <span class="badge" id="cart-count">0</span></a></nav>
  </div></header>`;
  const btn = $(".menu-btn"), nav = $("#nav");
  btn.addEventListener("click", () => { const o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", o); });
  updateBadge();
}

function updateBadge() {
  const n = Cart.count(), b = $("#cart-count"), link = $(".cart-link");
  if (!b) return;
  b.textContent = n; b.hidden = n === 0;
  link.setAttribute("aria-label", `Cart, ${n} ${n === 1 ? "item" : "items"}`);
}

function renderFooter() {
  $("#site-footer").innerHTML = `
  <footer class="site-footer"><div class="wrap foot">
    <div><strong class="foot-brand">Glaze Lab</strong><p>Hand-glazed stoneware for everyday use.</p></div>
    <nav aria-label="Footer">${NAV.map(([k, l]) => `<a href="${k}.html">${l}</a>`).join("")}<a href="cart.html">Cart</a></nav>
    <p class="fine">Demo store built for the MTech Solutions Frontend Development Internship. No real orders or payments are processed.</p>
  </div></footer><div id="toast" class="toast" role="status" aria-live="polite"></div>`;
}

let toastTimer;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

function productCard(p) {
  const url = `product.html?id=${encodeURIComponent(p.id)}`;
  return `<article class="card">
    <a class="card-art" href="${url}" style="background:${p.bg}" aria-label="View ${esc(p.name)}">${artSvg(p)}</a>
    <div class="card-body">
      <p class="card-cat">${esc(p.category)}</p>
      <h3><a href="${url}">${esc(p.name)}</a></h3>
      <div class="card-foot"><span class="price">${money(p.price)}</span>
        <button class="btn btn-sm" type="button" data-add="${p.id}">Add to cart</button></div>
    </div></article>`;
}

/* Form validation helpers */
const rules = {
  required: msg => v => v.trim() ? "" : msg,
  email: v => !v.trim() ? "Enter your email address." : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email, like name@example.com.",
  phone: v => { const d = v.replace(/\D/g, ""); return !v.trim() ? "Enter your phone number." : d.length >= 7 && d.length <= 15 ? "" : "Enter a phone number with 7 to 15 digits."; },
  postal: v => !v.trim() ? "Enter your postal code." : /^[A-Za-z0-9 -]{3,10}$/.test(v.trim()) ? "" : "Enter a valid postal code (3 to 10 characters).",
  minLen: (n, empty) => v => !v.trim() ? empty : v.trim().length >= n ? "" : `Write at least ${n} characters.`
};

function setError(form, name, msg) {
  const field = form.elements[name], out = $(`#${field.id}-err`);
  out.textContent = msg;
  field.setAttribute("aria-invalid", msg ? "true" : "false");
}

function validateForm(form, spec) {
  let first = null;
  Object.entries(spec).forEach(([name, fn]) => {
    const msg = fn(form.elements[name].value);
    setError(form, name, msg);
    if (msg && !first) first = form.elements[name];
  });
  if (first) first.focus();
  return !first;
}

function liveClear(form, spec) {
  form.addEventListener("input", e => {
    const name = e.target.name;
    if (spec[name] && e.target.getAttribute("aria-invalid") === "true" && !spec[name](e.target.value)) setError(form, name, "");
  });
}

renderHeader();
renderFooter();
document.addEventListener("cart:change", updateBadge);
document.addEventListener("click", e => {
  const btn = e.target.closest("[data-add]");
  if (!btn) return;
  const p = productById(btn.dataset.add);
  Cart.add(p.id, 1);
  toast(`${p.name} added to cart`);
});
