
//Variables - Globales
let template = ``;
let html = '';
let articulosCarrito = [];
const btn = $('.comprar-btn');
const productosContainer = $('#productos');
const contenedorCarrito = document.querySelector('#carrito-view');
const itemProducto = $('#item-producto');
const listaCarrito = $('#lista-carrito');
const vaciarCarritoBtn = $('#vaciar-carrito');



//Variables - Objetos 
const ProductoUno = {id:1, nombre: "JIGGLYPUFF PINK", precio: 1800, imagen:'01.jpg'};
const ProductoDos = {id:2, nombre: "SCYTHER GREEN ", precio: 2000, imagen:'02.jpg'};
const ProductoTres = {id:3, nombre: "GASTLY PURPLE", precio: 2200, imagen:'03.jpg'};
const ProductoCuatro = {id:4, nombre: "DARK ALAKAZAM PURPLE", precio: 2500, imagen:'04.jpg'};
const ProductoCinco = {id:5, nombre: "ALOLAN VULPIX GREEN/BLUE", precio: 1700, imagen:'05.jpg'};
const ProductoSeis = {id:6, nombre: "MEOWTH WHITE", precio: 2000, imagen:'06.jpg'};
const ProductoSiete = {id:7, nombre: "GROWLITHE RED", precio: 1900, imagen:'07.jpg'};
const ProductoOcho = {id:8, nombre: "HOUNDOUR BLACK ", precio: 2200, imagen:'08.jpg'};
const ProductoNueve = {id:9, nombre: "ELECTABUZZ YELLOW", precio: 2000, imagen:'09.jpg'};
const ProductoDiez = {id:10, nombre: "GALARIAN OBSTAGOON BLACK ", precio: 2500, imagen:'10.jpg'};
const ProductoOnce = {id:11, nombre: "PSYDUCK BLUE", precio: 1800, imagen:'11.jpg'};
const ProductoDoce = {id:12, nombre: "EEVEE 3D TRANSPARENT", precio: 2700, imagen:'12.jpg'};


//Variables - Arrays
const BaseDeDatosProductos = [ProductoUno, ProductoDos, ProductoTres, ProductoCuatro, ProductoCinco, ProductoSeis, ProductoSiete, ProductoOcho, ProductoNueve, ProductoDiez, ProductoOnce, ProductoDoce];


//Ciclo for - Template html 
for (let i = 0; i < BaseDeDatosProductos.length; i++) {
    template += `
    <div class="col-xs-12 col-md-6 col-xl-4 id="item-producto">
        <div class="item" id="item">
            <h2 class="item-title" id="nombre">${BaseDeDatosProductos[i].nombre}</h2> 
            <p class="pesos">$</p><p class="precio" id="precio">${BaseDeDatosProductos[i].precio}</p>
            <img id="img "src="./img/productos/${BaseDeDatosProductos[i].imagen}" alt="" class="item-img">
            <button id="comprar-btn" class="comprar-btn" data-id="${BaseDeDatosProductos[i].id}">AGREGAR</button>
        </div> 
    </div>`;
} 

//Imprimir cards en el html
$('#productos').html(template);



/** -- EVENTOS -- **/
cargarEventListeners(); 

function cargarEventListeners () {
    //Agrega Productos
    $('#productos').click(agregarProducto);

    //Elimina productos del carrito
    $('#lista-carrito').click(eliminarProducto);

    //Vaciar el carrito
    $('#vaciar-carrito').click(vaciarCarrito);
    
    //Muestra los productos de LocalStorage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    }); 
}


/** -- FUNCIONES -- **/

//Agregar productos
function agregarProducto (e) {
    if(e.target.classList.contains('comprar-btn')) {
        const productoSeleccionado = e.target.parentElement.parentElement
        leerDatosProductos(productoSeleccionado);
    } 
}


//Eliminar un producto del carrito 
function eliminarProducto (e) {
    if(e.target.classList.contains('borrarItemBtn')){
        const productoId = e.target.getAttribute('data-id')

        //Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        
        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
        
    }
}


//Vaciar Carrito
function vaciarCarrito () {
    articulosCarrito = []; //reseteo el arreglo
    limpiarHTML(); // elimina todo el html
    total(); //Vuelve el total a 0
    carritoHTML();
}


//Leer datos del HTML de cada producto
function leerDatosProductos (producto) {
    
    //Crear un objeto con el contenido del producto
    const item = {
        id: producto.querySelector('#comprar-btn').getAttribute('data-id'),
        nombre: producto.querySelector('#nombre').textContent,
        precio: producto.querySelector('#precio').textContent,
        totalPrecio: parseInt(producto.querySelector('#precio').textContent),
        imagen: producto.querySelector('img').src,
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some (producto => producto.id === item.id);
    if (existe) {
        //Actualiza cantidad
        const productos = articulosCarrito.map(producto  => {
            if(producto.id === item.id){
                producto.cantidad++;
                producto.totalPrecio = item.totalPrecio += producto.totalPrecio; //Precio total del producto en particular
                return producto; //Retorna el objeto actualizado
            } else {
                return producto; //Retorna los objetos no duplicados
            }
        });
        articulosCarrito = [...productos]
    } else {
       //Agrega elementos al arreglo de carrito 
        articulosCarrito = [...articulosCarrito, item];
    }

    carritoHTML();
}


// Imprimir carrito en el HTML
function carritoHTML (){

    //Limpiar HTML 
    limpiarHTML ();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( item => {
        const row = document.createElement('tr');
        row.classList.add('itemPrd')
        row.innerHTML = `
        <td class="col-xs-2"><img src="${item.imagen}" class="img-carrito" height="100px" alt=""></td>
        <td class="col-xs-2">${item.nombre}</td>
        <td class="col-xs-2 itemPrecio">$${item.precio}</td>
        <td class="col-xs-2 itemCantidad">${item.cantidad}</td>
        <td class="col-xs-2">$${item.totalPrecio}</td>
        <td class="col-xs-2"><i data-id= "${item.id}" class=" borrarItemBtn fas fa-trash-alt"></i></td>
    
    `;
        contenedorCarrito.appendChild(row);
    }) 

    //Agregar el carrito de compras al Storage
    sincronizarStorage();
    
    carroNumero ();
    total();
}


//Sincronizar con Storage
function sincronizarStorage () {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}


//Elimina los productos del tbody 
function limpiarHTML () {
    contenedorCarrito.innerHTML = '';
}


//Precio total
function total () {
    let total = 0;
    const carroTotal = document.querySelector('.precioView h2');
    const itemPrd = document.querySelectorAll('.itemPrd');
    itemPrd.forEach(prdItem => {
        const itemPrecio = prdItem.querySelector('.itemPrecio');
        const itemPrecioText = Number(itemPrecio.textContent.replace('$', ''));
        const itemCantidad = prdItem.querySelector('.itemCantidad');
        const itemCantidadValor = Number(itemCantidad.textContent);
        
        total = total + itemPrecioText * itemCantidadValor
    });

    carroTotal.innerHTML = total
}



//Cambiar ícono carrito 
function carroNumero (){
    let carroNumeros = 0;
    let carritoItem = JSON.parse(localStorage.getItem('carrito'));
    carritoItem.forEach(item => {
        carroNumeros = item.cantidad += carroNumeros;
    });
    document.querySelector('.carrito-icono span').textContent = carroNumeros;
}

carroNumero ();







