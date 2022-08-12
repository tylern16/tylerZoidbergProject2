const express = require('express');
const router = express.Router();

//Models
const Tasks = require('../models/taskSchema.js')

//JS
//get todays date in yyyy-mm-dd format
//date2 will be input
//do math in milliseconds
const getNumOfDaysLeft = (date2) => {
  let today = new Date().getTime()
  // console.log(today);
  let dueDate = new Date(date2).getTime()
  // console.log(dueDate);
  daysLeft = Math.floor((dueDate - today)/(1000 * 60 * 60 * 24))
  // console.log(daysLeft);
  return daysLeft
}

//select td
//if td if high set background color to red
// const showImportanceColor = () => {
//   let element = document.querySelector('.importance')
//   console.log(element);
// }
// showImportanceColor()

//___________________
// Routes
//___________________
//index route
router.get('/' , (req, res) => {
  Tasks.find({}, (err, foundTasks) => {
    res.render(
      'index.ejs',
      {
        data: foundTasks,
        getNumOfDaysLeft: getNumOfDaysLeft
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
  req.body.completed = false
  // console.log(req.body);
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
  if (req.body.completed === 'on') {
    req.body.completed = true
  } else {
    req.body.completed = false
  }
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
