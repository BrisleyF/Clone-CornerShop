const mongoose = require('mongoose'); 

const productosSchema = new mongoose.Schema({
    
    storeId: String,
    name: String,
    image: String,
    price: String,
    unitDescription: String,
    unit: String

});

const productos = mongoose.model('productos', productosSchema); 
module.exports = productos;