/* Cart store: localStorage with in-memory fallback. */
const CART_KEY = "glazelab-cart-v1";
const MAX_QTY = 10, FREE_SHIPPING_AT = 75, SHIPPING_FEE = 6;
let memoryCart = null;

const Cart = {
  items() {
    let raw = memoryCart;
    if (raw === null) {
      try { raw = JSON.parse(localStorage.getItem(CART_KEY)); } catch (e) { raw = null; }
    }
    return Array.isArray(raw) ? raw.filter(i => productById(i.id) && i.qty > 0) : [];
  },
  save(items) {
    memoryCart = items;
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) { /* storage blocked */ }
    document.dispatchEvent(new Event("cart:change"));
  },
  add(id, qty = 1) {
    const items = this.items();
    const row = items.find(i => i.id === id);
    if (row) row.qty = Math.min(MAX_QTY, row.qty + qty);
    else items.push({ id, qty: Math.min(MAX_QTY, qty) });
    this.save(items);
  },
  setQty(id, qty) {
    if (qty < 1) return this.remove(id);
    this.save(this.items().map(i => i.id === id ? { id, qty: Math.min(MAX_QTY, qty) } : i));
  },
  remove(id) { this.save(this.items().filter(i => i.id !== id)); },
  clear() { this.save([]); },
  count() { return this.items().reduce((n, i) => n + i.qty, 0); },
  detailed() { return this.items().map(i => { const product = productById(i.id); return { product, qty: i.qty, line: product.price * i.qty }; }); },
  subtotal() { return this.detailed().reduce((s, r) => s + r.line, 0); },
  shipping() { const s = this.subtotal(); return s === 0 || s >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE; },
  total() { return this.subtotal() + this.shipping(); }
};
