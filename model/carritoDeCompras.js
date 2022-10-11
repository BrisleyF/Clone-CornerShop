const mongoose = require('mongoose'); 

const carritoSchema = new mongoose.Schema({
    
    name: { type: String, required: true, unique: true },
    img: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },

});

const carritoDeCompras = mongoose.model('carritoDeCompras', carritoSchema); 
module.exports = carritoDeCompras;