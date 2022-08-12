const express = require('express');
const router = express.Router();

//Models
const Tasks = require('../models/taskSchema.js')

//___________________
// Routes
//___________________
//index route
router.get('/' , (req, res) => {
  Tasks.find({}, (err, foundTasks) => {
    res.render(
      'index.ejs',
      {
        data: foundTasks
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
  Tasks.create(req.body, (err, newTask) => {
    res.redirect('/')
  })
})

//
//edit route -- comment out on deployment
router.get('/:id/edit', (req, res)=>{
    Tasks.findById(req.params.id, (err, data)=>{
        res.render(
    		'edit.ejs',
    		{
    			task: data
    		}
    	)
    })
})

//update route -- comment out on deployment
router.put('/:id', (req, res)=>{
  Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, newTask)=>{
      res.redirect('/')
  })
})

//show  route
router.get('/:id', (req, res) => {
  Tasks.findById(req.params.id, (err, foundTask) => {
    res.render(
      'show.ejs',
      {
        task: foundTask
      }
    )
  })
})

//delete route -- comment out on deployment
router.delete('/:id', (req, res) => {
  Tasks.findByIdAndRemove(req.params.id, (error, deletedItem) => {
    res.redirect('/')
  })
})


module.exports = router;
