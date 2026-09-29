// ===== YORDAMCHI NARSALAR =====
const $ = s => document.querySelector(s);
const fmt = n => Number(n).toLocaleString("ru-RU") + " so'm";

let items = PRODUCTS;
let filter = "all";


// ===== 1. ALOQA MA'LUMOTLARI =====
const tel = SETTINGS.phone.replace(/[^\d+]/g, "");
$("#callBtn").href = "tel:" + tel;
$("#footPhone").href = "tel:" + tel;
$("#footPhone").textContent = SETTINGS.phone;
$("#tgBtn").href = "https://t.me/" + SETTINGS.telegram;
$("#updated").textContent = SETTINGS.updated;
$("#footAddr").textContent = SETTINGS.address;


// ===== 2. MAHSULOTLARNI EKRANGA CHIQARISH =====
function render(){
  const grid = $("#grid");
  grid.textContent = "";

  const list = items.filter(p => filter === "all" || p.type === filter);

  if(!list.length){
    grid.innerHTML = '<p class="empty">Hozircha mahsulot yo\'q.</p>';
    return;
  }

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "item" + (p.available ? "" : " out");

    const pic = document.createElement("div");
    pic.className = "pic";
    if(p.img){
      const im = document.createElement("img");
      im.src = p.img; im.alt = p.name; im.loading = "lazy";
      pic.appendChild(im);
    } else {
      pic.textContent = p.emoji || "🍏";
    }

    const name = document.createElement("h3");
    name.textContent = p.name;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = fmt(p.price) + " ";
    const unit = document.createElement("small");
    unit.textContent = "/ " + p.unit;
    price.appendChild(unit);

    let btn;
    if(!p.available){
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.textContent = "Tugagan";
      btn.disabled = true;
    } else if(cart[p.name]){
      btn = stepper(p);
    } else {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn";
      btn.textContent = "Savatga qo'shish";
      btn.onclick = () => setQty(p, 1);
    }

    card.append(pic, name, price, btn);

    if(!p.available){
      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Tugagan";
      card.appendChild(badge);
    }

    grid.appendChild(card);
  });
}


// ===== 3. SARALASH TUGMALARI =====
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    filter = tab.dataset.f;
    document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-pressed", t === tab));
    render();
  });
});


// ===== 4. SAVAT =====
let cart = {};
try { cart = JSON.parse(localStorage.getItem("mm_cart") || "{}"); } catch(e) {}

const step = p => p.unit === "dona" ? 1 : 0.5;
const qtyTxt = (p, q) => String(q).replace(".", ",") + " " + p.unit;
const cartLines = () => items.filter(p => cart[p.name] && p.available).map(p => ({ p, q: cart[p.name] }));
const total = () => cartLines().reduce((sum, { p, q }) => sum + p.price * q, 0);

function setQty(p, q){
  q = Math.max(0, Math.round(q * 2) / 2);
  if(q) cart[p.name] = q; else delete cart[p.name];
  try { localStorage.setItem("mm_cart", JSON.stringify(cart)); } catch(e) {}
  render();
  renderCart();
  renderPromo();
}

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

function renderCart(){
  const lines = cartLines();
  const list = $("#cartList");
  list.textContent = "";

  $("#cartbar").hidden = !lines.length;
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

$("#openCart").onclick = () => $("#cartDlg").showModal();
$("#closeCart").onclick = () => $("#cartDlg").close();
$("#cartDlg").addEventListener("click", e => {
  if(e.target === $("#cartDlg")) $("#cartDlg").close();
});

$("#clearCart").onclick = () => {
  cart = {};
  try { localStorage.removeItem("mm_cart"); } catch(e) {}
  render();
  renderCart();
  renderPromo();
};


// ===== 5. BUYURTMA: FORMA VA TELEGRAMGA YUBORISH =====
try {
  const saved = JSON.parse(localStorage.getItem("mm_form") || "{}");
  $("#fPhone").value = saved.phone || "";
  $("#fAddr").value = saved.addr || "";
  $("#fLand").value = saved.land || "";
} catch(e) {}

$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();

  const phone = $("#fPhone").value.trim();
  const addr  = $("#fAddr").value.trim();
  const land  = $("#fLand").value.trim();
  const err   = $("#err");
  const lines = cartLines();

  const fail = (msg, field) => {
    err.textContent = msg;
    if(field) field.focus();
  };

  if(!lines.length)                        return fail("Savat bo'sh.");
  if(phone.replace(/\D/g, "").length < 9)  return fail("Telefon raqamini to'liq kiriting.", $("#fPhone"));
  if(addr.length < 5)                      return fail("Manzilni yozing.", $("#fAddr"));
  if(land.length < 3)                      return fail("Mo'ljalni yozing.", $("#fLand"));
  err.textContent = "";

  try { localStorage.setItem("mm_form", JSON.stringify({ phone, addr, land })); } catch(x) {}

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

  window.open("https://t.me/" + SETTINGS.telegram + "?text=" + encodeURIComponent(text), "_blank");
});


// ===== 6. AKSIYA BO'LIMI =====
function renderPromo(){
  const section = $("#promoSection");
  if(!section) return;   // HTML'da bo'lim qo'shilmagan bo'lsa, xato bermasdan chiqib ketadi

  const list = items.filter(p => p.promo && p.available);
  const row = $("#promoRow");
  row.textContent = "";

  if(!list.length){ section.hidden = true; return; }
  section.hidden = false;

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "promo-card";

    const pic = document.createElement("div");
    pic.className = "pic";
    pic.textContent = p.emoji || "🍏";

    const name = document.createElement("h3");
    name.textContent = p.name;

    const price = document.createElement("div");
    if(p.oldPrice){
      const old = document.createElement("div");
      old.className = "old";
      old.textContent = fmt(p.oldPrice);
      price.appendChild(old);
    }
    const now = document.createElement("div");
    now.className = "new";
    now.textContent = fmt(p.price);
    price.appendChild(now);

    let action;
    if(cart[p.name]){
      action = stepper(p);
    } else {
      action = document.createElement("button");
      action.type = "button";
      action.className = "btn";
      action.textContent = "Qo'shish";
      action.onclick = () => setQty(p, 1);
    }

    card.append(pic, name, price, action);

    if(p.oldPrice && p.oldPrice > p.price){
      const percent = Math.round((1 - p.price / p.oldPrice) * 100);
      const tag = document.createElement("span");
      tag.className = "promo-tag";
      tag.textContent = "-" + percent + "%";
      card.appendChild(tag);
    }

    row.appendChild(card);
  });
}


// ===== ISHGA TUSHIRISH =====
render();
renderCart();
renderPromo();