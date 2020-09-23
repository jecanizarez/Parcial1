//Arreglo para almacenar los productos
var products = [];
//Arreglo para guardar los productos del carrito
var carrito = [];

//Funcion para actualizar el label de items del navbar
function labeltems(){

    var label = document.getElementById("labelItems")
    items = 0
    if(carrito){

        
        for(let i = 0; i<carrito.length; i++){
            items += carrito[i].cant;
        }
        label.innerHTML = items + " items";
    }
    else{
        label.innerHTML = "0 items"
    }

}

//Funcion para cargar los productos y armar todas las cards para cada tipo de producto
async function cargarProductos(){
    request = await fetch("https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json");
    data = await request.json();
    products = data;

    for(let i = 1; i < data.length; i++){
        var obj = document.getElementById("card-group-"+data[i].name);
        obj.style.display = "none";
    }

    var divcarrito = document.getElementById("divCarrito");
    divcarrito.style.display = "none";

    totalDiv = document.getElementById("total");
    totalDiv.style.display = "none";

    hacerCartas(data[0].products,data[0].name);
    hacerCartas(data[1].products,data[1].name);
    hacerCartas(data[2].products,data[2].name);
    hacerCartas(data[3].products,data[3].name);
    hacerCartas(data[4].products,data[4].name);
}
//Funcion para definir las cards segun arreglo y nombre recibidos por parametro
function hacerCartas(array,name){
  var cardgroup = document.getElementById("card-group-"+name);
  for(let i = 0; i < array.length; i++){
    obj = array[i];
    //Creo el div y le asigno las clases
    var div = document.createElement("DIV");
    div.classList.add("card");
    div.classList.add("col-12");
    div.classList.add("col-md-4");
    div.classList.add("col-sm-6");
    div.classList.add("card-style");

    //Creo la imagen le asigno las caracteristicas y clases
    var img = document.createElement("IMG");
    img.setAttribute("src",obj.image);
    img.setAttribute("alt","Foto de hamburguesa tal"); 
    img.classList.add("img-card");
    img.classList.add("card-img-top");
    //Agrego la imagen la div
    div.appendChild(img);
    //Creo el div para el contenido del card
    var divcontent = document.createElement("DIV");
    divcontent.classList.add("card-body");
    divcontent.classList.add("container-fluid");
    //Creo el titulo del card
    var title = document.createElement("H5");
    title.classList.add("card-title");
    title.innerHTML=obj.name;
    //Creo el p y su contenido para la descripcion
    var p = document.createElement("P");
    var desc = document.createTextNode(obj.description);
    p.appendChild(desc);
    //Creo el p para el precio le asigno la clase bold y añado su contenido
    var pPrecio = document.createElement("P");
    pPrecio.classList.add("bold");
    var precio = document.createTextNode("$"+obj.price)
    pPrecio.appendChild(precio);
    //Creo el boton para añadir al carrito
    var boton = document.createElement("BUTTON");
    var addtoCart = document.createTextNode("Add to Cart");
    boton.classList.add("btn");
    boton.classList.add("btn-dark");
    boton.setAttribute("onclick",'addCarrito("'+obj.name+'",'+'"'+obj.price+'")');
    boton.appendChild(addtoCart);
    //Agrego el titulo, la descripcion, el precio y el boton al div del contenido de la card
    divcontent.appendChild(title);
    divcontent.appendChild(p);
    divcontent.appendChild(pPrecio);
    divcontent.appendChild(boton);
    //agrego el div del contenido de la card a la card
    div.appendChild(divcontent);
    //Agrego al card al cardgroup
    cardgroup.appendChild(div);
  }
}
//Metodo para añadir al carrito
function addCarrito(nombre,precio){
    for(let i = 0; i < carrito.length; i++){
        if(nombre == carrito[i].nombre)
        {
            carrito[i].cant += 1;
            labeltems();
            return;
        }
    }   
    obj = {cant:1, nombre:nombre, precio:precio};
    carrito.push(obj);
    labeltems();
}
//Metodo para mostrar una sección de la barra de navegación
function mostrarContenido(number){
    //Oculto todas las secciones
    for(let i = 0; i < products.length; i++){
        var obj = document.getElementById("card-group-"+products[i].name);
        obj.style.display = "none";
    }
    //Muestro la seccion y cambio el titulo
    var div = document.getElementById("card-group-"+products[number].name);
    div.style.display = "flex";
    document.getElementById("titleProduct").innerText=products[number].name;

   //Borro la tabla en caso de que este saliendo del carrito de compras
    eliminarTabla();
    divCarrito = document.getElementById("divCarrito");
    divCarrito.style.display = "none";
    totalDiv = document.getElementById("total");
    totalDiv.style.display = "none";
}
//Funcion para ocultar todas las secciones de productos
function ocultarContenido(){
    for(let i = 0; i < products.length; i++){
        var obj = document.getElementById("card-group-"+products[i].name);
        obj.style.display = "none";
    }
}
//funcion para eliminar la tabla
function eliminarTabla(){
    tablebody = document.getElementById("tablebody");
    tablebody.innerHTML = "";

}
//funcion para cancelar la orden
function cancelOrder(){
    carrito = [];
    mostrarContenido(0);
    labeltems();
}
//funcion para confirmar una orden
function mostrarOrden(){
    tablebody = document.getElementById("tablebody");
    total = 0;
    if(tablebody.childNodes.length != carrito.length)
    {
        for(let i = 0; i < carrito.length; i++){
            obj = carrito[i];
            fila = tablebody.insertRow(i);
            item = fila.insertCell(0);
            qty = fila.insertCell(1);
            description = fila.insertCell(2);
            price = fila.insertCell(3);
            amount = fila.insertCell(4);
            item.innerHTML = i+1;
            qty.innerHTML = obj.cant;
            description.innerHTML = obj.nombre;
            price.innerHTML = "$"+obj.precio
            amount.innerHTML = "$"+obj.cant * obj.precio;
            total += obj.cant * obj.precio;
        } 

        totalP = document.getElementById("totalp");
        totalP.innerText ="Total: $"+total;
    }
    totalP = document.getElementById("totalp");
    totalP.innerText ="Total: $"+total;
    
    ocultarContenido();
    title = document.getElementById("titleProduct");
    title.innerText="Order";

    totalDiv = document.getElementById("total");
    totalDiv.style.display = "flex";

    divCarrito = document.getElementById("divCarrito");
    divCarrito.style.display = "flex";
}
//Funcion para confirmar una orden
function confirmOrder(){
    console.log(carrito);
}

cargarProductos();
labeltems();