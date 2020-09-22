var products = [];
var carrito = [];

function labeltems(){

    var label = document.getElementById("labelItems")
    if(carrito){

        label.innerHTML = carrito.length + " items"

    }
    else{
        label.innerHTML = "0 items"
    }

}


async function cargarProductos(){
    request = await fetch("https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json");
    data = await request.json();
    products = data; 
    hamburguesas =  data[0].products;
    hacerCartas(hamburguesas);

}

function hacerCartas(array){
  var cardgroup = document.getElementById("card-group");
  console.log(array[0]);
  for(let i = 0; i < array.length; i++){
    obj = array[i];

    var div = document.createElement("DIV");
    div.classList.add("card");
    div.classList.add("card-style");

    var img = document.createElement("IMG");
    img.setAttribute("src",obj.image);
    img.setAttribute("alt","Foto del cliente tal"); 
    img.classList.add("img-card");
    img.classList.add("img-fluid");

    div.appendChild(img);

    var divcontent = document.createElement("DIV");
    divcontent.classList.add("card-body"); 

    var title = document.createElement("H5");
    title.classList.add("card-title");
    title.innerHTML=obj.name;

    var desc = document.createTextNode(obj.description);


    divcontent.appendChild(title);
    divcontent.appendChild(desc);


    div.appendChild(divcontent);

    cardgroup.appendChild(div);
  }

}



cargarProductos();
labeltems();