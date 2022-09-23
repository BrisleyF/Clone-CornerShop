const express = require('express');
const app = express(); 

// Routing
app.get('/', (req, res) => {
	res.send('Mi primer servidor con express')
});

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
	console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
})