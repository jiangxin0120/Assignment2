const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productController = require('./productController');
const router = express.Router();
const app = express();
const PORT = 8080;
//config
mongoose.connect('mongodb+srv://timezero2513:Wsad00100.!@cluster0.g9loq06.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const productRoutes = require('./productRoutes');


module.exports = router;
// Middleware
app.use(cors());
app.use(express.json());

// Simple route for testing
app.get('/', (req, res) => {
    res.json({ message: "Welcome to DressStore application." });
});

// Connect to MongoDB 
mongoose.connect('mongodb+srv://timezero2513:Wsad00100.!@cluster0.g9loq06.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB");
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("Error connecting to MongoDB", err);
    });

    app.use(productRoutes);
