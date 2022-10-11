const mongoose = require('mongoose'); 

const productoCarritoSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    image: { type: String, required: true },
    inCart: { type: Boolean, default: false },
    price: { type: String, required: true },
    amount: { type: String, required: true },
});

const productoCarrito = mongoose.model('productoCarrito', productoCarritoSchema); 
module.exports = productoCarrito;