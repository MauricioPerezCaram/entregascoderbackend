class OrderManager {
  static orders = [];
  constructor(data) {
    this.id =
      OrderManager.orders.length === 0
        ? 1
        : OrderManager.orders[OrderManager.orders.length - 1].id + 1;
    this.quantity = data.quantity;
    this.state = data.state;

    OrderManager.orders.push(this);
  }

  create(data) {
    const event = {
      id:
        OrderManager.orders.length === 0
          ? 1
          : OrderManager.orders[OrderManager.orders.length - 1].id + 1,
      quantity: data.quantity,
      state: data.state,
    };
    OrderManager.orders.push(event);
  }

  read() {
    return OrderManager.orders;
  }

  readOne(id) {
    return OrderManager.orders.find((each) => each.id === Number(id));
  }

  update(id, data) {
    try {
      const orderToUpdate = OrderManager.orders.find(
        (order) => order.id === Number(id)
      );
      if (!orderToUpdate) {
        throw new Error("Orden no encontrada");
      }
      orderToUpdate.quantity = data.quantity || orderToUpdate.quantity;
      orderToUpdate.state = data.state || orderToUpdate.state;

      return orderToUpdate;
    } catch (error) {
      return next(error);
    }
  }

  delete(id) {
    try {
      const orderIndex = OrderManager.orders.findIndex(
        (order) => order.id === Number(id)
      );
      if (orderIndex === -1) {
        throw new Error("Orden no encontrada");
      }
      const deletedOrder = OrderManager.orders.splice(orderIndex, 1)[0];
      return deletedOrder;
    } catch (error) {
      return next(error);
    }
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
