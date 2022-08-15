const express = require('express');
const router = express.Router();

const Engineer = require('../models/engineerSchema.js')
const Tasks = require('../models/taskSchema.js')

//seed route
// router.get('/engineers/seed', (req, res) => {
//   Engineer.create({name: 'Tyler'}, (err, seed) => {
//     res.redirect('/engineers')
//   })
// })

//index
router.get('/engineers' , (req, res) => {
  Engineer.find({}, (err, found) => {
    res.render(
      'eng-index.ejs',
      {
        data: found
      }
    )
  })
});

//new route
router.get('/engineers/new', (req, res) => {
  res.render('eng-new.ejs')
})

//create route
router.post('/engineers', (req, res) => {
  Engineer.create(req.body, (err, newEng) => {
    res.redirect('/engineers')
  })
})


//edit route -- comment out on deployment
router.get('/engineers/:id/edit', (req, res)=>{
    Engineer.findById(req.params.id, (err, data)=>{
        res.render(
    		'eng-edit.ejs',
    		{
    			data
    		}
    	)
    })
})

//update route -- comment out on deployment
router.put('/engineers/:id', (req, res)=>{
  Engineer.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, newEngineer)=>{
      res.redirect('/engineers')
  })
})




//show  route
router.get('/engineers/:id', (req, res) => {
  Engineer.findById(req.params.id, (err, data) => {
    res.render(
      'eng-show.ejs',
      {
        data
      }
    )
  })
})

//delete route
router.delete('/engineer/:id', (req, res) => {
  Engineer.findByIdAndRemove(req.params.id, (err, foundEng) => {
    const taskIds = []
    for (let i = 0; i < foundEng.tasks.length; i++) {
      taskIds.push(foundEng.tasks[i]._id)
    }
    Tasks.remove(
      {
        _id: {
          $in: taskIds
        }
      },
      (err, data) => {
        res.redirect('/engineers')
      }
    )
  })
})





module.exports = router;
