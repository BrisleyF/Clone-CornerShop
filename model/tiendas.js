const mongoose = require('mongoose');

const tiendasSchema = new mongoose.Schema({
    name: String,
    logo: String,
    deliveryTime: String,
    color: String
});

module.exports = mongoose.model('tiendas', tiendasSchema); 