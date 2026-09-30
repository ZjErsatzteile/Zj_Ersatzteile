const products=[
{name:"Bremsbeläge",cat:"Bremsen",icon:"◉",price:49.90,desc:"Bremsbeläge für verschiedene Fahrzeugmodelle"},
{name:"Bremsscheiben",cat:"Bremsen",icon:"◎",price:79.90,desc:"Vorder- und Hinterachse"},
{name:"Ölfilter",cat:"Filter",icon:"▣",price:12.90,desc:"Für viele Marken und Modelle"},
{name:"Luftfilter",cat:"Filter",icon:"▤",price:19.90,desc:"Passend nach Fahrzeugdaten"},
{name:"Zündkerzen",cat:"Motor",icon:"✦",price:29.90,desc:"Für verschiedene Benzinmotoren"},
{name:"Stoßdämpfer",cat:"Fahrwerk",icon:"↕",price:69.90,desc:"Vorder- und Hinterachse"},
{name:"Querlenker",cat:"Fahrwerk",icon:"⌁",price:54.90,desc:"Fahrwerk und Lenkung"},
{name:"Autobatterie",cat:"Elektrik",icon:"▰",price:119.90,desc:"Verschiedene Kapazitäten"},
{name:"Scheinwerfer",cat:"Elektrik",icon:"☼",price:89.90,desc:"Für zahlreiche Fahrzeugmodelle"},
{name:"Karosserieteile",cat:"Karosserie",icon:"▱",price:99.90,desc:"Nach Fahrzeugmodell anfragen"},
{name:"Keilrippenriemen",cat:"Motor",icon:"≈",price:24.90,desc:"Für viele Motorvarianten"},
{name:"Wischerblätter",cat:"Elektrik",icon:"⌁",price:18.90,desc:"Verschiedene Längen"}
];
let cart=JSON.parse(localStorage.getItem("zjcart")||"[]"),active="Alle";
const euro=n=>n.toLocaleString("de-DE",{style:"currency",currency:"EUR"});
function render(){
 const q=document.getElementById("search").value.toLowerCase().trim();
 const list=products.filter(p=>(active==="Alle"||p.cat===active)&&(!q||`${p.name} ${p.cat} ${p.desc}`.toLowerCase().includes(q)));
 document.getElementById("products").innerHTML=list.map((p,i)=>`<article class="product"><div class="pic">${p.icon}</div><div class="cat">${p.cat}</div><h3>${p.name}</h3><div class="desc">${p.desc}</div><div class="price">${euro(p.price)}</div><button class="add" onclick="add(${products.indexOf(p)})">In den Warenkorb</button></article>`).join("");
 document.getElementById("empty").style.display=list.length?"none":"block";
}
function add(i){const p=products[i],x=cart.find(x=>x.name===p.name);x?x.qty++:cart.push({...p,qty:1});save();openCart()}
function save(){localStorage.setItem("zjcart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const el=document.getElementById("cartItems");
 el.innerHTML=cart.length?cart.map((p,i)=>`<div class="cartRow"><div><h4>${p.name}</h4><small>${euro(p.price)} · ${p.cat}</small><br><button class="remove" onclick="removeItem(${i})">Entfernen</button></div><div class="qty"><button onclick="change(${i},-1)">−</button><b>${p.qty}</b><button onclick="change(${i},1)">+</button></div></div>`).join(""):"<p style='padding:20px;color:#777'>Dein Warenkorb ist leer.</p>";
 document.getElementById("total").textContent=euro(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function change(i,n){cart[i].qty+=n;if(cart[i].qty<=0)cart.splice(i,1);save()}
function removeItem(i){cart.splice(i,1);save()}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("open");renderCart()}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("overlay").classList.remove("open")}
function orderWhatsApp(){
 if(!cart.length){alert("Der Warenkorb ist leer.");return}
 let lines=cart.map(x=>`• ${x.name} x${x.qty} – ${euro(x.price*x.qty)}`).join("%0A");
 let total=euro(cart.reduce((s,x)=>s+x.price*x.qty,0));
 let msg=`Hallo ZJ Ersatzteile,%0Aich möchte folgende Teile anfragen:%0A${lines}%0A%0AGesamt: ${encodeURIComponent(total)}%0A%0AMarke/Modell/Baujahr: `;
 window.open(`https://wa.me/436677995349?text=${msg}`,"_blank");
}
document.querySelectorAll("#filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll("#filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");active=b.dataset.cat;render()});
document.getElementById("search").oninput=render;
document.getElementById("year").textContent=new Date().getFullYear();render();renderCart();
