class ProductManager {
  static productos = [];
  constructor(data) {
    this.id =
      ProductManager.productos.length === 0
        ? 1
        : ProductManager.productos[ProductManager.productos.length - 1].id + 1;
    this.title = data.title;
    this.photo = data.photo;
    this.price = data.price;
    this.stock = data.stock;
    ProductManager.productos.push(this);
  }

  create(data) {
    const event = {
      id:
        ProductManager.productos.length === 0
          ? 1
          : ProductManager.productos[ProductManager.productos.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.productos.push(event);
  }

  read() {
    return ProductManager.productos;
  }

  readOne(id) {
    return ProductManager.productos.find((each) => each.id === Number(id));
  }

  update(id, data) {
    try {
      const productToUpdate = ProductManager.productos.find(
        (producto) => producto.id === Number(id)
      );
      if (!productToUpdate) {
        throw new Error("Producto no encontrado");
      }
      productToUpdate.title = data.title || productToUpdate.title;
      productToUpdate.photo = data.photo || productToUpdate.photo;
      productToUpdate.price = data.price || productToUpdate.price;
      productToUpdate.stock = data.stock || productToUpdate.stock;
      return productToUpdate;
    } catch (error) {
      return next(error);
    }
  }

  delete(id) {
    try {
      const productIndex = ProductManager.productos.findIndex(
        (producto) => producto.id === Number(id)
      );
      if (productIndex === -1) {
        throw new Error("Producto no encontrado");
      }
      const deletedProducto = ProductManager.productos.splice(
        productIndex,
        1
      )[0];
      return deletedProducto;
    } catch (error) {
      return next(error);
    }
  }
}

const productos = new ProductManager({
  title: "Telefono",
  photo: "Telefono Foto",
  price: 1200,
  stock: 15,
});
productos.create({
  title: "Computadora",
  photo: "Computadora Foto",
  price: 11,
  stock: 11,
});
productos.create({
  title: "Licuadora",
  photo: "Licuadora Foto",
  price: 22,
  stock: 22,
});
productos.create({
  title: "Televisor",
  photo: "Televisor Foto",
  price: 33,
  stock: 33,
});
productos.create({ title: "Ipad", photo: "Ipad Foto", price: 44, stock: 44 });
console.log(productos.read());
console.log(productos.readOne(3));
