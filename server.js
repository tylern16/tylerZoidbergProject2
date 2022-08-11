//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;
const Dog = require('./models/dogSchema.js')

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//index route
app.get('/' , (req, res) => {
  Dog.find({}, (err, foundDogs) => {
    res.render(
      'index.ejs',
      {
        data: foundDogs
      }
    )
  })
});

//new route
app.get('/new', (req, res) => {
  res.render('new.ejs')
})

//create route
app.post('/', (req, res) => {
  Dog.create(req.body, (err, newDog) => {
    console.log(req.body)
    res.redirect('/')
  })
})

//
// //edit route
// app.get('/cart/:id/edit', (req, res)=>{
//     Cart.findById(req.params.id, (err, data)=>{
//         res.render(
//     		'edit.ejs',
//     		{
//     			cart: data
//     		}
//     	);
//     });
// });
//
// //update route
// app.put('/cart/:id', (req, res)=>{
//   // if (req.body.affordable === 'on') {
//   //   req.body.affordable = true
//   // } else {
//   //   req.body.affordable = false
//   // }
//   Cart.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
//       res.redirect('/cart');
//   });
// });
//
//
//show  route
app.get('/:id', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    res.render(
      'show.ejs',
      {
        dog: foundDog
      }
    )
  })
})
//
// //delete route
// app.delete('/cart/:id', (req, res) => {
//   Cart.findByIdAndRemove(req.params.id, (error, deletedItem) => {
//     res.redirect('/cart')
//   })
// })

//___________________
//Listener
//___________________
// app.listen(PORT, () => console.log( 'Listening on port:', PORT));
//edited listener
app.listen(PORT, () => console.log( 'Listening...'));
