const products = [
  { id:1, name:"Classic Burger", price:29.9, img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
  { id:2, name:"Bacon Explosion", price:34.9, img:"https://images.unsplash.com/photo-1550547660-d9450f859349"},
  { id:3, name:"Chicken Crispy", price:27.9, img:"https://images.unsplash.com/photo-1606755962773-d324e0a13086"}
];

let cart = [];

const container = document.getElementById("products");

products.forEach(p=>{
  container.innerHTML += `
    <div class="card">
      <img src="${p.img}">
      <div class="card-content">
        <h3>${p.name}</h3>
        <p>R$ ${p.price}</p>
        <button class="add-btn" onclick="addToCart(${p.id})">
          Adicionar
        </button>
      </div>
    </div>
  `;
});

function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  updateCart();
}

function updateCart(){
  const items = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const count = document.getElementById("cart-count");

  items.innerHTML = "";
  let total = 0;

  cart.forEach((item,i)=>{
    total += item.price;

    items.innerHTML += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong><br>
          R$ ${item.price.toFixed(2)}
        </div>

        <button class="remove-btn" onclick="removeItem(${i})">
          ✖
        </button>
      </div>
    `;
  });

  totalEl.innerText = total.toFixed(2);
  count.innerText = cart.length;
}
function removeItem(index){
  cart.splice(index, 1);
  updateCart();
}

function toggleCart(){
  const cart = document.getElementById("cart");
  const overlay = document.getElementById("overlay");

  cart.classList.toggle("active");
  overlay.classList.toggle("active");

  document.body.style.overflow = cart.classList.contains("active")
    ? "hidden"
    : "auto";
}

function checkout(){
  let msg = "Pedido:%0A";

  cart.forEach(i=>{
    msg += `- ${i.name}%0A`;
  });

  msg += `Total: R$ ${document.getElementById("total").innerText}`;

  window.open(`https://wa.me/5599999999999?text=${msg}`);
}
