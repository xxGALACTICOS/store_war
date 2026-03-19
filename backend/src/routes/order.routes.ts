import { Router } from "express";
import { OrderModel } from "../database/mongo/schemas/order";
import { UserModel } from "../database/mongo/schemas/user";

const orderRouter = Router();

/**
* @swagger
* /api/v1/orders/orders:
*   get:
*     summary: Get all orders
*     description: Returns all orders
*     responses:
*       200:
*         description: Ok orders retrieved
*         content:
*           application/json:
*             example:
*               message: Orders retrieved successfully
*               orders: orders
*       400:
*         description: Bad request
*/
orderRouter.get("/user/:userId", async (req, res) => {
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



// /**
// * @swagger
// * /api/v1/orders/orders/:id:
// *   get:
// *     summary: Get a order
// *     description: Returns a order
// *     parameters:
// *       - in: path
// *         name: id
// *         description: order id
// *         required: true
// *         schema:
// *           type: string
// *     responses:
// *       200:
// *         description: Ok order retrieved
// *         content:
// *           application/json:
// *             schema:
// *               type: object
// *               items:
// *                 $ref: '#/components/schemas/Order'
// *             example:
// *               message: Order retrieved successfully 
// *               order:
// *                 _id: UUID_232l8%^&*
// *                 userId: UUID_232l8%^&*
// *                 products: [
// *                   {
// *                     _id: UUID_232l8%^&*
// *                     name: shoe
// *                     description: this is a shoe
// *                     rate: 10
// *                     voters: 10
// *                     price: 10
// *                     stock: 1
// *                     category: shoes
// *                     subCategory: sneakers
// *                     companyId: UUID_232l8%^&*
// *                     coverPoster: shoes.jpg
// *                     sidePosters: [shoes.jpg, shoes.jpg]
// *                   }
// *                   ]
// *       400:
// *         description: Bad request
// *       404:
// *         description: Not found
// */
orderRouter.get("/:id", async (req, res) => {
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


// /**
// * @swagger
// * /api/v1/orders/orders/:userId:
// *   post:
// *     summary: Create a new order
// *     description: Returns ok and sends OTP to user's email
// *     parameters:
// *       - in: path
// *         name: userId
// *         description: user id
// *         required: true
// *         schema:
// *           type: string
// *     requestBody:
// *       required: true
// *       content:
// *         application/json:
// *           schema:
// *             type: object
// *             items:
// *               $ref: '#/components/schemas/Order'
// *             example:
// *                 userId: UUID_232l8%^&*
// *                 products: [
// *                   {
// *                     _id: UUID_232l8%^&*
// *                     name: shoe
// *                     description: this is a shoe
// *                     rate: 10
// *                     voters: 10
// *                     price: 10
// *                     stock: 1
// *                     category: shoes
// *                     subCategory: sneakers
// *                     companyId: UUID_232l8%^&*
// *                     coverPoster: shoes.jpg
// *                     sidePosters: [shoes.jpg, shoes.jpg]
// *                   }
//  *                   ]
// *     responses:
// *       201:
// *         description: Ok order created
// *         content:
// *           application/json:
// *             example:
// *               message: Order created successfully 
// *       400:
// *         description: Bad request
// */
orderRouter.post("/orders/:userId", async (req, res) => {
  try {

    const { userId } = req.params;
    const { products } = req.body;

    const order = await OrderModel.create({
      userId: userId,
      products: products,
    });

    res.status(201).json(order);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating order", error });
  }
});
export default orderRouter;
