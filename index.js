const path = require("path");
const ManagerProduct = require("./managerProducts");

const functionsProduct = async () => {
    try {
        const rutaBase = path.join(`${__dirname}/db.json`);
        const Manager = new ManagerProduct(rutaBase);
        //Se muestra el array inicial de productos
        console.log("Array inicial")
        const listaProducts = await Manager.getProducts();
        console.log(listaProducts);
        //Se crea nuevo producto y se muestra array nuevo
        console.log("Creando producto nuevo y muestra de array")
        const createProduct = {
            title: "zapatillas convers",
            description: "Zapatillas 2023",
            price: 12500,
            stock: 15,
        };
        await Manager.addProduct(createProduct);
        const listaNewProducts = await Manager.getProducts();
        console.log(listaNewProducts);
        //Buscando un producto especifico
        console.log("Buscando producto por ID")
        const productById = await Manager.getProductById(2)
        console.log(productById)
        //Eliminando un producto y mostrando array
        console.log("Eliminando un producto y mostrando array")
        await Manager.deleteProduct(2)
        const productsDelete = await Manager.getProducts();
        console.log(productsDelete);
        //modificando producto y mostrando array
        console.log("modificando producto")
        const newInfo = {
            talle: "XL"
        }
        await Manager.upDateProduct(3, newInfo)
        const editProduct = await Manager.getProducts();
        console.log(editProduct);
    } catch (error) {
        console.log(error);
    }
};

functionsProduct();