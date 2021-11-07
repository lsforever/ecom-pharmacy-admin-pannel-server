const express = require('express')
const connectDB = require('./config/db')

const path = require('path')

const app = express()


// Connect Databse
connectDB()

// Init Middleware
//app.use(express.json({ extended: false }))

app.use(express.json())

//app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use('/api/test', (req, res) => {
    return res.send('Test Done');
});

// Define Routes
app.use('/api/auth', require('./api/routes/auth'))
app.use('/api/users', require('./api/routes/users'))
app.use('/api/products', require('./api/routes/products/products'))
app.use('/api/product-categories', require('./api/routes/products/product_categories'))

app.use('/api/vendors', require('./api/routes/vendors/vendors'))


// Serve static items in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})



//  "engines": {
//     "node": "^17.0.1",
//     "npm": "^8.1.0"
//   },


// "browserslist": {
//     "production": [
//       ">0.2%",
//       "not dead",
//       "not op_mini all"
//     ],
//     "development": [
//       "last 1 chrome version",
//       "last 1 firefox version",
//       "last 1 safari version"
//     ]
//   }