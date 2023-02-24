const { Router } = require("express");
const router = Router();
const path = require("path");
const ManagerProduct = require("../productManager");
const rutaBase = path.join(`db/products.json`);
const Manager = new ManagerProduct(rutaBase);
// const { uploader } = require("../utils");

router.get('/', async (req, res) => {
    const limit = Number(req.query.limit)
    const listaProducts = await Manager.getProducts();
    if (limit <= listaProducts.length) {
        return res.json(listaProducts.slice(0, limit))
    } else if(limit > (listaProducts.length - 1)) {
        return res.json({
            mensaje: "No existe esa cantidad de productos",
        })
    }else{
        console.log(listaProducts)
        res.status(200).render('home', { listaProducts });
    }
})
router.get('/:id', async (req, res) => {
	const id = Number(req.params.id);
	const product = await Manager.getProductById(id);
    if(!product){
        return res.json({ mensaje: 'Producto no encontrado. Corrobore el dato ingresado' });
    }else{
        res.json({producto: product});
    }
});
//para agregar ruta de imagenes: uploader.single("thumbnail")
router.post('/', async (req, res) =>{
    const file = req.file;
    const { title, description, price, stock, category } = req.body;
    if (!file) return res.status(400).send({ mensaje: "Debe cargar una imagen" });
    if(!title || !description || !price || !stock || !category){
        return res.status(400).json({ mensaje: 'Todos los campos son requeridos' });
    }else{
        const newProduct = req.body;
        // newProduct.thumbnail = `http://localhost:5000/public/uploads/${file.filename}`
        console.log(newProduct)
        await Manager.addProduct(newProduct);
        res.status(200).json({ mensaje: 'Producto agregado correctamente' });
    }
})
router.put('/:id', async (req, res)=>{
    await Manager.upDateProduct(Number(req.params.id), req.body);
	res.status(200).json({ mensaje: 'Producto cambiado correctamente' });
})
router.delete('/:id', async (req, res)=>{
    await Manager.deleteProduct(Number(req.params.id));
	res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
})

module.exports = router;