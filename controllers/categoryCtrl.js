const Category = require('../models/categoryModel');
const Products = require('../models/productModel');


const categoryCtrl = {
    getCategories: async (req, res) => {
        try{
            const categories = await Category.find();
            res.json(categories);
        }catch(err){
            res.status(500).json({msg: err.message});
        }
    },
    createCategory: async (req, res) => {
        try{
            const {name} = req.body;
            const category = await Category.findOne({name});
            if(category) return res.status(400).json({msg: "This Category already exists."}); 

            const newCategory = new Category({name})

            await newCategory.save();

            res.json("Category "+ newCategory.name + " created!!")
            
        }catch(err){
            res.status(500).json({msg: err.message});
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({msg: "Please delete all products having this category!!"})
           await Category.findByIdAndDelete(req.params.id);
           res.json({msg: "Category Deleted!"});
        } catch (err) {
            res.status(500).json({msg: err.message}); 
        }
    },
    updateCategory: async (req, res) => {
        try {
            const {name} = req.body;
           await Category.findByIdAndUpdate({_id: req.params.id}, {name});
           res.json({msg: "Category Updated!"});
        } catch (err) {
            res.status(500).json({msg: err.message}); 
        }
    }
}   

module.exports = categoryCtrl;