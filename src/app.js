const express = require("express");
const handlebars = require('express-handlebars');
const path = require("path");
const routerProducts = require('./routes/product.routes');
const routerCart = require('./routes/carts.routes');
const { Server } = require('socket.io');
const ManagerProduct = require('./productManager');

const app = express();
const PORT = 8082;

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const socketServer = new Server(httpServer);
const managerProduct = new ManagerProduct('src/db/products.json');

// app.use("/static", express.static(`${__dirname}/public`)); (antes)
app.use(express.static(__dirname + '/public'));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCart);

app.get('/realtimeproducts', async (req, res) => res.status(200).render('realTimeProducts'));

socketServer.on('connection', async socket => {
	console.log('Nuevo cliente conectado');

	const products = await managerProduct.getProducts();
	socket.emit('products', products);

	socket.on('addProd', async prod => await managerProduct.addProduct(prod));

	socket.on('delProd', async id => await managerProduct.deleteProduct(id));
});