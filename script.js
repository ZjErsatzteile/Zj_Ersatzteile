const products = [
  {name:"Bremsbeläge", cat:"Bremsen", icon:"◉", price:"Preis auf Anfrage", desc:"Für verschiedene Fahrzeugmodelle"},
  {name:"Bremsscheiben", cat:"Bremsen", icon:"◎", price:"Preis auf Anfrage", desc:"Vorder- und Hinterachse"},
  {name:"Ölfilter", cat:"Filter", icon:"▣", price:"Preis auf Anfrage", desc:"Für viele Marken & Modelle"},
  {name:"Luftfilter", cat:"Filter", icon:"▤", price:"Preis auf Anfrage", desc:"Passend nach Fahrzeugdaten"},
  {name:"Zündkerzen", cat:"Motor", icon:"✦", price:"Preis auf Anfrage", desc:"Für Benzinmotoren"},
  {name:"Stoßdämpfer", cat:"Fahrwerk", icon:"↕", price:"Preis auf Anfrage", desc:"Vorder- und Hinterachse"},
  {name:"Querlenker", cat:"Fahrwerk", icon:"⌁", price:"Preis auf Anfrage", desc:"Fahrwerk & Lenkung"},
  {name:"Batterien", cat:"Elektrik", icon:"▰", price:"Preis auf Anfrage", desc:"Verschiedene Kapazitäten"},
  {name:"Scheinwerfer", cat:"Elektrik", icon:"☼", price:"Preis auf Anfrage", desc:"Für zahlreiche Fahrzeugmodelle"},
  {name:"Karosserieteile", cat:"Karosserie", icon:"▱", price:"Preis auf Anfrage", desc:"Nach Fahrzeugmodell anfragen"}
];

let active = "Alle";
const grid = document.querySelector("#productGrid");
const search = document.querySelector("#search");
const empty = document.querySelector("#empty");

function render(){
  const q = search.value.toLowerCase().trim();
  const filtered = products.filter(p =>
    (active === "Alle" || p.cat === active) &&
    (!q || `${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(q))
  );
  grid.innerHTML = filtered.map(p => {
    const msg = encodeURIComponent(`Hallo ZJ Ersatzteile, ich interessiere mich für: ${p.name}. Fahrzeug/Modell: `);
    return `<article class="card">
      <div class="card-icon">${p.icon}</div>
      <div class="meta">${p.cat}</div>
      <h3>${p.name}</h3>
      <div class="meta">${p.desc}</div>
      <div class="price">${p.price}</div>
      <a class="ask" href="https://wa.me/436677995349?text=${msg}" target="_blank" rel="noopener">Per WhatsApp anfragen</a>
    </article>`;
  }).join("");
  empty.style.display = filtered.length ? "none" : "block";
}

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    active = btn.dataset.category;
    render();
  });
});
search.addEventListener("input", render);
document.querySelector("#year").textContent = new Date().getFullYear();
render();
