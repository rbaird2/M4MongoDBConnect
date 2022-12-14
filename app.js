// name: Raymond Baird
// id: 1215758778
// date created: 10/16/2022
// description: project to utilize api and access MongoDB

const express = require('express');
const morgan = require('morgan');

const courseRouter = require('./routes/courseRoutes');
//const userRouter = require('./routes/userRoutes');
const loanRouter = require('./routes/loanRoutes');
const customerRouter = require('./routes/customerRoutes');
const ledgerRouter = require('./routes/ledgerRoutes');



const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// app.use((req, res, next) => {
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/courses', courseRouter);
//app.use('/api/v1/users', userRouter);
app.use('/api/v1/loans', loanRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/ledgers', ledgerRouter);

module.exports = app;
