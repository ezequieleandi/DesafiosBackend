class ProductManager{
    static products = [];
    static id = 0;
    constructor(title, description, price, thumbnail, stock, id){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
        this.id = id
    };
    getProducts(){
        console.log(ProductManager.products)
    }
    addProduct(objProduct){
        let data = {
            id: ProductManager.id++,
            title: objProduct.title,
            description: objProduct.description,
            price: objProduct.price,
            thumbnail: objProduct.thumbnail,
            stock: objProduct.stock,
        }
        if(!data.title || !data.description || !data.price || !data.thumbnail || !data.stock){
            console.log(`Faltan datos en el producto ${objProduct.title} ${objProduct.description}`)
        }else{
            ProductManager.products.push(data)
        }
    }
    getProductById(id){
       const res = ProductManager.products.find(product => product.id === id)
       if(res == undefined){
        console.log("El producto que se busca, no se encuentra")
       }else{
        console.log(res)
       }
    }
}
const productos = new ProductManager;
const producto1 = new ProductManager("remera","polo", "4100", "imagen1", "5");
const producto2 = new ProductManager("gorra","valk", "1500", "imagen23", "15");
const producto3 = new ProductManager("zapatillas","", "15600", "imagen98", "3");
//Mostrando el array vacio
console.log("Array vacio. No hay productos")
productos.getProducts();
//Agregando productos al array
producto1.addProduct(producto1)
producto2.addProduct(producto2)
//mostrando el array con los productos
console.log("El array con productos")
productos.getProducts();
//Agregando producto que le falta dato
console.log("Producto que le falta datos:")
producto3.addProduct(producto3)
//Buscando producto con id especifico
console.log("buscando producto especifico:")
productos.getProductById(0);