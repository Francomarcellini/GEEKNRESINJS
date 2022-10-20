let precioPosavaso = 1900;
let buyGrid = document.getElementById("itemsCompra");
let carritoDeCompras = document.getElementById("carritoDeCompras");
let productos = [
    {
        id: 1,nombre: "Posa vaso Jigglypuf",precio : precioPosavaso,imagen :"/resources/A1.jpg",
    },
    {
        id: 2,nombre: "Posa vaso Scyther",precio : precioPosavaso,imagen :"/resources/B1.jpg",
    },
    {
        id: 3,nombre: "Posa vaso Gastly",precio : precioPosavaso,imagen :"/resources/C1.jpg",
    },
    {
        id: 4,nombre: "Posa vaso Alakazam",precio : precioPosavaso,imagen :"/resources/D1.jpg",
    },
    {
        id: 5,nombre: "Posa vaso Vulpix",precio : precioPosavaso,imagen :"/resources/f1.jpg",
    },
    {
        id: 6,nombre: "Posa vaso Meowth",precio : precioPosavaso,imagen :"/resources/G1.jpg",
    },
    {
        id: 7,nombre: "Posa vaso Growlithe",precio : precioPosavaso,imagen :"/resources/I1.jpg",
    },
    {
        id: 8,nombre: "Posa vaso Houndour",precio : precioPosavaso,imagen :"/resources/K1.jpg",
    },
    {
        id: 9,nombre: "Posa vaso Jigglypuff",precio : precioPosavaso,imagen :"/resources/A1.jpg",
    },
    {
        id: 10,nombre: "Posa vaso Electabuzz",precio : precioPosavaso,imagen :"/resources/L1.jpg",
    },
];
let carrito = []
productos.forEach(productos=>{
    let items = document.createElement("div")
    items.innerHTML=`<div class="card" style="width: 18rem;">
    <img src=${productos.imagen} class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${productos.nombre}</h5>
        <h5 class="card-title">$${productos.precio}</h5>
        <button id=${productos.id} href="#" class="btn btn-primary">COMPRAR</button>
        <button id="borrarProducto${productos.id}" href="#" class="btn btn-primary">ELIMINAR</button>
    </div>
    </div>`
    buyGrid.append(items);
    const button =document.getElementById(productos.id)
    const borrarButton =document.getElementById(`borrarProducto${productos.id}`)
    borrarButton.addEventListener("click", () => quitarCarrito(productos))
    button.addEventListener("click", () => agregarCarrito(productos))
})

const agregarCarrito = (productos) => {
    carrito.push(productos) 
}
const quitarCarrito = (productos) => {
    carrito.shift(productos)
}
carritoDeCompras.addEventListener("click", () => console.log(carrito));
carritoDeCompras.addEventListener("click", () => localStorage.setItem("carrito",JSON.stringify(carrito)));


