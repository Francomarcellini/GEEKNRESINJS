


alert("Comprar");

let suma = (a,b) => a + b;
let iva = x => x * 0.21;
let precioProducto =parseInt(prompt("precio"));
let nuevoPrecio = suma(precioProducto, iva(precioProducto));

if (nuevoPrecio > 1800) {
    alert("el total es" +" " +nuevoPrecio);
    alert("3 cuotas sin interes disponibles por tu compra mayor a 1800 :D" )
    cuotasSinInt = (nuevoPrecio / 3);
    alert("3 cuotas sin interes de " +" "+ cuotasSinInt );
} else {
    alert("cuotas sin interes solo disponibles en compras superior a $ 1800")
    alert("el total es" +" " +nuevoPrecio)
}

