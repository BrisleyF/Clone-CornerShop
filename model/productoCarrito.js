const mongoose = require('mongoose'); 

const productoCarritoSchema = new mongoose.Schema({
    
    product_id: {type: String},
    name: { type: String, required: true },
    image: { type: String, required: true },
    inCart: { type: Boolean, default: false },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const productoCarrito = mongoose.model('productoCarrito', productoCarritoSchema); 
module.exports = productoCarrito;