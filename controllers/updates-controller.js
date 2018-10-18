const Goal = require('../models/goal')
const Update = require('../models/update');
const ActionItem = require('../models/action-item');


module.exports = function(app) {
//post an update
app.post('/goals/:goalId/updates', (req, res) => {
    if (req.user) {
        const update = new Update(req.body);

        update.save().then(update => {
            console.log('this is the saved update ---> ' + update);
            return Goal.findById(req.params.goalId);
        }).then(goal => {
            console.log(typeof update);
            goal.updates.unshift(update);
            goal.save()
        }).then(goal => {

            res.redirect(`/goals/${req.params.goalId}`);
        }).catch(err => {
            console.log(err.message);

        })
    } else {
        res.redirect('/');
        console.log('User is not signed in');
    }

})


/******
EDIT UPDATES SECTION-- must GET edit form & PUT
******/
////------GET edit form ----- ///// // TODO: Need to get goalId to pass through to hbs template
///------> route works but I do not think it passes the goal through
// app.get('/goals/:goalId/updates/:id/edit', (req, res) => {
//     if(req.user) {
//         Update.findById(req.params.id).then(updates => {
//             res.render('updates-edit.hbs', {updates: updates})
//         }).catch(err => {
//             console.log(err.message);
//         })
//     } else {
//         res.redirect('/');
//         console.log('user is not logged in!');
//     }
//
// })
///////// TODO: Figure out why goal(callback) is not defined even though it console.logs correctly
app.get('/goals/:goalId/updates/:id/edit', (req, res) => {
    if(req.user) {
        Goal.findById(req.params.goalId).then(goal => {
            ///console.log('this is goal ----> ' + goal);
            return Update.findById(req.params.id)
        }).then(update => {
            console.log('this is the current update ----> ' + update)
            res.render('updates-edit.hbs', {update: update});
            }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.redirect('/');
        console.log('User is not signed in.')

    }

})

//PUT route // TODO: need to make work ---> cannot get the goalId or update ._id ---- on view
app.put('/goals/:goalId/updates/:id', (req, res) => {
    if(req.user) {
        console.log('inside route >>>>>>>>');
        Goal.findById(req.params.goalId).then(goal => {
            return Update.findById(req.params.id);
        }).then(update => {
            console.log(req.body);
            update.set(req.body);
            return update.save();
        }).then(update => {
            res.redirect(`/goals/${req.params.goalId}`)

        }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.redirect('/');
        console.log('User is not signed in.');
    }
})





/////------DELETE ------ ///// ---> // // TODO: Make sure the update deletes in DB & view
app.delete('/goals/:goalId/updates/:id', (req, res) => {
    if(req.user) {
        Goal.findById(req.params.goalId).then(goal => {
            console.log(req.params.goalId);
            return Update.findOneAndRemove({_id: req.params.id})
        }).then(update => {
            res.redirect(`/goals/${req.params.goalId}`);
        }).catch(err => {
            console.log(err.message);
        })
    } else {
        res.redirect('/');
        console.log('User is not signed in');
    }

})

}
