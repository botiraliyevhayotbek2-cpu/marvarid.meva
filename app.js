// ===== YORDAMCHI NARSALAR =====
const $ = s => document.querySelector(s);            // elementni topish uchun qisqa nom
const fmt = n => Number(n).toLocaleString("ru-RU") + " so'm";   // 12000 -> "12 000 so'm"

let items = PRODUCTS;    // mahsulotlar ro'yxati (products.js dan)
let filter = "all";      // hozir qaysi tur tanlangan: all, sabzavot yoki meva


// ===== 1. ALOQA MA'LUMOTLARI =====
const tel = SETTINGS.phone.replace(/[^\d+]/g, "");   // raqamdan bo'sh joy va belgilarni olib tashlaydi
$("#callBtn").href = "tel:" + tel;
$("#footPhone").href = "tel:" + tel;
$("#footPhone").textContent = SETTINGS.phone;
$("#tgBtn").href = "https://t.me/" + SETTINGS.telegram;
$("#updated").textContent = SETTINGS.updated;
$("#footAddr").textContent = SETTINGS.address;


// ===== 2. MAHSULOTLARNI EKRANGA CHIQARISH =====
function render(){
  const grid = $("#grid");
  grid.textContent = "";   // avval eskisini tozalaymiz

  // tanlangan turga qarab ro'yxatni saralaymiz
  const list = items.filter(p => filter === "all" || p.type === filter);

  if(!list.length){
    grid.innerHTML = '<p class="empty">Hozircha mahsulot yo\'q.</p>';
    return;
  }

  // har bir mahsulot uchun bitta karta yasaymiz
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "item" + (p.available ? "" : " out");

    // rasm yoki emoji
    const pic = document.createElement("div");
    pic.className = "pic";
    if(p.img){
      const im = document.createElement("img");
      im.src = p.img; im.alt = p.name; im.loading = "lazy";
      pic.appendChild(im);
    } else {
      pic.textContent = p.emoji || "🍏";
    }

    // nomi
    const name = document.createElement("h3");
    name.textContent = p.name;

    // narxi
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = fmt(p.price) + " ";
    const unit = document.createElement("small");
    unit.textContent = "/ " + p.unit;
    price.appendChild(unit);

    // tugma (6-qadamda shu tugma savatga qo'shadigan bo'ladi)
        // tugma: "Savatga qo'shish" yoki miqdorni o'zgartirish (− 1 kg +)
    let btn;
    if(!p.available){
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.textContent = "Tugagan";
      btn.disabled = true;
    } else if(cart[p.name]){
      btn = stepper(p);            // savatda bor: − miqdor +
    } else {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.textContent = "Savatga qo'shish";
      btn.onclick = () => setQty(p, 1);   // 1 kg (yoki 1 dona) qo'shadi
    }

    card.append(pic, name, price, btn);

    // tugagan mahsulotga belgi
    if(!p.available){
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Tugagan";
      card.appendChild(badge);
    }

    grid.appendChild(card);
  });
}


// ===== 3. SARALASH TUGMALARI (Hammasi / Sabzavotlar / Mevalar) =====
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    filter = tab.dataset.f;
    document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-pressed", t === tab));
    render();
  });
});


// ===== 4. SAVAT =====
// Savat shunday saqlanadi: { "Kartoshka": 2, "Olma": 1.5 }  (mahsulot nomi -> miqdor)
let cart = {};
try { cart = JSON.parse(localStorage.getItem("mm_cart") || "{}"); } catch(e) {}   // sahifa yangilansa ham savat yo'qolmaydi

const step = p => p.unit === "dona" ? 1 : 0.5;                          // kg 0,5 dan, dona 1 dan o'zgaradi
const qtyTxt = (p, q) => String(q).replace(".", ",") + " " + p.unit;    // 1.5 -> "1,5 kg"
const cartLines = () => items.filter(p => cart[p.name] && p.available).map(p => ({ p, q: cart[p.name] }));
const total = () => cartLines().reduce((sum, { p, q }) => sum + p.price * q, 0);

// Miqdorni o'rnatish (0 bo'lsa savatdan chiqadi)
function setQty(p, q){
  q = Math.max(0, Math.round(q * 2) / 2);
  if(q) cart[p.name] = q; else delete cart[p.name];
  try { localStorage.setItem("mm_cart", JSON.stringify(cart)); } catch(e) {}
  render();
  renderCart();
}

