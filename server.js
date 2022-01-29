const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const categoryRouter = require('./routes/categoryRouter');
const subcategoryRouter = require('./routes/subcategoryRouter');
const cookieParser = require('cookie-parser');
require('dotenv/config');
const jwt = require('express-jwt');
const app = express();

var corOption = {
  origin: 'http://localhost:3000',
};

// middlware

app.use(cors(corOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


// app.use(
//     jwt({
//       secret: process.env.JWT_SECRET,
//       algorithms: ['HS256'],
//       getToken: (req) => req.cookies.token,
//     })
//   );


app.use('/uploads', express.static('uploads'));

// routers
app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/subcategory', subcategoryRouter);
app.use('/api/product', productRouter);

// Undefined routes

app.use('*', (req, res, next) => {
  res.status(404).json({ message: 'route not found' });
});

// port

const port = process.env.PORT || 5000;

// server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
