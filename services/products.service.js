const Product = require('../models/product')
const AppError = require('../utils/AppError')


//create product
const createProduct = async(req) => {
    const product = new Product(req.body)
    const saveProduct = await product.save()
  return saveProduct
}

//get product by id

const getProductByid = async(req) => {
    const {productId} = req.params
    const product = await Product.findById(productId).lean()

    if(!product){
      throw new AppError("Product not found",404)
    }
    return product
}


//update product

const updateProduct = async(req) => {
    const {productId} = req.params

    const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set:req.body},
        { new: true }
    );

   if (!updatedProduct) {
    throw new AppError('Product not updated', 500);
   }
    return updatedProduct
}

//get products

const getProducts = async (req) => {
  const {
    search,
    category,
    color,
    size,
    minPrice,
    maxPrice,
    sortBy = 'createdAt',  // default sort
    sortOrder = 'desc',    // asc or desc
    page = 1,
    limit = 10
  } = req.query;

  // Build filter object
  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  if (category) filter.category = category;
  if (color) filter.color = color;
  if (size) filter.size = Number(size);
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Convert pagination to numbers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  // Build sort object
  const sort = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1
  };

  // Query the database
  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limitNumber)
      .select('-__v') // Optional: exclude internal fields
      .lean(),        // Lean = better performance if no Mongoose methods needed
    Product.countDocuments(filter)
  ]);

  return {
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    products
  };
};

//delete product

const deleteProduct = async(req) => {
  const {productId} = req.params

  const productExists = await Product.findById(productId)

  if(!productExists){
    throw new AppError('Product not found',404)
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

   const deletedProduct = await Product.findByIdAndDelete(productId);

  return deletedProduct;

}

module.exports = {
    createProduct,
    getProductByid,
    updateProduct,
    getProducts,
    deleteProduct
}
