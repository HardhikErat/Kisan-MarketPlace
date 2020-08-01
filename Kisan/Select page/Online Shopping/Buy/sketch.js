var product=[];
var cartItems=[];
var cart_n = document.getElementById('cart_n');
var seedDIV= document.getElementById("seedDIV");
var fertilizerDIV = document.getElementById("fertilizerDIV");
var irrigationDIV = document.getElementById("irrigationDIV");
var SEED=[
  {name: 'Calcum Magnesium Sulphur Fertilizer',price:1000, quantity:25+'kgs'},
  {name: 'Nitrogen Fertilizer',price:2500, quantity:25+'kgs'},
  {name: 'Phosphorous Fertilizer',price:450, quantity:50+'kgs'},
];
var FERTILIZER=[
  {name: 'Basmati Rice',price:100, quantity:1+'kg'},
  {name: 'Cashew Apple Seeds',price:150, quantity:1+'dozen'},
  {name: 'Guava Seeds',price:250, quantity:250+'gms'},
  {name: 'Kashmiri Apple Seeds',price:199, quantity:1+'kg'},
  {name: 'Maize',price:55, quantity:1+'kg'},
  {name: 'Wheat Seeds',price:25, quantity:1+'kg'},
];
var IRRIGATION=[
  {name: 'Automated Irrigation System',price:35000, quantity:1+'Acre'},
  {name: 'Drip Irrigation',price:35000, quantity:1+'Acre'},
  {name: 'Surface Irrigation',price:35000, quantity:1+'Acre'},
];

function HTMLseedProduct(con) {
let URL = `img/seeds/Seed${con}.jpeg`;
let btn = `btnSeed${con}`;
return `
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
      <div class="card-body">
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <p class="card-text">${SEED[con-1].name}</p>
          <p class="card-text">Quantity: ${SEED[con-1].quantity}</p>
          <p class="card-text">Price: ₹${SEED[con-1].price}.00</p>
          <div class="d-flex justify-content-between align-items-center>
            <div class="btn-group">
              <button type="button" onClick="cart2('${SEED[con-1].name}','${SEED[con-1].quantity}','${SEED[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a href="cart.html" style="color:inherit;">Buy</a></button>
              <button id="${btn}"type="button" onClick="cart('${SEED[con-1].name}','${SEED[con-1].quantity}','${SEED[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to Cart</button>
            </div>
            <small class="text-muted">Free shipping </small>
        </div>
      </div>
    </div>
  </div>
`
}

function HTMLfertilizerProduct(con) {
let URL = `img/fertilizers/Fertilizer${con}.jpeg`;
let btn = `btnfertilizer${con}`;
return `
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
      <div class="card-body">
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <p class="card-text">${FERTILIZER[con-1].name}</p>
          <p class="card-text">Quantity: ${FERTILIZER[con-1].quantity}</p>
          <p class="card-text">Price: ₹${FERTILIZER[con-1].price}.00</p>
          <div class="d-flex justify-content-between align-items-center>
            <div class="btn-group">
              <button type="button" onClick="cart2('${FERTILIZER[con-1].name}','${FERTILIZER[con-1].quantity}','${FERTILIZER[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a href="cart.html" style="color:inherit;">Buy</a></button>
              <button id="${btn}"type="button" onClick="cart('${FERTILIZER[con-1].name}','${FERTILIZER[con-1].quantity}','${FERTILIZER[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to Cart</button>
            </div>
            <small class="text-muted">Free shipping </small>
        </div>
      </div>
    </div>
  </div>
`
}

function HTMLirrigationProduct(con) {
let URL = `img/irrigations/Irrigation${con}.jpeg`;
let btn = `btnirrigation${con}`;
return `
  <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <img class="card-img-top" style="height:16rem;" src="${URL}" alt="Card image cap">
      <div class="card-body">
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <i style="color:orange;" class="fa fa-star"></i>
          <p class="card-text">${IRRIGATION[con-1].name}</p>
          <p class="card-text">Quantity: ${IRRIGATION[con-1].quantity}</p>
          <p class="card-text">Price: ₹${IRRIGATION[con-1].price}.00</p>
          <div class="d-flex justify-content-between align-items-center>
            <div class="btn-group">
              <button type="button" onClick="cart2('${IRRIGATION[con-1].name}','${IRRIGATION[con-1].quantity}','${IRRIGATION[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" ><a href="cart.html" style="color:inherit;">Buy</a></button>
              <button id="${btn}"type="button" onClick="cart('${IRRIGATION[con-1].name}','${IRRIGATION[con-1].quantity}','${IRRIGATION[con-1].price}','${URL}','${con}','${btn}')" class="btn btn-sm btn-outline-secondary" >Add to Cart</button>
            </div>
            <small class="text-muted">Free shipping </small>
        </div>
      </div>
    </div>
  </div>
`
}

function animation() {
const toast=swal.mixin({
  toast:true,
  position:'middle',
  showConfirmButton:false,
  timer:1000
});
toast({
  type:'success',
  title: 'Added to shopping cart'
});
}

function cart(name,quantity, price, url, con, btncart) {
var item={
  name:name,
  price:price,
  quantity:quantity,
  url:url
}
cartItems.push(item);
let storage= JSON.parse(localStorage.getItem("cart"));
if (storage==null) {
  product.push(item);
  localStorage.setItem("cart", JSON.stringify(product));
}
else {
  products= JSON.parse(localStorage.getItem("cart"));
  products.push(item);
  localStorage.setItem("cart",JSON.stringify(products));
  
}
products= JSON.parse(localStorage.getItem("cart"));
cart_n.innerHTML=`[${products.length}]`;
document.getElementById(btncart).style.display="none";
animation();
}
function cart2(name, quantity, price, url, con, btncart) {
  var item={
    name:name,
    quantity:quantity,
    price:price,
    url:url
  }

  cartItems.push(item);

  let storage= JSON.parse(localStorage.getItem("cart"));
  if (storage==null) {
    product.push(item);
    localStorage.setItem("cart", JSON.stringify(product));
  }
  else {
    products= JSON.parse(localStorage.getItem("cart"));
    products.push(item);
    localStorage.setItem("cart",JSON.stringify(products));
  }
  products= JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML=`[${products.length}]`;
  document.getElementById(btncart).style.display="none";
}

function render() {
for (let index = 1; index <= 3; index++) {
  seedDIV.innerHTML+=`${HTMLseedProduct(index)}`;
  irrigationDIV.innerHTML+=`${HTMLirrigationProduct(index)}`;
}
for (let index = 1; index <= 6; index++) {
  fertilizerDIV.innerHTML+=`${HTMLfertilizerProduct(index)}`;
}
if (localStorage.getItem("cart")==null) {

}
else {
  products=JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML=`[${products.length}]`;
}
}