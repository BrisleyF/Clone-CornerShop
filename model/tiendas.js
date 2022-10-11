const mongoose = require('mongoose');

const tiendasSchema = new mongoose.Schema({
    name: String,
    logo: String,
    deliveryTime: String,
    color: String
});

const tiendas = mongoose.model('tiendas', tiendasSchema); 
module.exports = tiendas;