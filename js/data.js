/* Product data and SVG product art. All data is local; there is no backend. */
const CATEGORIES = [
  { name: "Drinkware", rep: "cobalt-mug" },
  { name: "Tableware", rep: "sulfur-bowl" },
  { name: "Vases & Planters", rep: "mint-vase" },
  { name: "Home", rep: "tangerine-candle" }
];

const PRODUCTS = [
  { id: "cobalt-mug", name: "Cobalt Drip Mug", category: "Drinkware", price: 24, shape: "mug", glaze: "#2547D0", bg: "#DCE4FA", featured: true,
    desc: "A sturdy everyday mug with a deep cobalt glaze that pools darker where it drips. Wide handle, steady base.",
    details: { Size: "9 cm wide, 8.5 cm tall", Capacity: "320 ml", Material: "Stoneware, cobalt glaze", Care: "Dishwasher and microwave safe" } },
  { id: "mint-vase", name: "Mint Bulb Vase", category: "Vases & Planters", price: 48, shape: "vase", glaze: "#6CC5AC", bg: "#E0F3EE", featured: true,
    desc: "A rounded vase with a narrow neck that holds a few stems well. The glossy mint glaze looks good with or without flowers.",
    details: { Size: "16 cm wide, 24 cm tall", Capacity: "900 ml", Material: "Stoneware, mint glaze", Care: "Hand wash; watertight inside" } },
  { id: "sulfur-bowl", name: "Sulfur Noodle Bowl", category: "Tableware", price: 28, shape: "bowl", glaze: "#F2D335", bg: "#FBF2C4", featured: true,
    desc: "A deep bowl made for noodles, soup and cereal. The sunny yellow glaze is food safe and easy to wipe clean.",
    details: { Size: "17 cm wide, 8 cm tall", Capacity: "750 ml", Material: "Stoneware, yellow glaze", Care: "Dishwasher and microwave safe" } },
  { id: "blush-plates", name: "Blush Dinner Plates, Set of 4", category: "Tableware", price: 86, shape: "plates", glaze: "#F2A7B8", bg: "#FBE3E8", featured: true,
    desc: "Four stackable dinner plates with a soft pink glaze and a slightly raised rim that keeps sauces in place.",
    details: { Size: "26 cm wide each", Capacity: "Set of 4", Material: "Stoneware, pink glaze", Care: "Dishwasher safe; avoid sudden temperature changes" } },
  { id: "ink-planter", name: "Ink Planter", category: "Vases & Planters", price: 36, shape: "planter", glaze: "#1B2A49", bg: "#DDE2EC", featured: false,
    desc: "A tapered planter in a deep navy glaze, sized for a small herb or a trailing houseplant. Drainage hole included.",
    details: { Size: "15 cm wide, 14 cm tall", Capacity: "1.2 L soil", Material: "Stoneware, navy glaze", Care: "Wipe clean with a damp cloth" } },
  { id: "chalk-pitcher", name: "Chalk Pitcher", category: "Drinkware", price: 54, shape: "pitcher", glaze: "#DDE2E9", bg: "#C5CEDB", featured: false,
    desc: "A tall pitcher with a clean pour and a pale chalk glaze. Good for water at the table or a big bunch of stems.",
    details: { Size: "13 cm wide, 22 cm tall", Capacity: "1.1 L", Material: "Stoneware, chalk glaze", Care: "Dishwasher safe" } },
  { id: "pistachio-cup", name: "Pistachio Cup and Saucer", category: "Drinkware", price: 32, shape: "cup", glaze: "#B7D96B", bg: "#EDF5D4", featured: false,
    desc: "A small cup and matching saucer for tea or espresso. The light green glaze gets a little deeper at the rim.",
    details: { Size: "Cup 8 cm wide; saucer 14 cm", Capacity: "180 ml", Material: "Stoneware, green glaze", Care: "Dishwasher and microwave safe" } },
  { id: "tangerine-candle", name: "Tangerine Candle Holder", category: "Home", price: 22, shape: "candle", glaze: "#F28C38", bg: "#FCE3CF", featured: false,
    desc: "A low holder with a wide dish that catches wax. Fits standard taper candles and glows orange in evening light.",
    details: { Size: "11 cm wide, 8 cm tall", Capacity: "Fits 2 cm taper candles", Material: "Stoneware, orange glaze", Care: "Wipe clean; remove wax with warm water" } }
];

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = v => Math.max(0, Math.min(255, Math.round(v * (1 + amt))));
  return "#" + [n >> 16, (n >> 8) & 255, n & 255].map(v => f(v).toString(16).padStart(2, "0")).join("");
}

