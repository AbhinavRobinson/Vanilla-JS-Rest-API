const Product = require('../models/productModel')

const { getPostData } = require('../utils')

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

// @desc    Create Product
// @route   POST /api/products
async function createProduct(req, res){
    try{
        const body = await getPostData(req)

        const { name, price } = JSON.parse(body)

        const product = {
            name: name,
            price: price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct)) 

    } catch (error) {
        console.log(error)
    }
}

// @desc    Update Product
// @route   PUT /api/products/:id
async function updateProduct(req, res, id){
    try{
        const product = await Product.findById(id)

        if(!product) {
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'product not found'}))
        } else {
            const body = await getPostData(req)

            const { name, price } = JSON.parse(body)

            const productData = {
                name: name || product.name,
                price: price || product.price
            }

            const updProduct = await Product.update(id, productData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updProduct)) 
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc    Delete Single Products
// @route   DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try{
        const product = await Product.findById(id)

        if(!product){
            res.writeHead(404, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: 'product not found'}))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json'})
            res.end(JSON.stringify({ message: `Product ${id} removed`}))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}