const fs = require("fs/promises");
const ManagerProduct = require("./productManager");
const path = require("path");
const rutaBase = path.join(`db/products.json`);
const Manager = new ManagerProduct(rutaBase);

class CartManager {
    constructor(ruta) {
        this.rutaCartDB = ruta;
        this.carts = [];
    }

    async addCart() {
        try {
            this.carts = await this.getCarts();
            const id = this.carts === undefined ? 1 : this.carts[this.carts.length - 1].id + 1;
            this.carts.push({ id, products: [] });
            return await fs.writeFile(this.rutaCartDB, JSON.stringify(this.carts));
        } catch (error) {
            return error;
        }
    };
    async getCarts() {
        try {
            const findCarts = JSON.parse(await fs.readFile(this.rutaCartDB, 'utf-8'));
            return findCarts
        } catch (error) {
            if (error.errno === -4058) fs.writeFileSync(this.rutaCartDB, JSON.stringify(this.products));
            return this.products;
        }
    };
    async getProdsByCartId(id) {
        try {
            this.carts = await this.getCarts();
            if (this.carts == undefined) {
                return undefined
            } else {
                const findCart = this.carts.find(cart => cart.id === id);
                return findCart
            }
        } catch (error) {
            return error;
        }
    };
    async addProdToCart(cid, pid) {
        const prod = await Manager.getProductById(pid);
        const cart = await this.getProdsByCartId(cid);
        // if (cart.some(item => item.product === prod.id)) {
        //     const index = cart.findIndex(item => item.product === prod.id);
        //     cart[index].quantity++;
        // } else {
        //     cart.push({ product: prod.id, quantity: 1 });
        // }
        // return await fs.writeFile(this.rutaCartDB, JSON.stringify(this.carts));
        console.log(cart)
    };



}



module.exports = CartManager;