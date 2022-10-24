const express = require('express');
const app = express(); 
const path = require('path');
const initDb = require('./libs/db-connetion');
const tiendas = require('./model/tiendas');
const productos = require('./model/productos');
const productoCarrito = require('./model/productoCarrito');
const orden = require('./model/orden');
const ordenDatos = require('./model/ordenDatos');
const axios = require('axios');
var bodyParser = require('body-parser');
const { abort } = require('process');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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
        product_id: product.product_id
    }); 

    await productCarrito.save();
    
    res.redirect('/carrito' );
    
});

app.get('/carrito', async (req, res) => {

    const cartProducts = await productoCarrito.find({}); 
    
    
    res.render('carrito-de-compras', { products: cartProducts }); 

});

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id;

    await productoCarrito.findByIdAndDelete({ _id: id });

    res.redirect('/carrito' );

});


app.get('/checkout', async(req, res) => {

    const cartProducts = await productoCarrito.find({}); 
    let preciototal = 0
    
    for (let i= 0; i < cartProducts.length; i++){
        preciototal = preciototal + cartProducts[i].price;
        console.log(i, "precio:", cartProducts[i].price)
    }

    console.log("preciototal: ", preciototal)
	res.render('checkout', {cartProducts, preciototal});
});

app.get('/orden/:id', async(req, res) => {
    const id = req.params.id;

    const ordenes = await ordenDatos.findOne({ _id: id });

    res.render('orden', {ordenes});
});


app.post('/orden', async (req, res) => {
    console.log('req.body', req.body)
    let body = req.body;


    const cartProducts = await productoCarrito.find({}); 
    let preciototal = 0
    
    for (let i= 0; i < cartProducts.length; i++){
        preciototal = preciototal + cartProducts[i].price;
    }

    const datos = new ordenDatos({
        cliente: body.cliente,
        direccion: body.direccion,
        nota: body.nota,
        telefono: body.telefono,
        preciototal: preciototal,
        cartProducts: cartProducts,
        date: Date(),
        metodoDePago: "pagoMovil"
    }); 

    const order = await datos.save();


    res.json(order)
});


const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
	console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
})

initDb();



