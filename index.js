


/* alert("Comprar"); */

function Produto(nombre,cantidad,precio){
    this.nombre = nombre
    this.cantidad = cantidad
    this.precio = precio
}
const producto1 = new Produto ("Posavasos",2,1600);
const producto2 = new Produto ("Bandeja",1,1800);
const producto3 = new Produto ("Soporte Celular",1,2000);
const totalBruto = ((producto1.cantidad*producto1.precio)+(producto2.cantidad+producto2.precio)+(producto3.cantidad*producto3.precio));

const carrito = [producto1,producto2,producto3];

alert("agregaste "+producto1.nombre+" por un total de "+producto1.cantidad * producto1.precio);
alert("agregaste "+producto2.nombre+" por un total de "+producto2.cantidad * producto2.precio);
alert("agregaste "+producto3.nombre+" por un total de "+producto3.cantidad * producto3.precio);
alert("tu total es de "+ totalBruto);

let suma = (a,b) => a + b;
let iva = x => x * 0.21;
let precioProducto =totalBruto;
let nuevoPrecio = suma(precioProducto, iva(precioProducto));

if (nuevoPrecio > 3800) {
    alert("el total es" +" " +nuevoPrecio);
    alert("3 cuotas sin interes disponibles por tu compra mayor a 3800 :D" )
    cuotasSinInt = (nuevoPrecio / 3);
    alert("3 cuotas sin interes de " +" "+ cuotasSinInt );
} else {
    alert("cuotas sin interes solo disponibles en compras superior a $ 3800")
    alert("el total es" +" " +nuevoPrecio)
}

