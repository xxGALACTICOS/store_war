import { Router } from "express";
import { User } from "../database/models/user.model";
import { Product } from "../database/models/product.model";
import { ProductModel } from "../database/mongo/schemas/product";
const productRouter = Router();

/**
 * @swagger
 * /api/v1/products/createproduct:
 *   post:
 *     summary: Create a new product
 *     description: Returns ok and sends OTP to user's email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/Product'
 *             example:
 *                 name: shoe
 *                 description: this is a shoe
 *                 rate: 10
 *                 voters: 10
 *                 price: 10
 *                 stock: 1
 *                 category: shoes
 *                 subCategory: sneakers
 *                 companyId: UUID_232l8%^&*
 *                 coverPoster: shoes.jpg
 *                 sidePosters: [shoes.jpg, shoes.jpg]
 *     responses:
 *       201:
 *         description: Ok product created
 *         content:
 *           application/json:
 *             example:
 *               message: Product created successfully 
 *       400:
 *         description: Bad request
 */
productRouter.post("/createproduct", async (req, res) => {
  const {
    name,
    description,
    price,
    rate,
    voters,
    stock,
    coverPoster,
    sidePosters,
    companyId,
    category,
    subCategory,
  } = req.body as Product;
  const missingFields = [];

  if (!name) missingFields.push("name");
  if (!description) missingFields.push("description");
  if (!price) missingFields.push("price");
  if (!rate) missingFields.push("rate");
  if (!voters) missingFields.push("voters");
  if (!stock) missingFields.push("stock");
  if (!coverPoster) missingFields.push("coverPoster");
  if (!sidePosters) missingFields.push("sidePosters");
  if (!companyId) missingFields.push("companyId");
  if (!category) missingFields.push("category");
  if (!subCategory) missingFields.push("subCategory");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `${missingFields.join(", ")} is required`,
    });
  }

  try {
    const product = new ProductModel({
      name,
      description,
      price,
      rate,
      voters,
      stock,
      coverPoster,
      sidePosters,
      companyId,
      category,
      subCategory,
    });
    await product.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    return res.status(500).json({ message: "Error creating product", error });
  }
});



/**
 * @swagger
 * /api/v1/products/product/:id:
 *   get:
 *     summary: Get a product
 *     description: Returns a product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: product id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok product retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *             example:
 *               message: Product retrieved successfully 
 *               product:
 *                 _id: UUID_232l8%^&*
 *                 name: shoe
 *                 description: this is a shoe
 *                 rate: 10
 *                 voters: 10
 *                 price: 10
 *                 stock: 1
 *                 category: shoes
 *                 subCategory: sneakers
 *                 companyId: UUID_232l8%^&*
 *                 coverPoster: shoes.jpg
 *                 sidePosters: [shoes.jpg, shoes.jpg]
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
productRouter.get("/product/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Product id is required",
    });
  }
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: `Product with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: `Product with id ${id} retrieved successfully`,
      product,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});


/**
 * @swagger
 * /api/v1/products/products:
 *   get:
 *     summary: Get all products
 *     description: Returns all products
 *     parameters:
 *       - in: query
 *         name: category
 *         description: product category
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: subCategory
 *         description: product sub category
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok products retrieved
 *         content:
 *           application/json:
 *             example:
 *               message: Products retrieved successfully
 *               products: products
 *       400:
 *         description: Bad request
 */
productRouter.get(
  "/products",
  async (req, res) => {
    const { category, subCategory } = req.query;
    try {
      const products = await ProductModel.find({
        category,
        subCategory,
      }).select("name price rate voters coverPoster");
      res.status(200).json({
        message: `${products.length} products retrieved successfully`,
        products
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
    }
  },
);


/**
 * @swagger
 * /api/v1/products/updateproduct/:id:
 *   put:
 *     summary: Update a product
 *     description: Returns ok and sends OTP to user's email
 *     parameters:
 *       - in: path
 *         name: id
 *         description: product id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: '#/components/schemas/Product'
 *             example:
 *                 name: shoe
 *                 description: this is a shoe
 *                 rate: 10
 *                 voters: 10
 *                 price: 10
 *                 stock: 1
 *                 category: shoes
 *                 subCategory: sneakers
 *                 companyId: UUID_232l8%^&*
 *                 coverPoster: shoes.jpg
 *                 sidePosters: [shoes.jpg, shoes.jpg]
 *     responses:
 *       200:
 *         description: Ok product updated
 *         content:
 *           application/json:
 *             example:
 *               message: Product updated successfully 
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
productRouter.put("/updateproduct/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ message: `Product with id ${id} not found` });
    }
    res.status(200).json({
      message: `Product with id ${id} updated successfully`,
      updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});

/**
 * @swagger
 * /api/v1/products/deleteproduct/:id:
 *   delete:
 *     summary: Delete a product
 *     description: Returns ok and sends OTP to user's email
 *     parameters:
 *       - in: path
 *         name: id
 *         description: product id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ok product deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Product deleted successfully 
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found
 */
productRouter.delete("/deleteproduct/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: `Product with id ${id} not found` });
    }
    res.status(200).json({
      message: `Product with id ${id} deleted successfully`,
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

export default productRouter;

