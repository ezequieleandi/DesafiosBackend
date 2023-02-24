const fs = require("fs/promises");

class ManagerProduct {
  constructor(ruta) {
    this.rutaProductsDB = ruta;
    this.products = [];
  }

  async addProduct(product) {
    try {
      const { title, description, price, stock, category, status } = product;
      this.products = await this.getProducts();
      const lastId = this.products[this.products.length - 1].id + 1;
      const insertarProduct = {
        title: title,
        description: description,
        price: price,
        stock: stock,
        category: category,
        status: status,
        // thumbnail: thumbnail
      };
      this.products.push({ id: lastId, ...insertarProduct });
      await fs.writeFile(this.rutaProductsDB, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
    }
  }
  async getProducts() {
    try {
      this.products = await fs.readFile(this.rutaProductsDB);
      return JSON.parse(this.products);
    } catch (error) {
      console.log(error);
    }
  }
  async getProductById(id) {
    try {
      this.products = JSON.parse(await fs.readFile(this.rutaProductsDB))
      const respuesta = this.products.find(product => product.id === id)
      return respuesta
    } catch (error) {
      console.log(error);
    }
  }
  async upDateProduct(id, data) {
    try {
      this.products = JSON.parse(await fs.readFile(this.rutaProductsDB))
      const changeProduct = this.products.find(product => product.id === id)
      if (!changeProduct) {
        return 'Producto no encontrado'
      } else {
        const prodIndex = this.products.findIndex(prod => prod.id === id);
        this.products[prodIndex] = { ...changeProduct, ...data };
        await fs.writeFile(this.rutaProductsDB, JSON.stringify(this.products));
        return 'Producto cambiado correctamente'
      }
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    try {
      this.products = JSON.parse(await fs.readFile(this.rutaProductsDB))
      const res = this.products.filter(product => product.id !== id)
      return await fs.writeFile(this.rutaProductsDB, JSON.stringify(res));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ManagerProduct;