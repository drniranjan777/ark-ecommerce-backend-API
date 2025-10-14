const AppError = require('../utils/AppError')
const Category = require('../models/category')

//check category exists or not
const checkCategoryExists = async(category) => {
  const findCategory = await Category.findOne({category:category})
  return findCategory
}


//create catgeory service
const createCategory = async(req) => {
    const {category} = req.body

    const findCategory = await checkCategoryExists(category)

    if(findCategory){
      throw new AppError('Category already Exists',409)
    }

    const newCategory = await Category.create({category})
    return newCategory
}


//get category by id
const getCategorybyId = async(req) => {
   const {categoryId} = req.params

   const category = await Category.findById(categoryId)

   if (!category) {
     throw new AppError('Category not found', 404);
   }

   return category
}


//update category service

const updateCategory = async(req) => {
    const {categoryId} = req.params

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {$set:req.body},
        {new:true}
    )

    if (!updatedCategory) {
      throw new AppError('Product not updated or not found', 404);
    }
    return updatedCategory
}


//delete category

const deleteCategory = async(req) => {
    const {categoryId} = req.params
    const deletedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {$set:{isDeleted:true}},
        {new:true}      
    )

    if (!deletedCategory) {
        throw new AppError('Category not updated',404)
    }

    return deletedCategory
}

//get all categories

const getCategories = async() => {
    const categories = await Category.find().lean()
    return categories
}

module.exports = {
    createCategory,
    getCategorybyId,
    updateCategory,
    deleteCategory,
    getCategories
}