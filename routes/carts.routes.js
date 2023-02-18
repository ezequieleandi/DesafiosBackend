const { Router } = require("express");
const router = Router();
const path = require("path");
const CartManager = require("../cartManager");
const rutaBase = path.join(`db/cart.json`);
const Manager = new CartManager(rutaBase);

router.post('/', async (req, res) => {
	const pp = await Manager.addCart();
    console.log(pp)
	res.status(200).json({ mensaje: 'Carrito agregado correctamente' });
});

router.get('/:id', async (req, res) => {
	const products = await Manager.getProdsByCartId(Number(req.params.id));
    console.log(products)
	if (!products) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
	res.status(200).json({ products });
});

router.post('/:cid/product/:pid', async (req, res) => {
	await Manager.addProdToCart(Number(req.params.cid), Number(req.params.pid));
	res.status(200).json({ mensaje: 'Producto agregado correctamente' });
});

module.exports = router;