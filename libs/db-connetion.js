const mongoose = require('mongoose');

let db;

module.exports = function Connection() {
    if(!db) {
        db = mongoose.connect('mongodb://localhost:27017/cornershop');
        console.log('se inicio la base de datos');
    }

    return db; 
}