const mongoose = require('mongoose'); 

const productosSchema = new mongoose.Schema({
    
    storeId: String,
    product_id: String,
    name: String,
    image: String,
    price: Number,
    unitDescription: String,
    unit: String

});

const productos = mongoose.model('productos', productosSchema); 
module.exports = productos;