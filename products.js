// ===== SOZLAMALAR =====
const SETTINGS = {
  phone: "+998500971206",
  telegram: "hayot2606",
  address: "Manzilingizni shu yerga yozing",
  updated: "24-sentabr",   // har kuni shu sanani yangilang
  sheetCsvUrl: ""          // hozircha bo'sh qoldiramiz
};

// ===== MAHSULOTLAR VA NARXLAR =====
// price: so'mda | unit: "kg" yoki "dona" | available: true (bor) yoki false (tugagan)
// Narxlar hozircha namuna, o'zingiznikiga almashtirasiz.
const PRODUCTS = [
  { name: "Kartoshka",   type: "sabzavot", price: 6200,  unit: "kg",   emoji: "🥔", img: "", available: true },
  { name: "Piyoz",       type: "sabzavot", price: 5000,  unit: "kg",   emoji: "🧅", img: "", available: true },
  { name: "Sabzi",       type: "sabzavot", price: 5000,  unit: "kg",   emoji: "🥕", img: "", available: true },
  { name: "Qizil sabzi", type: "sabzavot", price: 7000,  unit: "kg",   emoji: "🥕", img: "", available: true },
  { name: "Qizilcha",    type: "sabzavot", price: 6000,  unit: "kg",   emoji: "🍠", img: "", available: true },
  { name: "Olma",        type: "meva",     price: 12000, unit: "kg",   emoji: "🍎", img: "", available: true },
  { name: "Banan",       type: "meva",     price: 18000, unit: "kg",   emoji: "🍌", img: "", available: true },
  { name: "Ananas",      type: "meva",     price: 35000, unit: "dona", emoji: "🍍", img: "", available: true },
  { name: "Uzum",        type: "meva",     price: 20000, unit: "kg",   emoji: "🍇", img: "", available: false }
];