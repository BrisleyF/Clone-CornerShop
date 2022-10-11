const express = require('express');
const app = express(); 
const path = require('path');
const initDb = require('./libs/db-connetion');
const tiendas = require('./model/tiendas');
const productos = require('./model/productos');
const productoCarrito = require('./model/productoCarrito');
const carritoDeCompras = require('./model/carritoDeCompras');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res) => {
	res.render('index', {
        name: "BRIS"
    });
});

app.get('/tiendas', async (req, res) => {

    let stores =  await tiendas.find({});
    
    console.log('stores:', stores);
    res.render('listado-tiendas', { stores });

});

app.get('/tiendas/:name', async (req, res) => {
    const name = req.params.name;

    let valor = name;

    if (valor==="Jumbo") {
        stores = await productos.find({"storeId": "633227bdd20195cb5bfd2832"});
    } else if(valor==="Spid") {
        stores = await productos.find({"storeId": "633227bdd20195cb5bfd2833"});
    }else if(valor === "SUPER alkosto") {
        stores = await productos.find({"storeId": "633227bdd20195cb5bfd2834"});
    }

/*  switch (valor){
        case "Jumbo":
            stores = await productos.find({"storeId": "633227bdd20195cb5bfd2832"});
            break
        case "Spid":
            stores = await productos.find({"storeId": "633227bdd20195cb5bfd2833"});
            break
        case "SUPER alkosto": 
            stores = await productos.find({"storeId": "633227bdd20195cb5bfd2834"});
            break
        default:
            stores = await productos.find({});
            break
    } */

    console.log(stores);
	res.render('tienda', { stores , name });
});

app.get('/tiendas/:store/:product', async (req, res) => {
    const storeId = req.params.store;
    const productId = req.params.product;

    let valor = productId;
    
    if (valor === "6335accb7c6ac72334192fbb") {
        detalles = await productos.find({"_id": "6335accb7c6ac72334192fbb"});
        console.log('detalles:', detalles);
    } else if (valor === "6335accb7c6ac72334192fbc") {
        detalles = await productos.find({"_id": "6335accb7c6ac72334192fbc"});
        console.log('detalles:', detalles);
    } else if (valor === "6335accb7c6ac72334192fbd") {
        detalles = await productos.find({"_id": "6335accb7c6ac72334192fbd"});
        console.log('detalles:', detalles);
    } else if (valor === "6335accb7c6ac72334192fbe") {
        detalles = await productos.find({"_id": "6335accb7c6ac72334192fbe"});
        console.log('detalles:', detalles);
    } else if (valor === "6335accb7c6ac72334192fbf") {
        detalles = await productos.find({"_id": "6335accb7c6ac72334192fbf"});
        console.log('detalles:', detalles);
    } else if (valor === "6335accb7c6ac72334192fc0") {
        detalles = await productos.find({"_id": "6335accb7c6ac72334192fc0"});
        console.log('detallse:', detalles);
    } else if (valor === "6335accb7c6ac72334192fc1") {
        detalles = await productos.find({"_id": "6335accb7c6ac72334192fc1"});
        console.log('detalles:', detalles);
    } 

	res.render('producto', { detalles, storeId, productId });
});

app.get('/carrito/agregar/:id', async (req, res) => {
    const id = req.params.id;

    let product = await productos.findOne({ _id: id });
    // agregar al carrito
    const productCarrito = new productoCarrito({
        name: product.name,
        image: product.image,
        inCart: false,
        price: product.price,
        amount: 1,
    });
    await productCarrito.save();

    res.redirect('/carrito');
});

app.get('/carrito', async (req, res) => {
    const cartProducts = await productoCarrito.find({});
    
    res.render('carrito-de-compras', { products: cartProducts }); 
});

app.get('/checkout', async(req, res) => {

    
	res.render('checkout', {});
});





const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
	console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
})

initDb();



