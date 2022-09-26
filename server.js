const express = require('express');
const app = express(); 
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res) => {
	res.render('index', {
        name: "BRIS"
    });
});

app.get('/tiendas', (req, res) => {
    const stores = [
        {
            id: 'jumbo',
            name: 'Jumbo',
            logo: 'https://s.cornershopapp.com/store-logo/light_img_file_logo_92ec419e-bc43-413d-a4e4-c0707565dda6.png?versionId=TrYFX.n71wxRD.OfqoV4wkyKxtFSc7h2',
            deliveryTime: 'En 90 minutos',
            color: 'rgb(7, 147, 62)',
        },
        {
            id: 'spid',
            name: 'Spid',
            logo: 'https://s.cornershopapp.com/store-logo/light_img_file_logo_06ed71f9-2789-4ca4-ad86-62f1550c5133.png?versionId=2_pwaBWDd0OhqfozizUnHe57Rkff9Vqf',
            deliveryTime: 'En 90 minutos',
            color: 'rgb(232, 48, 138)',
        },
        {
            id: 'alkosto',
            name: 'SUPER Alkosto',
            logo: 'https://s.cornershopapp.com/store-logo/logo.png?versionId=iIhpgk1J6JR5NpwPOQfyUc1ajYWZeBfx',
            deliveryTime: 'En 90 minutos',
            color: 'rgb(240, 92, 36)',
        }
    ]

	res.render('listado-tiendas', { stores });
});

app.get('/tiendas/:name', (req, res) => {
    const name = req.params.name;

    let store = {
        id: 'jumbo',
        name: 'Jumbo',
        products: [
            {
                id: 'bananas',
                name: 'Bananas',
                image: 'https://s.cornershopapp.com/product-images/1111602.jpe?versionId=CqCXpLFuPgpp1s9pXKwwrWIXCaNXr5yS',
                price: '1$',
                unitDescription: 'Precio por kg',
                unit: 'Unidad: 500gr aprox',
            },
            {
                id: 'tomate',
                name: 'Jumbo - Tomate chonto',
                image: 'https://s.cornershopapp.com/product-images/1111674.jpg?versionId=3EZvnU4z5YvQlwYEi.pL2HlE8zH4lygy',
                price: '1.5$',
                unitDescription: 'Precio por kg',
                unit: 'Unidad: 300gr aprox',
            },
            {
                id: 'cebolla',
                name: 'Cebolla cabezona',
                image: 'https://s.cornershopapp.com/product-images/1111787.jpg?versionId=N.zb97lxOQZJ5OtMM9ECVSpmFBcBtHoG',
                price: '1.8$',
                unitDescription: 'Precio por kg',
                unit: 'Unidad: 240gr aprox',
            },
        ],
    };
    
    if (name === 'spid') {
        store = {
            id: 'spid',
            name: 'Spid',
            products: [
                {
                    id: 'vainilla',
                    name: 'Levapan - Esencia sabor a vainilla caramelo',
                    price: '3$',
                    image: 'https://s.cornershopapp.com/product-images/6198689.jpg?versionId=VZ9lVBCHLaXYJgA3GP00_QA3w0RZu7vz',
                    unit: 'Botella 60 ml',
                },
                {
                    id: 'nescafe',
                    name: 'Nescafe - Cafe descafeinado',
                    image: 'https://s.cornershopapp.com/product-images/1061964.jpg?versionId=Tm3NHkQQQEPye8.wYGei1DR9ObBZQEGB',
                    price: '6$',
                    unit: 'Frasco de 100 g',
                },
                {
                    id: 'maruchan',
                    name: 'Maruchan - Sopa de res',
                    image: 'https://s.cornershopapp.com/product-images/1060734.jpg?versionId=.rjLlOi_0aIjhRjIDZ9GMcTU.0I.JKWT',
                    price: '2$',
                    unit: 'Carton de 64 g',
                },
            ],
        };
    }

    if (name === 'alkosto') {
        store = {
            id: 'alkosto',
            name: 'SUPER Alkosto',
            products: [
                {
                    id: 'producto-1',
                    name: 'Alkosto producto 1',
                    price: '3$',
                    image: 'https://s.cornershopapp.com/product-images/6198689.jpg?versionId=VZ9lVBCHLaXYJgA3GP00_QA3w0RZu7vz',
                    unit: 'Botella 60 ml',
                },
            ],
        };
    }

	res.render('tienda', store);
});

app.get('/tiendas/:store/:product', (req, res) => {
    const storeId = req.params.store;
    const productId = req.params.product;

    let producto = {
        name: 'Bananas',
        image: 'https://s.cornershopapp.com/product-images/1111602.jpe?versionId=CqCXpLFuPgpp1s9pXKwwrWIXCaNXr5yS',
        price: '1$',
        unitDescription: 'Precio por kg',
        unit: 'Unidad: 500gr aprox',
    }

    if (productId === 'vainilla') {
        producto = {
            name: 'Vainilla',
            image: 'https://s.cornershopapp.com/product-images/6198689.jpg?versionId=VZ9lVBCHLaXYJgA3GP00_QA3w0RZu7vz',
            price: '3$',
            unitDescription: 'Precio por ml',
            unit: 'Botella 60 ml',
        }
    }
    
    if (productId === 'nescafe') {
        producto = {
            name: 'Nescafe',
            image: 'https://s.cornershopapp.com/product-images/1061964.jpg?versionId=Tm3NHkQQQEPye8.wYGei1DR9ObBZQEGB',
            price: '6$',
            unitDescription: 'Precio por kg',
            unit: 'Frasco de 100 g',
        }
    }

    if (productId === 'maruchan') {
        producto = {
            name: 'Marucgan - sopa de res',
            image: 'https://s.cornershopapp.com/product-images/1060734.jpg?versionId=.rjLlOi_0aIjhRjIDZ9GMcTU.0I.JKWT',
            price: '2$',
            unitDescription: 'Precio por kg',
            unit: 'Carton de 64 g',
        }
    }

	res.render('producto', { producto, storeId });
});


const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
	console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
})