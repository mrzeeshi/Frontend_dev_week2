const root = $("#cart-root");

function row({ product: p, qty, line }) {
  return `<li class="row">
    <a class="thumb" href="product.html?id=${p.id}" style="background:${p.bg}" aria-label="View ${esc(p.name)}">${artSvg(p)}</a>
    <div class="row-main">
      <h2 class="row-name"><a href="product.html?id=${p.id}">${esc(p.name)}</a></h2>
      <p class="muted">${money(p.price)} each</p>
      <button type="button" class="link-btn" data-act="remove" data-id="${p.id}" aria-label="Remove ${esc(p.name)} from cart">Remove</button>
    </div>
    <div class="qty" role="group" aria-label="Quantity for ${esc(p.name)}">
      <button type="button" data-act="dec" data-id="${p.id}" aria-label="Decrease quantity">&minus;</button>
      <span class="qty-n" aria-live="polite">${qty}</span>
      <button type="button" data-act="inc" data-id="${p.id}" aria-label="Increase quantity"${qty >= MAX_QTY ? " disabled" : ""}>+</button>
    </div>
    <p class="line">${money(line)}</p></li>`;
}

function render() {
  const rows = Cart.detailed();
  if (!rows.length) {
    root.innerHTML = `<div class="empty"><h2>Your cart is empty</h2>
      <p>Add a mug, bowl or vase and it will show up here.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;
    return;
  }
  const sub = Cart.subtotal(), ship = Cart.shipping();
  const hint = ship ? `<p class="hint">Add ${money(FREE_SHIPPING_AT - sub)} more for free delivery.</p>` : `<p class="hint ok">You've unlocked free delivery.</p>`;
  root.innerHTML = `<div class="cart-layout">
    <ul class="cart-list">${rows.map(row).join("")}</ul>
    <aside class="summary" aria-label="Order summary"><h2>Order summary</h2>
      <dl><div><dt>Subtotal</dt><dd>${money(sub)}</dd></div>
      <div><dt>Delivery</dt><dd>${ship ? money(ship) : "Free"}</dd></div>
      <div class="total"><dt>Total</dt><dd>${money(Cart.total())}</dd></div></dl>
      ${hint}
      <a class="btn btn-block" href="checkout.html">Go to checkout</a>
      <a class="link-btn center" href="shop.html">Keep shopping</a></aside></div>`;
}

root.addEventListener("click", e => {
  const b = e.target.closest("[data-act]"); if (!b) return;
  const id = b.dataset.id, item = Cart.items().find(i => i.id === id);
  if (b.dataset.act === "remove") { Cart.remove(id); toast("Item removed"); }
  if (b.dataset.act === "inc") Cart.setQty(id, item.qty + 1);
  if (b.dataset.act === "dec") Cart.setQty(id, item.qty - 1);
  render();
});
render();