function artSvg(p) {
  const c = p.glaze, d = shade(c, -0.2), l = shade(c, 0.2);
  const shadow = '<ellipse cx="200" cy="336" rx="125" ry="12" fill="#0F1B2D" opacity=".14"/>';
  let b = "";
  switch (p.shape) {
    case "mug":
      b = `<path d="M270 170h22a38 38 0 0 1 0 76h-22" fill="none" stroke="${d}" stroke-width="18" stroke-linecap="round"/>
      <path d="M130 140h140v150a34 34 0 0 1-34 34h-72a34 34 0 0 1-34-34z" fill="${c}"/>
      <ellipse cx="200" cy="140" rx="70" ry="13" fill="${d}"/>
      <rect x="148" y="168" width="14" height="110" rx="7" fill="#fff" opacity=".28"/>`; break;
    case "vase":
      b = `<path d="M172 80h56v50c0 34 72 46 72 116 0 52-34 74-100 74s-100-22-100-74c0-70 72-82 72-116z" fill="${c}"/>
      <ellipse cx="200" cy="80" rx="28" ry="6" fill="${d}"/>
      <path d="M128 250c4-30 22-44 36-62" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".3"/>`; break;
    case "bowl":
      b = `<rect x="160" y="314" width="80" height="14" rx="5" fill="${d}"/>
      <path d="M80 190h240c0 80-50 130-120 130S80 270 80 190z" fill="${c}"/>
      <ellipse cx="200" cy="190" rx="120" ry="16" fill="${d}"/>
      <ellipse cx="200" cy="192" rx="106" ry="11" fill="${l}"/>`; break;
    case "plates":
      b = [300, 264, 228].map(y => `<ellipse cx="200" cy="${y + 8}" rx="140" ry="34" fill="${d}"/><ellipse cx="200" cy="${y}" rx="140" ry="34" fill="${c}"/><ellipse cx="200" cy="${y + 2}" rx="104" ry="21" fill="${l}"/>`).join(""); break;
    case "planter":
      b = `<g fill="#2F7D5B"><path d="M200 210C166 160 150 120 162 80c32 22 46 74 38 130z"/><path d="M200 210c10-60 34-100 70-118 8 40-16 94-70 118z"/><path d="M200 210c-20-40-80-60-104-56 22 36 60 56 104 56z" fill="#3E9A72"/></g>
      <path d="M118 218h164l-20 106H138z" fill="${c}"/><rect x="108" y="204" width="184" height="26" rx="8" fill="${d}"/>
      <rect x="140" y="240" width="10" height="64" rx="5" fill="#fff" opacity=".2"/>`; break;
    case "pitcher":
      b = `<path d="M262 150h20a36 36 0 0 1 0 90h-20" fill="none" stroke="${d}" stroke-width="18" stroke-linecap="round"/>
      <path d="M126 112c-24 0-40-14-46-30 26 0 48 6 46 30z" fill="${c}"/>
      <path d="M126 112h128v190a30 30 0 0 1-30 30h-68a30 30 0 0 1-30-30z" fill="${c}"/>
      <ellipse cx="190" cy="112" rx="64" ry="11" fill="${d}"/>
      <rect x="144" y="140" width="12" height="150" rx="6" fill="#fff" opacity=".45"/>`; break;
    case "cup":
      b = `<ellipse cx="200" cy="306" rx="130" ry="24" fill="${d}"/><ellipse cx="200" cy="300" rx="130" ry="24" fill="${c}"/><ellipse cx="200" cy="298" rx="72" ry="12" fill="${l}"/>
      <path d="M262 206h14a26 26 0 0 1 0 54h-22" fill="none" stroke="${d}" stroke-width="14" stroke-linecap="round"/>
      <path d="M132 190h136c0 70-30 108-68 108s-68-38-68-108z" fill="${c}"/>
      <ellipse cx="200" cy="190" rx="68" ry="11" fill="${d}"/>
      <rect x="150" y="212" width="10" height="56" rx="5" fill="#fff" opacity=".3"/>`; break;
    case "candle":
      b = `<ellipse cx="200" cy="316" rx="112" ry="20" fill="${d}"/><ellipse cx="200" cy="308" rx="112" ry="20" fill="${c}"/>
      <rect x="176" y="190" width="48" height="118" rx="6" fill="${c}"/><ellipse cx="200" cy="190" rx="24" ry="6" fill="${d}"/>
      <rect x="190" y="128" width="20" height="62" rx="3" fill="#F7F3E8"/>
      <path d="M200 84c14 16 14 30 0 38-14-8-14-22 0-38z" fill="#F2D335"/>`; break;
  }
  return `<svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">${shadow}${b}</svg>`;
}

const productById = id => PRODUCTS.find(p => p.id === id);
