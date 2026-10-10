const express = require('express');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const healthRoutes = require('./routes/health');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));

module.exports = app;
