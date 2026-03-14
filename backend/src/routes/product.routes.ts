import { Router } from "express";
import { User } from "../database/models/user.model";
import { Product } from "../database/models/product.model";
import { ProductModel } from "../database/mongo/schemas/product";
const productRouter = Router();

//create product
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
    res
      .status(201)
      .json({ message: "Product created successfully", product: product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
});

//get a product
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

//get all products
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

//update product
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

//delete product
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

