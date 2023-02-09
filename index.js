const path = require("path");
const ManagerProduct = require("./managerProducts");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const rutaBase = path.join(`${__dirname}/db.json`);
const Manager = new ManagerProduct(rutaBase);

app.get('/products', async (req, res) => {
    const limit = Number(req.query.limit)
    const listaProducts = await Manager.getProducts();
    if (limit <= listaProducts.length) {
        return res.json(listaProducts.slice(0, limit))
    } else if(limit > (listaProducts.length - 1)) {
        return res.json({
            mensaje: "No existe esa cantidad de productos",
        })
    }else{
        return res.json({
            mensaje: "Lista de productos",
            productos: listaProducts
        })
    }
})
app.get('/productos/:id', async (req, res) => {
	const id = Number(req.params.id);
	const product = await Manager.getProductById(id);
    if(!product){
        return res.json({ mensaje: 'Producto no encontrado. Corrobore el dato ingresado' });
    }else{
        res.json({producto: product});
    }
});

const PORT = 8082;
app.listen(PORT, () => {
    console.log("escuchando al puerto")
});