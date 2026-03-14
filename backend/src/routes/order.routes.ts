import { Router } from "express";
import { OrderModel } from "../database/mongo/schemas/order";
import { UserModel } from "../database/mongo/schemas/user";

const orderRouter = Router();

orderRouter.get("/orders/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId: userId }).populate("products");
    //const orders = await UserModel.findById(userId).select("orders").populate("orders");

    if (!orders) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "error fetching orders", error });
  }
});

orderRouter.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id).populate("products");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching order", error });
  }
});


orderRouter.post("/orders/:userId", async (req, res) => {
  try {

    const { userId } = req.params;
    const {products } = req.body;

    const order = await OrderModel.create({
      userId: userId,
      products: products,
    });

    res.status(201).json(order);

  } catch (error) {
    console.log (error);
    res.status(500).json({ message: "Error creating order", error });
  }
});
export default orderRouter;
