const User = require('../models/user');
const Dream = require('../models/goal')
const Update = require('../models/update');
const ActionItem = require('../models/action-item');


module.exports = function(app) {
//-----GET ROUTES ------ //

    // /index route ------(GET)------- *note* in future change to /dashboard so there can be a landing page
    app.get('/dashboard', (req,res) => {
        if(req.user) {
            User.findById(req.user._id).populate({path: 'goals'}).then(user => {
                res.render('goals-dashboard.hbs', {user: user});
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            res.render('home.hbs');
            console.log('User not signed in ')
        }


    })
    /*****
    //// Get edit dashboard page-- this page will let you delete goals
    ******/

    app.get('/dashboard/edit', (req, res) => {
        if(req.user){
            User.findById(req.user._id).populate('goals').then(user => {
                res.render('dashboard-edit.hbs', {user: user})
            }).catch(err => {
                console.log(err.message);
            })

        } else {
            res.redirect('/');
            console.log('not logged in');
        }

    })




    //Create Dream Page -----(GET)-----
    app.get('/goals/new', (req, res) => {
        res.render('goals-new.hbs');
    })


    //show single goal -----(GET)-------
    app.get('/goals/:id', (req, res) => {
        Dream.findById(req.params.id).populate('updates').populate({path: 'actionItems'}).then(goals => {
            // console.log(goals); ---> returns the goals correctly(goals do contain updates)

            res.render('goals-show.hbs', {goals: goals });
        }).catch(err => {
            console.log(err.message);
        })
    })




    //-----POST ROUTES -----//

    //create new goal ---(POST)---
    app.post('/goals', (req, res) => {
        if (req.user) {
            const goal = new Dream(req.body);
            goal.save().then(response => {
                return User.findById(req.user._id)
            }).then(user => {
                user.goals.unshift(goal);
                user.save();
                res.redirect('/dashboard')
            }).catch(err => {
                console.log(err.message);
            })
        } else {
            console.log('user is not signed in ');
            return res.status(401).send('You need to be signed in to do that');
        }

        })


        //----EDIT ROUTE ----//------//
        //GET edits form
        app.get('/goals/:id/edit', (req, res) => {
            Dream.findById(req.params.id).then(goal => {
                res.render('goals-edit.hbs', {goal: goal});
            })
        })

        ///PUT route to update the goal
        app.put('/goals/:id', (req, res) => {
            Dream.findById(req.params.id).then(goal => {
                goal.set(req.body);
                goal.save().then(updatedDream => {
                    res.redirect(`/goals/${req.params.id}`)
                }).catch(err => {
                    console.log(err.message);
                })
            })
        })


        //-------DELETE ROUTES -----// ------ //
        //delete goal
        app.delete('/goals/:id', (req, res) => {
            Dream.findOneAndRemove({_id: req.params.id}).then(goals => {
                console.log('deleted')
                res.redirect('/dashboard');
            }).catch(err => {
                console.log(err.message)
            })

        })


}
