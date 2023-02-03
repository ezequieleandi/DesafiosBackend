const fs = require("fs/promises");

class ManagerProduct {
  constructor(ruta) {
    this.rutaDB = ruta;
    this.products = [];
  }

  async addProduct(product) {
    try {
      const { title, description, price, stock } = product;
      this.products = await this.getProducts();
      const lastId = this.products[this.products.length - 1].id + 1;
      const insertarProduct = {
        title: title,
        description: description,
        price: price,
        stock: stock,
      };
      this.products.push({ id: lastId, ...insertarProduct });
      await fs.writeFile(this.rutaDB, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    try {
      this.products = await fs.readFile(this.rutaDB);
      return JSON.parse(this.products);
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      this.products = JSON.parse(await fs.readFile(this.rutaDB))
      const respuesta = this.products.find(product => product.id === id)
      return respuesta
    } catch (error) {
      console.log(error);
    }
  }
  async upDateProduct(id, data) {
    try {
      this.products = JSON.parse(await fs.readFile(this.rutaDB))
      const changeProduct = this.products.find(product => product.id === id)
      const prodIndex = this.products.findIndex(prod => prod.id === id);
      this.products[prodIndex] = { ...changeProduct, ...data };
      await fs.writeFile(this.rutaDB, JSON.stringify(this.products));
      console.log("producto modificado")
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      this.products = JSON.parse(await fs.readFile(this.rutaDB))
      const res = this.products.filter(product => product.id !== id)
      return await fs.writeFile(this.rutaDB, JSON.stringify(res));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ManagerProduct;