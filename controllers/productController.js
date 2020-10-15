const Product = require('../models/productModel')

// @desc    Gets All Products
// @route   GET /api/products
async function getProducts(req, res){
    try{
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Products
// @route   GET /api/products/:id
async function getProductById(req, res, id) {
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'product not found'}))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProductById
}