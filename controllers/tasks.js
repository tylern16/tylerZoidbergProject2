const express = require('express');
const router = express.Router();

//Models
const Tasks = require('../models/taskSchema.js')
const Engineers = require('../models/engineerSchema.js')

//JS
//get todays date in yyyy-mm-dd format
//date2 will be input
//do math in milliseconds
const getNumOfDaysLeft = (date2) => {
  let today = new Date().getTime()
  // console.log(today);
  let dueDate = new Date(date2).getTime()
  // console.log(dueDate);
  daysLeft = Math.ceil((dueDate - today)/(1000 * 60 * 60 * 24))
  // console.log(daysLeft);
  return daysLeft
}

const changeColor =  () => {
  let element = document.querySelector('.row-header')
  element.onclick = () => {
    element.style.backgroundcolor = 'green'
  }
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
router.get('/home' , (req, res) => {
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
router.get('/home/new', (req, res) => {
  Engineers.find({}, (err, allEng) => {
    res.render(
      'new.ejs',
      {
        data: allEng
      }
    )
  })
})

//create route
router.post('/home', (req, res) => {
  Engineers.findById(req.body.engineerId, (err, foundEng) => {
    req.body.completed = false
    Tasks.create(req.body, (err, createdTask) => {
      foundEng.tasks.push(createdTask)
      console.log(createdTask);
      foundEng.save((err,data) => {
        res.redirect('/home')
      })
    })
  })
})

//
//edit route -- comment out on deployment
router.get('/home/:id/edit', (req, res)=>{
    Tasks.findById(req.params.id, (err, foundTask)=>{
      Engineers.find({}, (err, allEng) => {
        Engineers.findOne({'tasks_.id':req.params.id}, (err, foundTaskEng) => {
          res.render(
            'edit.ejs',
            {
              task: foundTask,
              engineers: allEng,
              taskEngineer: foundTaskEng
            }
          )
        })
      })
    })
})

//update route -- comment out on deployment
router.put('/home/:id', (req, res)=>{
  if (req.body.completed === 'on') {
    req.body.completed = true
  } else {
    req.body.completed = false
  }
  Tasks.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTask)=>{
    Engineers.findOne({'tasks._id':req.params.id}, (err, foundEng) => {
      if(foundEng._id.toString() !== req.body.engineerId) {
        foundEng.tasks.id(req.params.id).remove()
        foundEng.save((err, savedFoundEng) => {
          Engineers.findById(req.body.engineerId, (err, newEng) => {
            newEng.tasks.push(updatedTask)
            newEng.save((err, savedNewEng) => {
              res.redirect('/home/' + req.params.id)
            })
          })
        })
      } else {
        foundEng.tasks.id(req.params.id).remove()
        foundEng.tasks.push(updatedTask)
        foundEng.save((err, data) => {
          res.redirect('/home')
        })
      }
    })
  })
})

//show  route
router.get('/home/:id', (req, res) => {
  Tasks.findById(req.params.id, (err, foundTask) => {
    Engineers.findOne({'tasks._id':req.params.id}, (err, foundEng) => {
      res.render(
        'show.ejs',
        {
          task: foundTask,
          engineer: foundEng,
          getNumOfDaysLeft: getNumOfDaysLeft
        }
      )

    })
  })
})

//delete route -- comment out on deployment
router.delete('/home/:id', (req, res) => {
  Tasks.findByIdAndRemove(req.params.id, (error, deletedItem) => {
    Engineers.findOne({'tasks._id':req.params.id}, (err, foundEng) => {
      foundEng.tasks.id(req.params.id).remove()
      foundEng.save((err,data) => {
        res.redirect('/home')
      })
    })
  })
})


module.exports = router;
