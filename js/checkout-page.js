const root = $("#checkout-root");

const spec = {
  name: rules.required("Enter your full name."),
  email: rules.email,
  phone: rules.phone,
  address: rules.minLen(5, "Enter your street address."),
  city: rules.required("Enter your city."),
  postal: rules.postal,
  country: rules.required("Choose your country.")
};

function field(id, label, extra = "") {
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" ${extra} aria-describedby="${id}-err"><p class="err" id="${id}-err"></p></div>`;
}

function summaryHtml() {
  const rows = Cart.detailed();
  return `<aside class="summary" aria-label="Order summary"><h2>Order summary</h2>
    <ul class="mini">${rows.map(r => `<li><span>${esc(r.product.name)} <span class="muted">× ${r.qty}</span></span><span>${money(r.line)}</span></li>`).join("")}</ul>
    <dl><div><dt>Subtotal</dt><dd>${money(Cart.subtotal())}</dd></div>
    <div><dt>Delivery</dt><dd>${Cart.shipping() ? money(Cart.shipping()) : "Free"}</dd></div>
    <div class="total"><dt>Total</dt><dd>${money(Cart.total())}</dd></div></dl></aside>`;
}

function render() {
  if (!Cart.count()) {
    root.innerHTML = `<div class="empty"><h2>Nothing to check out yet</h2><p>Your cart is empty.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;
    return;
  }
  root.innerHTML = `<div class="cart-layout">
  <form id="co-form" novalidate>
    <p class="notice">Demo checkout. No payment is taken and no card details are collected.</p>
    <fieldset><legend>Contact</legend>
      ${field("name", "Full name", 'autocomplete="name" required')}
      <div class="two">${field("email", "Email", 'type="email" autocomplete="email" required')}${field("phone", "Phone", 'type="tel" autocomplete="tel" required')}</div>
    </fieldset>
    <fieldset><legend>Shipping address</legend>
      ${field("address", "Street address", 'autocomplete="street-address" required')}
      <div class="two">${field("city", "City", 'autocomplete="address-level2" required')}${field("postal", "Postal code", 'autocomplete="postal-code" required')}</div>
      <div class="field"><label for="country">Country</label>
        <select id="country" name="country" autocomplete="country-name" required aria-describedby="country-err">
          <option value="">Choose a country</option><option>Pakistan</option><option>United Arab Emirates</option><option>United Kingdom</option><option>United States</option><option>Canada</option><option>Other</option></select>
        <p class="err" id="country-err"></p></div>
    </fieldset>
    <fieldset><legend>Payment method</legend>
      <label class="radio"><input type="radio" name="pay" value="cod" checked> Pay on delivery (demo)</label>
      <label class="radio"><input type="radio" name="pay" value="card"> Card on delivery (demo)</label>
    </fieldset>
    <button class="btn btn-block" type="submit">Place order</button>
  </form>${summaryHtml()}</div>`;

  const form = $("#co-form");
  liveClear(form, spec);
  form.addEventListener("submit", e => {
    e.preventDefault();
    if (!validateForm(form, spec)) return;
    const order = { id: "GL-" + Math.floor(100000 + Math.random() * 900000), total: Cart.total(), email: form.elements.email.value.trim(), name: form.elements.name.value.trim().split(" ")[0] };
    Cart.clear();
    root.innerHTML = `<div class="done" role="status" tabindex="-1"><h2>Thank you, ${esc(order.name)}. Your order is placed.</h2>
      <p>Order <strong>${order.id}</strong> for <strong>${money(order.total)}</strong>. A confirmation would be sent to ${esc(order.email)}.</p>
      <p class="muted">This is a demo. Nothing was charged and no order was created.</p>
      <a class="btn" href="shop.html">Continue shopping</a></div>`;
    $(".done").focus(); window.scrollTo({ top: 0 });
  });
}
render();
