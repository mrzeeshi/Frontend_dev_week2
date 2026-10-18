# Glaze Lab: E-Commerce Storefront

A frontend-only online store for hand-glazed stoneware, built for **MTech Solutions, Frontend Development Internship, Batch 01, Task 02**.

There is no backend, database or payment gateway. Checkout is a demo UI only and collects no card details.

## Pages

| Page | File | What it does |
| --- | --- | --- |
| Home | `index.html` | Hero, category tiles, featured products, promo banner |
| Shop | `shop.html` | 8 products with search, category filter and sorting |
| Product details | `product.html?id=...` | Image, price, description, specs, quantity picker, Add to Cart, related products |
| About | `about.html` | Brand story and what makes the store different |
| Contact | `contact.html` | Contact info and a validated form with a success message |
| Cart | `cart.html` | Quantity controls, remove, line subtotals, delivery and total, empty state |
| Checkout | `checkout.html` | Validated shipping form, order summary, demo confirmation |

## Technologies

- HTML5, CSS3 and vanilla JavaScript (no framework, no build step)
- Product data in `js/data.js`; product images are drawn as inline SVG so no image files are needed
- Cart saved in `localStorage` so it survives a refresh
- Google Fonts: Bricolage Grotesque and Instrument Sans (system fonts are used as fallback)

## Project structure

```
index.html  shop.html  product.html  about.html  contact.html  cart.html  checkout.html
css/styles.css
js/data.js          product data + SVG art
js/cart.js          cart store (add, set quantity, remove, totals)
js/components.js    header, footer, product card, toast, form validation helpers
js/<page>.js        one small script per page
```

## Run locally

No install needed. Either open `index.html` in a browser, or serve the folder:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Deployed also on versel(https://glaze-lab-eta.vercel.app/)

## Cart rules

- Quantity per item is limited to 1 to 10.
- Delivery is free for orders of $75 or more, otherwise $6.00.
