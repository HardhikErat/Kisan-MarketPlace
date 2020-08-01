  var products=JSON.parse(localStorage.getItem('cart'));
  var cartItems=[];
  var cart_n = document.getElementById('cart_n');
  var table= document.getElementById("table");
  var total=0;

  function tableHTML(i) {
      return `
        <tr>
        <th scope="row">${i+1}</th>
        <td><img style="width:90px;" src="${products[i].url}"></td>
        <td>${products[i].name}</td>
        <td>${products[i].quantity}</td>
        <td>${products[i].price}</td>
        </tr>
      `;
  }

  function buy() {
      clean();
  }

  function clean() {
      localStorage.clear();
      for (let index = 0; index < products.length; index++) {
          table.innerHTML+=tableHTML(index);
          total=total+parseInt(products[index].price);
      }
      total=0;
      table.innerHTML=`
      <tr>
        <th ></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      `;
      cart_n.innerHTML='';
      document.getElementById("btnBuy").style.display="none";
      document.getElementById("btnClean").style.display="none";
  }

  function render(){
     for (let index = 0; index < products.length; index++) {
        table.innerHTML+=tableHTML(index);
        total=total+parseInt(products[index].price);
    }
    table.innerHTML+=`
    <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">Total: ₹${total}.00</th>
    </tr>
    <tr>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col"></th>
        <th scope="col">
            <button id="btnClean" onClick="clean()" class="btn text-white btn-warning">Clean Shopping Cart</button>
        </th>
        <th scope="col"><button id="btnBuy" onClick="buy()" class="btn btn-success"><a href="Arriving Order/index.html" style="color:inherit;">Proceed to Checkout</a></button></th>
    </tr>
  `;
  products=JSON.parse(localStorage.getItem("cart"));
  cart_n.innerHTML=`[${products.length}]`;
}