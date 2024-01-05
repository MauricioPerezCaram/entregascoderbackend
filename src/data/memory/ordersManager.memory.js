class OrderManager {
  static orders = [];
  constructor(data) {
    this.id =
      OrderManager.orders.length === 0
        ? 1
        : OrderManager.orders[OrderManager.orders.length - 1].id + 1;
    this.title = data.title;
    this.photo = data.photo;
    this.price = data.price;
    this.stock = data.stock;
    OrderManager.orders.push(this);
  }

  create(data) {
    const event = {
      id:
        OrderManager.orders.length === 0
          ? 1
          : OrderManager.orders[OrderManager.orders.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };
    OrderManager.orders.push(event);
  }

  read() {
    return OrderManager.orders;
  }

  readOne(id) {
    return OrderManager.orders.find((each) => each.id === Number(id));
  }
}

const orders = new OrderManager({
  title: "Telefono",
  photo: "Telefono Foto",
  price: 1200,
  stock: 15,
});
orders.create({
  title: "Computadora",
  photo: "Computadora Foto",
  price: 11,
  stock: 11,
});
orders.create({
  title: "Licuadora",
  photo: "Licuadora Foto",
  price: 22,
  stock: 22,
});
orders.create({
  title: "Televisor",
  photo: "Televisor Foto",
  price: 33,
  stock: 33,
});
orders.create({ title: "Ipad", photo: "Ipad Foto", price: 44, stock: 44 });
console.log(orders.read());
console.log(orders.readOne(3));
