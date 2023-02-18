const express = require("express");
const routerProducts = require('./routes/product.routes');
const routerCart = require('./routes/carts.routes');
const app = express();

app.use("/static", express.static(`${__dirname}/public`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', routerProducts);
app.use('/api/carts', routerCart);


const PORT = 8082;
app.listen(PORT, () => {
    console.log("escuchando al puerto")
});