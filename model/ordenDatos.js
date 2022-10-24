const mongoose = require('mongoose');

const ordenDatosSchema = new mongoose.Schema({
    cliente: String,
    direccion: String,
    nota: String,
    telefono: String,
    propina: Number,
    preciototal: String,
    cartProducts: Array,
    date: Date,
    metodoDePago: String
});

const ordenDatos = mongoose.model('ordenDatos', ordenDatosSchema); 
module.exports = ordenDatos;