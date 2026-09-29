// ===== SOZLAMALAR =====
const SETTINGS = {
  phone: "+998500971206",
  telegram: "hayot2606",
  address: "Manzilingizni shu yerga yozing",
  updated: "29-sentabr",   // har kuni shu sanani yangilang
  sheetCsvUrl: ""
};

// ===== MAHSULOTLAR VA NARXLAR =====
const PRODUCTS = [
  // ---- MEVALAR ----
  { name: "Banan",                          type: "meva", price: 17800,  unit: "kg",   emoji: "🍌", img: "", available: true },
  { name: "Uzum \"Kishmish\"",               type: "meva", price: 15200,  unit: "kg",   emoji: "🍇", img: "", available: true },
  { name: "Uzum \"Oq Husayn\"",              type: "meva", price: 15900,  unit: "kg",   emoji: "🍇", img: "", available: true },
  { name: "Uzum \"Damskaya palochka\"",      type: "meva", price: 28800,  unit: "kg",   emoji: "🍇", img: "", available: true },
  { name: "Olma \"Beshyulduz\" oliy",        type: "meva", price: 22500,  unit: "kg",   emoji: "🍎", img: "", available: true },
  { name: "Olma \"Super Golden Moldova\"",   type: "meva", price: 18900,  unit: "kg",   emoji: "🍎", img: "", available: true },
  { name: "Shaftoli \"Super Lola\"",         type: "meva", price: 25900,  unit: "kg",   emoji: "🍑", img: "", available: true },
  { name: "Uzum \"Rizamat oliy\"",           type: "meva", price: 36900,  unit: "kg",   emoji: "🍇", img: "", available: true },
  { name: "Uzum \"Maksim\"",                 type: "meva", price: 23700,  unit: "kg",   emoji: "🍇", img: "", available: true },
  { name: "Malina \"Marvarid\"",             type: "meva", price: 127500, unit: "kg",   emoji: "🍓", img: "", available: true },
  { name: "Qovun",                          type: "meva", price: 5500,   unit: "kg",   emoji: "🍈", img: "", available: true },
 { name: "Mandarin bargli (Xitoy)",        type: "meva", price: 19000,  unit: "kg",   emoji: "🍊", img: "", available: true, promo: true },
  { name: "Citrus Pomelo",                  type: "meva", price: 54000,  unit: "dona", emoji: "🍊", img: "", available: true },
  { name: "Kivi (Eron)",                    type: "meva", price: 31500,  unit: "kg",   emoji: "🥝", img: "", available: true },
  { name: "Mandarin mayda \"Medovka\"",      type: "meva", price: 27900,  unit: "kg",   emoji: "🍊", img: "", available: true },
  { name: "Limon (mestniy)",                type: "meva", price: 29500,  unit: "kg",   emoji: "🍋", img: "", available: true },
    { name: "Ananas", type: "meva", price: 13500, unit: "dona", emoji: "🍍", img: "", available: true, promo: true },
  { name: "Nok",     type: "meva", price: 8900, unit: "kg",   emoji: "🍐", img: "", available: true, promo: true },
{ name: "Mandarin bargli (Xitoy)",        type: "meva", price: 19000,  unit: "kg",   emoji: "🍊", img: "", available: true, promo: true },

  // ---- SABZAVOTLAR ----
  { name: "Ukrop",                          type: "sabzavot", price: 1500,  unit: "dona", emoji: "🌿", img: "", available: true },
  { name: "Ko'k piyoz",                      type: "sabzavot", price: 3000,  unit: "dona", emoji: "🌱", img: "", available: true },
  { name: "Toshkent qalampir",              type: "sabzavot", price: 18900, unit: "kg",   emoji: "🫑", img: "", available: true },
  { name: "Gulkaram",                       type: "sabzavot", price: 19500, unit: "dona", emoji: "🥦", img: "", available: true },
  { name: "Karam \"Aysberg\"",               type: "sabzavot", price: 12000, unit: "dona", emoji: "🥬", img: "", available: true },
  { name: "Yangi karam",                    type: "sabzavot", price: 8000,  unit: "dona", emoji: "🥬", img: "", available: true },
  { name: "Makkajo'xori",                    type: "sabzavot", price: 2800,  unit: "dona", emoji: "🌽", img: "", available: true },
  { name: "Jandug'",                        type: "sabzavot", price: 3000,  unit: "dona", emoji: "🥒", img: "", available: true },
  { name: "Pomidor Cherry",                 type: "sabzavot", price: 41900, unit: "kg",   emoji: "🍅", img: "", available: true },
  { name: "Bolgar qalampir ko'k (Toshkent)", type: "sabzavot", price: 16000, unit: "kg",   emoji: "🫑", img: "", available: true },
  { name: "Bolgar qalampir qizil (parnik)", type: "sabzavot", price: 10900, unit: "kg",   emoji: "🫑", img: "", available: true },
  { name: "Bulg'or qalampir qizil (venger navi)", type: "sabzavot", price: 30500, unit: "kg", emoji: "🫑", img: "", available: true },
  { name: "Qizil",                          type: "sabzavot", price: 8200,  unit: "kg",   emoji: "🥕", img: "", available: true },
  { name: "Kartoshka (mestniy)",            type: "sabzavot", price: 6000,  unit: "kg",   emoji: "🥔", img: "", available: true },
  { name: "Kartoshka (Rossiya)",            type: "sabzavot", price: 6200,  unit: "kg",   emoji: "🥔", img: "", available: true },
  { name: "Piyoz",                          type: "sabzavot", price: 3300,  unit: "kg",   emoji: "🧅", img: "", available: true },
  { name: "Sabzi",                          type: "sabzavot", price: 7200,  unit: "kg",   emoji: "🥕", img: "", available: true },
  { name: "Shallot piyoz",                  type: "sabzavot", price: 10200, unit: "kg",   emoji: "🧅", img: "", available: true },
  { name: "Qizilcha",                       type: "sabzavot", price: 6000,  unit: "kg",   emoji: "🍠", img: "", available: true },
  { name: "Pomidor (parnik)",               type: "sabzavot", price: 17500, unit: "kg",   emoji: "🍅", img: "", available: true },
  { name: "Parnik pomidor (rozoviy)",       type: "sabzavot", price: 17500, unit: "kg",   emoji: "🍅", img: "", available: true },
  { name: "Bodring",                        type: "sabzavot", price: 8200,  unit: "kg",   emoji: "🥒", img: "", available: true },
  { name: "Baqlajon",                       type: "sabzavot", price: 6000,  unit: "kg",   emoji: "🍆", img: "", available: true }
];