// "− 1 kg +" tugmalari
function stepper(p){
  const box = document.createElement("div");
  box.className = "step";

  const mk = (text, dir, label) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    b.setAttribute("aria-label", label + ": " + p.name);
    b.onclick = () => setQty(p, (cart[p.name] || 0) + dir * step(p));
    return b;
  };

  const qty = document.createElement("span");
  qty.textContent = qtyTxt(p, cart[p.name]);

  box.append(mk("−", -1, "Kamaytirish"), qty, mk("+", 1, "Ko'paytirish"));
  return box;
}

// Pastdagi savat paneli va savat oynasi ichidagi ro'yxat
function renderCart(){
  const lines = cartLines();
  const list = $("#cartList");
  list.textContent = "";

  $("#cartbar").hidden = !lines.length;    // savat bo'sh bo'lsa panel yashirin
  $("#cartInfo").textContent = lines.length + " ta mahsulot · " + fmt(total());
  $("#cartTotal").textContent = fmt(total());

  if(!lines.length){
    if($("#cartDlg").open) $("#cartDlg").close();
    return;
  }

  lines.forEach(({ p, q }) => {
    const row = document.createElement("div");
    row.className = "row";

    const info = document.createElement("div");
    const nm = document.createElement("strong");
    nm.textContent = (p.emoji ? p.emoji + " " : "") + p.name;
    const pr = document.createElement("small");
    pr.textContent = fmt(p.price) + " / " + p.unit;
    info.append(nm, document.createElement("br"), pr);

    const sum = document.createElement("b");
    sum.textContent = fmt(p.price * q);

    row.append(info, stepper(p), sum);
    list.appendChild(row);
  });
}

// Savat oynasini ochish va yopish
$("#openCart").onclick = () => $("#cartDlg").showModal();
$("#closeCart").onclick = () => $("#cartDlg").close();
$("#cartDlg").addEventListener("click", e => {
  if(e.target === $("#cartDlg")) $("#cartDlg").close();    // oyna tashqarisini bossa yopiladi
});

// Savatni tozalash
$("#clearCart").onclick = () => {
  cart = {};
  try { localStorage.removeItem("mm_cart"); } catch(e) {}
  render();
  renderCart();
};

// ===== 5. BUYURTMA: FORMA VA TELEGRAMGA YUBORISH =====

// Mijoz oldin buyurtma bergan bo'lsa, raqam va manzil avtomatik to'ldiriladi
try {
  const saved = JSON.parse(localStorage.getItem("mm_form") || "{}");
  $("#fPhone").value = saved.phone || "";
  $("#fAddr").value = saved.addr || "";
  $("#fLand").value = saved.land || "";
} catch(e) {}

$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();    // sahifa yangilanib ketmasligi uchun

  const phone = $("#fPhone").value.trim();
  const addr  = $("#fAddr").value.trim();
  const land  = $("#fLand").value.trim();
  const err   = $("#err");
  const lines = cartLines();

  // Xato chiqarish: xabarni ko'rsatadi va kerakli maydonga o'tadi
  const fail = (msg, field) => {
    err.textContent = msg;
    if(field) field.focus();
  };

  // Tekshiruv: telefon, manzil va mo'ljal majburiy
  if(!lines.length)                        return fail("Savat bo'sh.");
  if(phone.replace(/\D/g, "").length < 9)  return fail("Telefon raqamini to'liq kiriting.", $("#fPhone"));
  if(addr.length < 5)                      return fail("Manzilni yozing.", $("#fAddr"));
  if(land.length < 3)                      return fail("Mo'ljalni yozing.", $("#fLand"));
  err.textContent = "";

  // Keyingi safar uchun eslab qolamiz
  try { localStorage.setItem("mm_form", JSON.stringify({ phone, addr, land })); } catch(x) {}

  // Buyurtma matnini tuzamiz
  const items_text = lines.map(({ p, q }, i) =>
    (i + 1) + ". " + p.name + " — " + qtyTxt(p, q) + " × " + fmt(p.price) + " = " + fmt(p.price * q)
  );

  const text = [
    "🛒 Yangi buyurtma — marvarid.meva",
    "",
    ...items_text,
    "",
    "Jami: " + fmt(total()),
    "",
    "📞 Telefon: " + phone,
    "📍 Manzil: " + addr,
    "🧭 Mo'ljal: " + land
  ].join("\n");

  // Telegramni tayyor matn bilan ochamiz
  window.open("https://t.me/" + SETTINGS.telegram + "?text=" + encodeURIComponent(text), "_blank");
});
// ===== ISHGA TUSHIRISH =====
render();
renderCart();