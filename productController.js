const Product = require('./productModel');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        category: req.body.category
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        // Update fields
        Object.keys(req.body).forEach(key => {
            product[key] = req.body[key];
        });

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        
        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.removeAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.json({ message: 'All products removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.searchProductsByName = async (req, res) => {
    try {
        const keyword = req.query.name;
        const products = await Product.find({ name: new RegExp(keyword, 'i') });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
