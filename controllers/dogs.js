const express = require('express');
const router = express.Router();

//Models
const Dog = require('../models/dogSchema.js')

//___________________
// Routes
//___________________
//index route
router.get('/' , (req, res) => {
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
router.get('/new', (req, res) => {
  res.render('new.ejs')
})

//create route
router.post('/', (req, res) => {
  Dog.create(req.body, (err, newDog) => {
    console.log(req.body)
    res.redirect('/')
  })
})

//
//edit route -- comment out on deployment
router.get('/:id/edit', (req, res)=>{
    Dog.findById(req.params.id, (err, data)=>{
        res.render(
    		'edit.ejs',
    		{
    			dog: data
    		}
    	)
    })
})

//update route -- comment out on deployment
router.put('/:id', (req, res)=>{
  Dog.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, newDog)=>{
      res.redirect('/')
  })
})

//show  route
router.get('/:id', (req, res) => {
  Dog.findById(req.params.id, (err, foundDog) => {
    res.render(
      'show.ejs',
      {
        dog: foundDog
      }
    )
  })
})

//delete route -- comment out on deployment
router.delete('/:id', (req, res) => {
  Dog.findByIdAndRemove(req.params.id, (error, deletedItem) => {
    res.redirect('/')
  })
})


module.exports = router;
